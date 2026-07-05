"""
organizer_engine.py — the brains behind AI File Organizer.

This module is pure standard-library Python with NO GUI dependency, so it can
be unit-tested headlessly and reused by the Tkinter app (ai_file_organizer.py)
or from the command line.

Two categorization modes:

  • "smart"  — offline. Uses file extensions plus filename heuristics
               (screenshots, invoices, receipts, resumes, ...) to pick a
               sensible destination folder. No network, no API key.

  • "ai"     — optional. Sends the ambiguous filenames to Anthropic's Claude
               API and lets the model choose a semantic category. Falls back
               to "smart" automatically if no API key is configured or the
               request fails, so the app never breaks.
"""

from __future__ import annotations

import csv
import datetime as _dt
import json
import os
import re
import shutil
import urllib.error
import urllib.request
from pathlib import Path

# ---------------------------------------------------------------------------
# Category definitions (extension -> category)
# ---------------------------------------------------------------------------
CATEGORIES: dict[str, set[str]] = {
    "Images": {
        ".jpg", ".jpeg", ".png", ".gif", ".bmp", ".tiff", ".tif", ".webp",
        ".svg", ".heic", ".heif", ".ico", ".raw", ".cr2", ".nef", ".psd",
    },
    "Documents": {
        ".pdf", ".doc", ".docx", ".txt", ".rtf", ".odt", ".tex", ".md",
        ".pages", ".epub", ".mobi",
    },
    "Spreadsheets": {".xls", ".xlsx", ".ods", ".csv", ".numbers"},
    "Presentations": {".ppt", ".pptx", ".odp", ".key"},
    "Video": {
        ".mp4", ".mkv", ".mov", ".avi", ".wmv", ".flv", ".webm", ".m4v",
        ".mpg", ".mpeg", ".3gp", ".ogv",
    },
    "Audio": {
        ".mp3", ".wav", ".flac", ".aac", ".ogg", ".m4a", ".wma", ".opus",
        ".aiff", ".alac", ".mid", ".midi",
    },
    "Archives": {
        ".zip", ".rar", ".7z", ".tar", ".gz", ".bz2", ".xz", ".tgz",
        ".iso", ".dmg", ".pkg",
    },
    "Code": {
        ".py", ".js", ".ts", ".jsx", ".tsx", ".java", ".c", ".cpp", ".h",
        ".cs", ".go", ".rs", ".rb", ".php", ".swift", ".kt", ".sh", ".bash",
        ".html", ".css", ".scss", ".json", ".xml", ".yml", ".yaml", ".sql",
        ".ipynb",
    },
    "Apps": {".exe", ".msi", ".deb", ".rpm", ".appimage", ".apk", ".app"},
    "Fonts": {".ttf", ".otf", ".woff", ".woff2", ".eot"},
}

OTHER_CATEGORY = "Other"
UNDO_LOG_NAME = ".ai_organizer_undo.csv"

# Filename heuristics: (compiled regex, category). Checked before extension
# lookup so a "Screenshot 2026-01-01.png" goes to Screenshots, not Images.
#
# We deliberately avoid \b as a keyword boundary because "_" is a word
# character, so \binvoice\b fails to match "Invoice_2024_001". Instead we use
# letter-only lookarounds: a keyword is a match when it isn't glued to another
# letter (digits, underscores, spaces and dashes all count as separators).
def _kw(*words: str) -> str:
    body = "|".join(words)
    return rf"(?<![a-z])(?:{body})(?![a-z])"


_NAME_RULES: list[tuple[re.Pattern[str], str]] = [
    (re.compile(r"screen[\s_-]?shot|screenshot|screen recording", re.I), "Screenshots"),
    (re.compile(_kw("invoice", "invoices") + r"|(?<![a-z])inv[-_]?\d", re.I), "Invoices"),
    (re.compile(_kw("receipt", "receipts") + r"|order[-_ ]?confirmation", re.I), "Receipts"),
    (re.compile(_kw("resume", "cv") + r"|curriculum[\s_-]?vitae", re.I), "Resumes"),
    (re.compile(r"boarding[\s_-]?pass|" + _kw("ticket", "itinerary"), re.I), "Travel"),
    (re.compile(_kw("statement", "bank", "tax", "w2", "w-2", "1099"), re.I), "Finance"),
    (re.compile(_kw("wallpaper", "background"), re.I), "Wallpapers"),
]


def all_category_names() -> set[str]:
    """Every folder name the engine might create."""
    names = set(CATEGORIES) | {OTHER_CATEGORY}
    names.update(cat for _, cat in _NAME_RULES)
    return names


def smart_category(path: Path) -> str:
    """Offline categorization: filename heuristics first, then extension."""
    name = path.name
    for pattern, category in _NAME_RULES:
        if pattern.search(name):
            return category
    ext = path.suffix.lower()
    for category, extensions in CATEGORIES.items():
        if ext in extensions:
            return category
    return OTHER_CATEGORY


# ---------------------------------------------------------------------------
# Optional AI categorization via the Anthropic Claude API
# ---------------------------------------------------------------------------
ANTHROPIC_URL = "https://api.anthropic.com/v1/messages"
AI_MODEL = "claude-haiku-4-5-20251001"  # fast + cheap for classification


def ai_categorize(
    names: list[str],
    api_key: str,
    existing_categories: list[str] | None = None,
    timeout: float = 30.0,
) -> dict[str, str]:
    """
    Ask Claude to assign each filename to a short, human-friendly folder name.

    Returns a {filename: category} map. Raises on network/API errors so the
    caller can decide whether to fall back to smart_category().
    """
    if not api_key:
        raise ValueError("no API key provided")

    hint = ""
    if existing_categories:
        hint = (
            "Prefer reusing these existing folder names when they fit: "
            + ", ".join(sorted(set(existing_categories)))
            + ". "
        )
    prompt = (
        "You organize a user's files into tidy folders. For each filename "
        "below, choose the single best destination folder name. Use short, "
        "Title Case names (1-2 words) like Images, Invoices, Screenshots, "
        "Work, Personal, Travel. " + hint + "Respond with ONLY a JSON object "
        "mapping each exact filename to its folder name, no prose.\n\n"
        "Filenames:\n" + "\n".join(f"- {n}" for n in names)
    )

    body = json.dumps({
        "model": AI_MODEL,
        "max_tokens": 1024,
        "messages": [{"role": "user", "content": prompt}],
    }).encode("utf-8")

    req = urllib.request.Request(
        ANTHROPIC_URL,
        data=body,
        headers={
            "content-type": "application/json",
            "x-api-key": api_key,
            "anthropic-version": "2023-06-01",
        },
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=timeout) as resp:
        payload = json.loads(resp.read().decode("utf-8"))

    text = "".join(
        block.get("text", "")
        for block in payload.get("content", [])
        if block.get("type") == "text"
    ).strip()

    # The model is asked for pure JSON, but strip stray code fences just in case.
    text = re.sub(r"^```(?:json)?|```$", "", text, flags=re.M).strip()
    mapping = json.loads(text)
    return {str(k): _sanitize_folder(str(v)) for k, v in mapping.items()}


def _sanitize_folder(name: str) -> str:
    """Keep AI-suggested folder names filesystem-safe and reasonable."""
    name = name.strip().strip("/\\").replace(os.sep, "-")
    name = re.sub(r'[<>:"|?*\x00-\x1f]', "", name)
    name = name.strip(". ")
    return name[:60] if name else OTHER_CATEGORY


# ---------------------------------------------------------------------------
# Scanning and planning
# ---------------------------------------------------------------------------
def scan_files(source: Path, recursive: bool) -> list[Path]:
    """Collect candidate files, skipping hidden/system files and our undo log."""
    walker = source.rglob("*") if recursive else source.glob("*")
    files: list[Path] = []
    known = all_category_names()
    for path in walker:
        if not path.is_file():
            continue
        if path.name.startswith(".") or path.name == UNDO_LOG_NAME:
            continue
        # Skip files already inside a category folder we manage.
        try:
            top = path.relative_to(source).parts[0]
        except ValueError:
            top = ""
        if top in known and len(path.relative_to(source).parts) > 1:
            continue
        files.append(path)
    return files


def _date_bucket(path: Path) -> str:
    mtime = _dt.datetime.fromtimestamp(path.stat().st_mtime)
    return mtime.strftime("%Y-%m")


def unique_destination(dest: Path) -> Path:
    """Return a non-existing path, adding ' (1)', ' (2)', ... on collision."""
    if not dest.exists():
        return dest
    stem, suffix, parent = dest.stem, dest.suffix, dest.parent
    counter = 1
    while True:
        candidate = parent / f"{stem} ({counter}){suffix}"
        if not candidate.exists():
            return candidate
        counter += 1


def build_plan(
    source: Path,
    recursive: bool = False,
    by_date: bool = False,
    mode: str = "smart",
    api_key: str = "",
    progress=None,
) -> list[tuple[Path, Path]]:
    """
    Produce a list of (src, dest) moves without touching the filesystem.

    `progress`, if given, is called as progress(done, total, message).
    """
    files = scan_files(source, recursive)
    total = len(files)
    if progress:
        progress(0, total, "Scanning…")

    # Start with smart categories for everything.
    categories: dict[Path, str] = {p: smart_category(p) for p in files}

    # In AI mode, let Claude re-classify the files that smart mode couldn't
    # place confidently (the "Other" pile), then fold results back in.
    if mode == "ai" and api_key:
        ambiguous = [p for p, c in categories.items() if c == OTHER_CATEGORY]
        if ambiguous:
            if progress:
                progress(0, total, f"Asking AI about {len(ambiguous)} file(s)…")
            try:
                mapping = ai_categorize(
                    [p.name for p in ambiguous],
                    api_key,
                    existing_categories=list(all_category_names()),
                )
                for p in ambiguous:
                    if p.name in mapping and mapping[p.name]:
                        categories[p] = mapping[p.name]
            except Exception as exc:  # noqa: BLE001 — degrade gracefully
                if progress:
                    progress(0, total, f"AI unavailable ({exc}); using smart mode.")

    moves: list[tuple[Path, Path]] = []
    for i, path in enumerate(files, 1):
        category = categories[path]
        dest_dir = source / category
        if by_date:
            dest_dir = dest_dir / _date_bucket(path)
        dest = unique_destination(dest_dir / path.name)
        moves.append((path, dest))
        if progress:
            progress(i, total, f"Planning {path.name}")
    return moves


def apply_plan(
    source: Path,
    moves: list[tuple[Path, Path]],
    progress=None,
) -> int:
    """Execute the moves and write an undo log. Returns count moved."""
    performed: list[tuple[Path, Path]] = []
    total = len(moves)
    for i, (src, dest) in enumerate(moves, 1):
        dest.parent.mkdir(parents=True, exist_ok=True)
        shutil.move(str(src), str(dest))
        performed.append((src, dest))
        if progress:
            progress(i, total, f"Moved {src.name}")
    _write_undo_log(source, performed)
    return len(performed)


def _write_undo_log(source: Path, moves: list[tuple[Path, Path]]) -> None:
    log_path = source / UNDO_LOG_NAME
    with log_path.open("w", newline="", encoding="utf-8") as fh:
        writer = csv.writer(fh)
        writer.writerow(["source", "destination"])
        for src, dest in moves:
            writer.writerow([str(src), str(dest)])


def has_undo(source: Path) -> bool:
    return (source / UNDO_LOG_NAME).is_file()


def undo(source: Path, progress=None) -> int:
    """Restore files recorded in the undo log to their original locations."""
    log_path = source / UNDO_LOG_NAME
    if not log_path.is_file():
        raise FileNotFoundError("no undo log found")

    with log_path.open(newline="", encoding="utf-8") as fh:
        rows = list(csv.DictReader(fh))

    restored = 0
    total = len(rows)
    for i, row in enumerate(reversed(rows), 1):
        dest = Path(row["destination"])
        original = Path(row["source"])
        if not dest.exists():
            continue
        target = unique_destination(original)
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.move(str(dest), str(target))
        restored += 1
        if progress:
            progress(i, total, f"Restored {dest.name}")

    log_path.unlink(missing_ok=True)
    return restored

#!/usr/bin/env python3
"""
sort_files.py — Organize the files in a folder into tidy category subfolders.

A small, dependency-free utility for keeping messy folders (Downloads,
Desktop, etc.) organized. It groups files by their extension into categories
like Images, Documents, Video, Archives, and so on.

Highlights
----------
- Zero dependencies: runs on any machine with Python 3.8+.
- Safe by default: use --dry-run to preview before touching anything.
- Never overwrites: name collisions get an auto-incrementing " (1)" suffix.
- Optional date buckets: --by-date sorts into Category/YYYY-MM subfolders.
- Recursion, undo log, and sensible skipping of hidden/system files.

Examples
--------
    # Preview how your Downloads folder would be organized
    python3 sort_files.py ~/Downloads --dry-run

    # Actually sort it
    python3 sort_files.py ~/Downloads

    # Sort recursively and bucket by modification month
    python3 sort_files.py ~/Downloads --recursive --by-date

    # Undo the most recent sort in a folder
    python3 sort_files.py ~/Downloads --undo
"""

from __future__ import annotations

import argparse
import csv
import datetime as _dt
import os
import shutil
import sys
from pathlib import Path

# ---------------------------------------------------------------------------
# Category definitions
# ---------------------------------------------------------------------------
# Map a human-friendly category name to the file extensions that belong in it.
# Extensions are lowercase and include the leading dot.
CATEGORIES: dict[str, set[str]] = {
    "Images": {
        ".jpg", ".jpeg", ".png", ".gif", ".bmp", ".tiff", ".tif", ".webp",
        ".svg", ".heic", ".heif", ".ico", ".raw", ".cr2", ".nef", ".psd",
    },
    "Documents": {
        ".pdf", ".doc", ".docx", ".txt", ".rtf", ".odt", ".tex", ".md",
        ".pages", ".xls", ".xlsx", ".ods", ".csv", ".ppt", ".pptx", ".odp",
        ".key", ".epub", ".mobi",
    },
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
    "Installers": {
        ".exe", ".msi", ".deb", ".rpm", ".appimage", ".apk", ".bat",
    },
    "Fonts": {
        ".ttf", ".otf", ".woff", ".woff2", ".eot",
    },
}

# Files without a matching extension land here.
OTHER_CATEGORY = "Other"

# The undo log is written into the target folder so a later --undo can find it.
UNDO_LOG_NAME = ".sort_files_undo.csv"


def category_for(extension: str) -> str:
    """Return the category name for a given file extension."""
    ext = extension.lower()
    for name, extensions in CATEGORIES.items():
        if ext in extensions:
            return name
    return OTHER_CATEGORY


def unique_destination(dest: Path) -> Path:
    """
    Return a path that does not yet exist, adding ' (1)', ' (2)', ... to the
    stem if needed. This guarantees we never overwrite an existing file.
    """
    if not dest.exists():
        return dest
    stem, suffix, parent = dest.stem, dest.suffix, dest.parent
    counter = 1
    while True:
        candidate = parent / f"{stem} ({counter}){suffix}"
        if not candidate.exists():
            return candidate
        counter += 1


def iter_files(source: Path, recursive: bool) -> list[Path]:
    """Collect candidate files to sort, skipping hidden and system files."""
    walker = source.rglob("*") if recursive else source.glob("*")
    files: list[Path] = []
    for path in walker:
        if not path.is_file():
            continue
        # Skip hidden/dotfiles and our own undo log.
        if path.name.startswith(".") or path.name == UNDO_LOG_NAME:
            continue
        files.append(path)
    return files


def date_bucket(path: Path) -> str:
    """Return a 'YYYY-MM' subfolder name from a file's modification time."""
    mtime = _dt.datetime.fromtimestamp(path.stat().st_mtime)
    return mtime.strftime("%Y-%m")


def plan_moves(
    files: list[Path],
    source: Path,
    by_date: bool,
) -> list[tuple[Path, Path]]:
    """
    Build a list of (src, dest) moves. Files already sitting in their correct
    category folder are skipped so re-running is a safe no-op.
    """
    moves: list[tuple[Path, Path]] = []
    category_names = set(CATEGORIES) | {OTHER_CATEGORY}

    for path in files:
        category = category_for(path.suffix)

        # Don't re-sort a file that already lives under its category folder.
        try:
            top = path.relative_to(source).parts[0]
        except ValueError:
            top = ""
        if top in category_names:
            continue

        dest_dir = source / category
        if by_date:
            dest_dir = dest_dir / date_bucket(path)

        dest = unique_destination(dest_dir / path.name)
        moves.append((path, dest))

    return moves


def write_undo_log(source: Path, moves: list[tuple[Path, Path]]) -> None:
    """Record completed moves so they can be reversed with --undo."""
    log_path = source / UNDO_LOG_NAME
    with log_path.open("w", newline="", encoding="utf-8") as fh:
        writer = csv.writer(fh)
        writer.writerow(["source", "destination"])
        for src, dest in moves:
            writer.writerow([str(src), str(dest)])


def run_sort(args: argparse.Namespace) -> int:
    source = Path(args.folder).expanduser().resolve()
    if not source.is_dir():
        print(f"error: '{source}' is not a directory", file=sys.stderr)
        return 1

    files = iter_files(source, args.recursive)
    moves = plan_moves(files, source, args.by_date)

    if not moves:
        print(f"Nothing to sort in {source} — already tidy. ✨")
        return 0

    verb = "Would move" if args.dry_run else "Moving"
    print(f"{verb} {len(moves)} file(s) in {source}\n")

    performed: list[tuple[Path, Path]] = []
    for src, dest in moves:
        rel_src = src.relative_to(source)
        rel_dest = dest.relative_to(source)
        print(f"  {rel_src}  ->  {rel_dest}")
        if not args.dry_run:
            dest.parent.mkdir(parents=True, exist_ok=True)
            shutil.move(str(src), str(dest))
            performed.append((src, dest))

    if args.dry_run:
        print("\nDry run — no files were moved. Re-run without --dry-run to apply.")
    else:
        write_undo_log(source, performed)
        print(f"\nDone. Sorted {len(performed)} file(s).")
        print(f"Undo this with:  python3 {Path(__file__).name} \"{source}\" --undo")
    return 0


def run_undo(args: argparse.Namespace) -> int:
    source = Path(args.folder).expanduser().resolve()
    log_path = source / UNDO_LOG_NAME
    if not log_path.is_file():
        print(f"error: no undo log found in {source}", file=sys.stderr)
        return 1

    with log_path.open(newline="", encoding="utf-8") as fh:
        rows = list(csv.DictReader(fh))

    print(f"Restoring {len(rows)} file(s) to their original locations\n")
    restored = 0
    # Reverse order so nested moves unwind cleanly.
    for row in reversed(rows):
        dest = Path(row["destination"])
        original = Path(row["source"])
        if not dest.exists():
            print(f"  skip (missing): {dest}")
            continue
        target = unique_destination(original)
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.move(str(dest), str(target))
        print(f"  {dest.name}  ->  {target}")
        restored += 1

    log_path.unlink(missing_ok=True)
    print(f"\nRestored {restored} file(s). Removed undo log.")
    return 0


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description="Sort the files in a folder into category subfolders.",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=(
            "examples:\n"
            "  python3 sort_files.py ~/Downloads --dry-run\n"
            "  python3 sort_files.py ~/Downloads\n"
            "  python3 sort_files.py ~/Downloads --recursive --by-date\n"
            "  python3 sort_files.py ~/Downloads --undo\n"
        ),
    )
    parser.add_argument(
        "folder",
        help="The folder to organize (e.g. ~/Downloads).",
    )
    parser.add_argument(
        "-n", "--dry-run",
        action="store_true",
        help="Show what would happen without moving any files.",
    )
    parser.add_argument(
        "-r", "--recursive",
        action="store_true",
        help="Also sort files inside subfolders.",
    )
    parser.add_argument(
        "-d", "--by-date",
        action="store_true",
        help="Add a YYYY-MM subfolder inside each category by modified date.",
    )
    parser.add_argument(
        "--undo",
        action="store_true",
        help="Reverse the most recent sort in the folder.",
    )
    return parser


def main(argv: list[str] | None = None) -> int:
    args = build_parser().parse_args(argv)
    try:
        if args.undo:
            return run_undo(args)
        return run_sort(args)
    except KeyboardInterrupt:
        print("\nInterrupted.", file=sys.stderr)
        return 130


if __name__ == "__main__":
    raise SystemExit(main())

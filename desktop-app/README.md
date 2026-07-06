# AI File Organizer — macOS desktop app

A native **desktop app for Mac** that tidies a messy folder (Downloads,
Desktop, …) by sorting files into clean, well-named subfolders. It has a real
window with buttons — pick a folder, **Preview** the plan, then **Organize** —
plus one-click **Undo**.

It runs on the Python 3 that ships with macOS, so there's nothing to install
for the basic (offline) version.

## Two ways to run it

### Option A — Double-clickable app (recommended)

```bash
cd desktop-app
./build_app.sh
```

This creates **`dist/AI File Organizer.app`**. Double-click it, or drag it into
`/Applications`.

> First launch of an app you built yourself: **right-click → Open** once, then
> click **Open** in the dialog. That's macOS Gatekeeper asking about an
> unsigned app — normal for something you built locally.

### Option B — Straight from Terminal

```bash
cd desktop-app
python3 ai_file_organizer.py
```

### Option C — Fully standalone app (no Python needed by the user)

If you want an app that bundles its own Python so it runs on any Mac:

```bash
pip3 install pyinstaller
./build_app.sh --standalone
```

## Using the app

1. **Choose Folder…** — e.g. your `~/Downloads`.
2. Pick a **Mode**:
   - **Smart (offline)** — sorts by file type *and* filename cues. It
     recognizes screenshots, invoices, receipts, resumes, bank/tax documents,
     boarding passes, wallpapers, and more — no internet, no API key.
   - **AI (Claude)** — for files the rules can't place, it asks Claude to pick
     a sensible folder name. Needs a Claude API key (paste it in; it's saved to
     `~/.ai_file_organizer/api_key` with `600` permissions). If the key is
     missing or the request fails, it silently falls back to Smart mode.
3. Optional toggles:
   - **Include subfolders (recursive)**
   - **Add YYYY-MM date subfolders** inside each category.
4. **Preview** — see the exact `file → destination` list. Nothing has moved yet.
5. **Organize** — moves the files.
6. **Undo Last** — restores everything to where it was.

## Where files go (Smart mode)

| Category | Examples |
|----------|----------|
| Images / Video / Audio | `.jpg`, `.png` / `.mp4`, `.mov` / `.mp3`, `.wav` |
| Documents / Spreadsheets / Presentations | `.pdf`, `.docx` / `.xlsx`, `.csv` / `.pptx`, `.key` |
| Archives / Code / Apps / Fonts | `.zip`, `.dmg` / `.py`, `.js` / `.app`, `.pkg` / `.ttf` |
| Screenshots / Invoices / Receipts / Resumes | matched by filename |
| Finance / Travel / Wallpapers | matched by filename |
| Other | anything unrecognized |

## Safety

- **Preview first** — you always see the plan before anything moves.
- **Never overwrites** — a name clash gets a ` (1)`, ` (2)`, … suffix.
- **Undoable** — each run writes a hidden `.ai_organizer_undo.csv` log so
  **Undo Last** can put everything back.
- **Skips hidden/system files** and is **idempotent** (re-running does nothing).

## Files in this folder

| File | Purpose |
|------|---------|
| `ai_file_organizer.py` | The Tkinter GUI (the app window). |
| `organizer_engine.py` | Categorization + move/undo logic. Pure stdlib, no GUI — reusable and testable. |
| `build_app.sh` | Packages everything into `AI File Organizer.app`. |

## Requirements

- macOS with Python 3.8+ (the built-in `/usr/bin/python3` is fine; Tkinter is
  included).
- Optional AI mode: a Claude API key from <https://console.anthropic.com>.
- Optional standalone build: `pip3 install pyinstaller`.

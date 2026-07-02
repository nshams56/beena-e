# file-sorter

A tiny, dependency-free command-line tool that organizes a messy folder (like
your **Downloads** or **Desktop**) into tidy category subfolders — Images,
Documents, Video, Audio, Archives, Code, and more.

Works on **macOS, Windows, and Linux**. All you need is Python 3.8+ (already
installed on most laptops).

## Quick start

```bash
# 1. Preview what would happen — nothing is moved
python3 sort_files.py ~/Downloads --dry-run

# 2. Happy with the preview? Run it for real
python3 sort_files.py ~/Downloads
```

On Windows, use `python` instead of `python3` and a path like
`C:\Users\you\Downloads`.

## What it does

Given a folder full of loose files, it moves each one into a subfolder named
after its type:

```
Downloads/
├── Images/       photo.jpg, screenshot.png, ...
├── Documents/    report.pdf, notes.txt, budget.xlsx, ...
├── Video/        clip.mp4, ...
├── Audio/        song.mp3, ...
├── Archives/     backup.zip, ...
├── Code/         script.py, index.html, ...
├── Installers/   setup.exe, app.dmg, ...
├── Fonts/        Inter.ttf, ...
└── Other/        anything with an unrecognized extension
```

## Options

| Flag | What it does |
|------|--------------|
| `-n`, `--dry-run` | Show the plan without moving anything. |
| `-r`, `--recursive` | Also sort files found inside subfolders. |
| `-d`, `--by-date` | Add a `YYYY-MM` subfolder (by modified date) inside each category. |
| `--undo` | Reverse the most recent sort in the folder. |

Examples:

```bash
# Sort recursively, bucketed by month
python3 sort_files.py ~/Downloads --recursive --by-date

# Made a mess? Undo the last sort
python3 sort_files.py ~/Downloads --undo
```

## Safety

- **Preview first.** `--dry-run` shows exactly what will move before you commit.
- **Never overwrites.** If a file with the same name already exists at the
  destination, the incoming file gets a ` (1)`, ` (2)`, … suffix.
- **Undoable.** Each real run writes a hidden `.sort_files_undo.csv` log so
  `--undo` can put everything back where it was.
- **Skips hidden/system files** (anything starting with `.`).
- **Idempotent.** Re-running on an already-sorted folder does nothing.

## Optional: make it a shortcut

Add an alias so you can sort any folder in one word:

```bash
# macOS / Linux — add to ~/.zshrc or ~/.bashrc
alias sortfiles='python3 /full/path/to/file-sorter/sort_files.py'

# then:
sortfiles ~/Downloads --dry-run
```

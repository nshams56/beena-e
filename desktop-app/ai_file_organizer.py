#!/usr/bin/env python3
"""
AI File Organizer — a native macOS desktop app for tidying folders.

A friendly Tkinter GUI on top of organizer_engine.py. Pick a folder, preview
how it would be reorganized, then apply with one click. Includes an optional
"AI mode" that uses Claude to name folders for files that simple rules can't
place, and a one-click Undo.

Runs on the Python 3 that ships with macOS (Tkinter included). No pip installs
required for the app itself.
"""

from __future__ import annotations

import os
import queue
import threading
from pathlib import Path

import tkinter as tk
from tkinter import filedialog, messagebox, ttk

import organizer_engine as engine

APP_NAME = "AI File Organizer"
SETTINGS_DIR = Path.home() / ".ai_file_organizer"
KEY_FILE = SETTINGS_DIR / "api_key"


def load_saved_key() -> str:
    try:
        return KEY_FILE.read_text(encoding="utf-8").strip()
    except OSError:
        return ""


def save_key(key: str) -> None:
    try:
        SETTINGS_DIR.mkdir(parents=True, exist_ok=True)
        KEY_FILE.write_text(key.strip(), encoding="utf-8")
        os.chmod(KEY_FILE, 0o600)
    except OSError:
        pass


class OrganizerApp(ttk.Frame):
    def __init__(self, master: tk.Tk) -> None:
        super().__init__(master, padding=16)
        self.master = master
        self.grid(sticky="nsew")
        master.columnconfigure(0, weight=1)
        master.rowconfigure(0, weight=1)
        self.columnconfigure(0, weight=1)

        self.folder_var = tk.StringVar()
        self.mode_var = tk.StringVar(value="smart")
        self.recursive_var = tk.BooleanVar(value=False)
        self.by_date_var = tk.BooleanVar(value=False)
        self.api_key_var = tk.StringVar(value=load_saved_key())

        self._plan: list[tuple[Path, Path]] = []
        self._events: "queue.Queue[tuple]" = queue.Queue()
        self._busy = False

        self._build_ui()
        self.after(100, self._drain_events)

    # ---------------------------------------------------------------- UI ----
    def _build_ui(self) -> None:
        row = 0
        header = ttk.Label(self, text=APP_NAME, font=("Helvetica", 20, "bold"))
        header.grid(row=row, column=0, sticky="w")
        row += 1
        ttk.Label(
            self,
            text="Pick a folder, preview the plan, then organize. Nothing moves until you click Organize.",
            foreground="#666",
        ).grid(row=row, column=0, sticky="w", pady=(2, 12))
        row += 1

        # Folder chooser
        folder_frame = ttk.Frame(self)
        folder_frame.grid(row=row, column=0, sticky="ew", pady=4)
        folder_frame.columnconfigure(0, weight=1)
        ttk.Entry(folder_frame, textvariable=self.folder_var).grid(
            row=0, column=0, sticky="ew", padx=(0, 8)
        )
        ttk.Button(folder_frame, text="Choose Folder…", command=self._choose_folder).grid(
            row=0, column=1
        )
        row += 1

        # Options
        opts = ttk.LabelFrame(self, text="Options", padding=10)
        opts.grid(row=row, column=0, sticky="ew", pady=10)
        opts.columnconfigure(1, weight=1)

        ttk.Label(opts, text="Mode:").grid(row=0, column=0, sticky="w")
        mode_frame = ttk.Frame(opts)
        mode_frame.grid(row=0, column=1, sticky="w")
        ttk.Radiobutton(
            mode_frame, text="Smart (offline)", value="smart",
            variable=self.mode_var, command=self._toggle_key,
        ).grid(row=0, column=0, padx=(0, 12))
        ttk.Radiobutton(
            mode_frame, text="AI (Claude)", value="ai",
            variable=self.mode_var, command=self._toggle_key,
        ).grid(row=0, column=1)

        ttk.Checkbutton(
            opts, text="Include subfolders (recursive)", variable=self.recursive_var
        ).grid(row=1, column=0, columnspan=2, sticky="w", pady=(6, 0))
        ttk.Checkbutton(
            opts, text="Add YYYY-MM date subfolders", variable=self.by_date_var
        ).grid(row=2, column=0, columnspan=2, sticky="w")

        self.key_label = ttk.Label(opts, text="Claude API key:")
        self.key_entry = ttk.Entry(opts, textvariable=self.api_key_var, show="•")
        self.key_label.grid(row=3, column=0, sticky="w", pady=(6, 0))
        self.key_entry.grid(row=3, column=1, sticky="ew", pady=(6, 0))
        self._toggle_key()
        row += 1

        # Action buttons
        btns = ttk.Frame(self)
        btns.grid(row=row, column=0, sticky="ew", pady=6)
        self.preview_btn = ttk.Button(btns, text="Preview", command=self._preview)
        self.preview_btn.grid(row=0, column=0, padx=(0, 8))
        self.organize_btn = ttk.Button(
            btns, text="Organize", command=self._organize, state="disabled"
        )
        self.organize_btn.grid(row=0, column=1, padx=(0, 8))
        self.undo_btn = ttk.Button(btns, text="Undo Last", command=self._undo)
        self.undo_btn.grid(row=0, column=2)
        row += 1

        # Results table
        table_frame = ttk.Frame(self)
        table_frame.grid(row=row, column=0, sticky="nsew", pady=8)
        self.rowconfigure(row, weight=1)
        table_frame.columnconfigure(0, weight=1)
        table_frame.rowconfigure(0, weight=1)

        self.tree = ttk.Treeview(
            table_frame, columns=("file", "dest"), show="headings", height=12
        )
        self.tree.heading("file", text="File")
        self.tree.heading("dest", text="→ Destination")
        self.tree.column("file", width=280, anchor="w")
        self.tree.column("dest", width=280, anchor="w")
        self.tree.grid(row=0, column=0, sticky="nsew")
        scroll = ttk.Scrollbar(table_frame, orient="vertical", command=self.tree.yview)
        scroll.grid(row=0, column=1, sticky="ns")
        self.tree.configure(yscrollcommand=scroll.set)
        row += 1

        # Status bar + progress
        self.status_var = tk.StringVar(value="Ready.")
        ttk.Label(self, textvariable=self.status_var, foreground="#444").grid(
            row=row, column=0, sticky="w"
        )
        row += 1
        self.progress = ttk.Progressbar(self, mode="determinate")
        self.progress.grid(row=row, column=0, sticky="ew", pady=(4, 0))

    def _toggle_key(self) -> None:
        state = "normal" if self.mode_var.get() == "ai" else "disabled"
        self.key_entry.configure(state=state)
        self.key_label.configure(
            foreground="#000" if state == "normal" else "#aaa"
        )

    # ----------------------------------------------------------- actions ----
    def _choose_folder(self) -> None:
        start = self.folder_var.get() or str(Path.home() / "Downloads")
        chosen = filedialog.askdirectory(initialdir=start, title="Choose a folder to organize")
        if chosen:
            self.folder_var.set(chosen)
            self.organize_btn.configure(state="disabled")
            self._clear_tree()
            self.status_var.set(f"Selected {chosen}")

    def _validated_folder(self) -> Path | None:
        raw = self.folder_var.get().strip()
        if not raw:
            messagebox.showwarning(APP_NAME, "Please choose a folder first.")
            return None
        folder = Path(raw).expanduser()
        if not folder.is_dir():
            messagebox.showerror(APP_NAME, f"Not a folder:\n{folder}")
            return None
        return folder

    def _preview(self) -> None:
        if self._busy:
            return
        folder = self._validated_folder()
        if not folder:
            return
        mode = self.mode_var.get()
        api_key = self.api_key_var.get().strip()
        if mode == "ai":
            if not api_key:
                messagebox.showwarning(APP_NAME, "AI mode needs a Claude API key.")
                return
            save_key(api_key)

        self._set_busy(True, "Building preview…")
        self._clear_tree()

        def work() -> None:
            try:
                plan = engine.build_plan(
                    folder,
                    recursive=self.recursive_var.get(),
                    by_date=self.by_date_var.get(),
                    mode=mode,
                    api_key=api_key,
                    progress=lambda d, t, m: self._events.put(("progress", d, t, m)),
                )
                self._events.put(("plan", folder, plan))
            except Exception as exc:  # noqa: BLE001
                self._events.put(("error", str(exc)))

        threading.Thread(target=work, daemon=True).start()

    def _organize(self) -> None:
        if self._busy or not self._plan:
            return
        folder = self._validated_folder()
        if not folder:
            return
        count = len(self._plan)
        if not messagebox.askyesno(APP_NAME, f"Move {count} file(s) now?"):
            return
        plan = self._plan
        self._set_busy(True, "Organizing…")

        def work() -> None:
            try:
                moved = engine.apply_plan(
                    folder, plan,
                    progress=lambda d, t, m: self._events.put(("progress", d, t, m)),
                )
                self._events.put(("done", f"Organized {moved} file(s). Undo available."))
            except Exception as exc:  # noqa: BLE001
                self._events.put(("error", str(exc)))

        threading.Thread(target=work, daemon=True).start()

    def _undo(self) -> None:
        if self._busy:
            return
        folder = self._validated_folder()
        if not folder:
            return
        if not engine.has_undo(folder):
            messagebox.showinfo(APP_NAME, "No previous organize to undo in this folder.")
            return
        if not messagebox.askyesno(APP_NAME, "Restore files to their original locations?"):
            return
        self._set_busy(True, "Undoing…")

        def work() -> None:
            try:
                restored = engine.undo(
                    folder,
                    progress=lambda d, t, m: self._events.put(("progress", d, t, m)),
                )
                self._events.put(("done", f"Restored {restored} file(s)."))
                self._events.put(("clear", None))
            except Exception as exc:  # noqa: BLE001
                self._events.put(("error", str(exc)))

        threading.Thread(target=work, daemon=True).start()

    # ------------------------------------------------------- event pump ----
    def _drain_events(self) -> None:
        try:
            while True:
                event = self._events.get_nowait()
                kind = event[0]
                if kind == "progress":
                    _, done, total, msg = event
                    self.progress.configure(maximum=max(total, 1), value=done)
                    self.status_var.set(msg)
                elif kind == "plan":
                    _, folder, plan = event
                    self._plan = plan
                    self._show_plan(folder, plan)
                    self._set_busy(False)
                    if plan:
                        self.organize_btn.configure(state="normal")
                        self.status_var.set(f"Preview ready: {len(plan)} file(s) to move.")
                    else:
                        self.organize_btn.configure(state="disabled")
                        self.status_var.set("Nothing to organize — already tidy. ✨")
                elif kind == "done":
                    self._set_busy(False)
                    self.progress.configure(value=0)
                    self.status_var.set(event[1])
                    self.organize_btn.configure(state="disabled")
                    self._plan = []
                elif kind == "clear":
                    self._clear_tree()
                elif kind == "error":
                    self._set_busy(False)
                    self.progress.configure(value=0)
                    self.status_var.set("Error.")
                    messagebox.showerror(APP_NAME, event[1])
        except queue.Empty:
            pass
        self.after(100, self._drain_events)

    # ---------------------------------------------------------- helpers ----
    def _show_plan(self, folder: Path, plan: list[tuple[Path, Path]]) -> None:
        self._clear_tree()
        for src, dest in plan:
            try:
                src_label = str(src.relative_to(folder))
                dest_label = str(dest.relative_to(folder))
            except ValueError:
                src_label, dest_label = src.name, str(dest)
            self.tree.insert("", "end", values=(src_label, dest_label))

    def _clear_tree(self) -> None:
        for item in self.tree.get_children():
            self.tree.delete(item)

    def _set_busy(self, busy: bool, msg: str = "") -> None:
        self._busy = busy
        state = "disabled" if busy else "normal"
        self.preview_btn.configure(state=state)
        self.undo_btn.configure(state=state)
        if busy:
            self.organize_btn.configure(state="disabled")
            if msg:
                self.status_var.set(msg)


def main() -> None:
    root = tk.Tk()
    root.title(APP_NAME)
    root.geometry("720x640")
    root.minsize(620, 520)
    try:
        # Nicer look on macOS.
        style = ttk.Style()
        if "aqua" in style.theme_names():
            style.theme_use("aqua")
    except tk.TclError:
        pass
    OrganizerApp(root)
    root.mainloop()


if __name__ == "__main__":
    main()

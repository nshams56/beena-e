#!/usr/bin/env bash
#
# build_app.sh — package AI File Organizer into a double-clickable macOS .app
#
# Run this ON YOUR MAC:
#
#     cd desktop-app
#     ./build_app.sh
#
# It produces:  dist/AI File Organizer.app
#
# Drag that into /Applications (or just double-click it). It uses the Python 3
# that ships with macOS — no pip installs required. There are two ways to get
# an app you can launch:
#
#   1. This script  -> a native .app bundle (recommended, looks like any app).
#   2. Nothing      -> just run `python3 ai_file_organizer.py` from Terminal.
#
# Optionally, if you have PyInstaller installed (`pip3 install pyinstaller`),
# run `./build_app.sh --standalone` to bundle a fully self-contained .app that
# doesn't depend on the system Python at all.

set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
APP_NAME="AI File Organizer"
DIST="$HERE/dist"
APP="$DIST/$APP_NAME.app"

if [[ "${1:-}" == "--standalone" ]]; then
    echo "Building a standalone .app with PyInstaller…"
    if ! command -v pyinstaller >/dev/null 2>&1; then
        echo "error: pyinstaller not found. Install it with: pip3 install pyinstaller" >&2
        exit 1
    fi
    rm -rf "$HERE/build" "$DIST"
    pyinstaller \
        --name "$APP_NAME" \
        --windowed \
        --noconfirm \
        --distpath "$DIST" \
        --workpath "$HERE/build" \
        --specpath "$HERE/build" \
        --add-data "$HERE/organizer_engine.py:." \
        "$HERE/ai_file_organizer.py"
    echo "Done -> $APP"
    exit 0
fi

echo "Building $APP_NAME.app (uses system python3)…"
rm -rf "$APP"
mkdir -p "$APP/Contents/MacOS" "$APP/Contents/Resources"

# Copy the Python sources into the bundle's Resources.
cp "$HERE/ai_file_organizer.py" "$HERE/organizer_engine.py" "$APP/Contents/Resources/"

# Info.plist — identifies the bundle to macOS.
cat > "$APP/Contents/Info.plist" <<PLIST
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>CFBundleName</key>            <string>$APP_NAME</string>
    <key>CFBundleDisplayName</key>     <string>$APP_NAME</string>
    <key>CFBundleIdentifier</key>      <string>com.beenae.aifileorganizer</string>
    <key>CFBundleVersion</key>         <string>1.0</string>
    <key>CFBundleShortVersionString</key><string>1.0</string>
    <key>CFBundlePackageType</key>     <string>APPL</string>
    <key>CFBundleExecutable</key>      <string>launch</string>
    <key>NSHighResolutionCapable</key> <true/>
    <key>LSMinimumSystemVersion</key>  <string>10.13</string>
</dict>
</plist>
PLIST

# Launcher — the executable macOS runs when the app is opened.
cat > "$APP/Contents/MacOS/launch" <<'LAUNCH'
#!/usr/bin/env bash
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../Resources" && pwd)"
# Prefer python.org / Homebrew python3 if present, else the system one.
PY="$(command -v python3 || echo /usr/bin/python3)"
exec "$PY" "$DIR/ai_file_organizer.py"
LAUNCH
chmod +x "$APP/Contents/MacOS/launch"

echo "Done -> $APP"
echo
echo "Next steps:"
echo "  • Double-click \"$APP\" to launch, or drag it into /Applications."
echo "  • First launch: right-click the app → Open (to bypass Gatekeeper for"
echo "    an unsigned app you built yourself)."

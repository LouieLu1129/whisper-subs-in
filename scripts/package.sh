#!/bin/bash
# Build the download for a GitHub Release: dist/WhisperSubsIn-v<version>.zip
#
#   WhisperSubsIn-v0.1.0/
#   ├── Install Whisper Subs In.command
#   ├── Uninstall Whisper Subs In.command
#   └── Whisper Subs In/        (the panel, including the bundled engine)
set -e

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
VERSION="$(sed -n 's/.*ExtensionBundleVersion="\([^"]*\)".*/\1/p' "$ROOT/panel/CSXS/manifest.xml")"
NAME="WhisperSubsIn-v$VERSION"
OUT="$ROOT/dist"
STAGE="$OUT/$NAME"

[ -x "$ROOT/panel/bin/whisper-cli" ] || { echo "panel/bin/whisper-cli is missing. Run scripts/build-engine.sh first."; exit 1; }

rm -rf "$STAGE" "$OUT/$NAME.zip"
mkdir -p "$STAGE"
cp -R "$ROOT/panel" "$STAGE/Whisper Subs In"
cp "$ROOT/LICENSE" "$ROOT/THIRD_PARTY_NOTICES.md" "$STAGE/Whisper Subs In/"
cp "$ROOT/installer/"*.command "$STAGE/"
chmod +x "$STAGE/"*.command "$STAGE/Whisper Subs In/bin/whisper-cli"
find "$STAGE" -name ".DS_Store" -delete

# ditto keeps file permissions, so the installer and engine stay executable after unzipping
(cd "$OUT" && ditto -c -k --keepParent "$NAME" "$NAME.zip")
rm -rf "$STAGE"
echo "Built $OUT/$NAME.zip ($(du -h "$OUT/$NAME.zip" | cut -f1))"

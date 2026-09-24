#!/bin/bash
# Whisper Subs In installer. Double-click to run.
# 1) Copies the panel into your Premiere Pro extensions folder
# 2) Clears the "downloaded from the internet" flag so the bundled engine can run
# 3) Turns on PlayerDebugMode, which Premiere needs to load panels that aren't signed by Adobe
set -e

ID="com.whispersubsin.premiere"
HERE="$(cd "$(dirname "$0")" && pwd)"
DEST="$HOME/Library/Application Support/Adobe/CEP/extensions/$ID"

# The panel sits next to this file in the download; in the source repo it is ../panel
if [ -f "$HERE/Whisper Subs In/CSXS/manifest.xml" ]; then SRC="$HERE/Whisper Subs In"
elif [ -f "$HERE/../panel/CSXS/manifest.xml" ]; then SRC="$(cd "$HERE/../panel" && pwd)"
else echo "Can't find the Whisper Subs In folder next to this installer."; exit 1; fi

echo "Installing Whisper Subs In…"
if [ "$(uname -m)" != "arm64" ]; then
  echo "Note: Whisper Subs In is made for Macs with Apple silicon (M1 or later). It may not work on this Mac."
fi

mkdir -p "$(dirname "$DEST")"
rm -rf "$DEST"
rsync -a --exclude ".DS_Store" "$SRC/" "$DEST/"
xattr -dr com.apple.quarantine "$DEST" 2>/dev/null || true

for v in 11 12 13; do
  defaults write "com.adobe.CSXS.$v" PlayerDebugMode 1
done

if [ ! -x "$DEST/bin/whisper-cli" ]; then
  echo "Warning: the transcription engine (bin/whisper-cli) is missing from this copy."
fi

echo
echo "Done."
echo "Quit Premiere Pro completely (Cmd+Q), reopen it, then choose Window > Extensions > Whisper Subs In."
echo "You can close this window."

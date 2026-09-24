#!/bin/bash
# Whisper Subs In uninstaller. Double-click to run.
# Removes the panel only. Your models, SRT files and Premiere projects are not touched.
# PlayerDebugMode is left on because other panels may rely on it.
DEST="$HOME/Library/Application Support/Adobe/CEP/extensions/com.whispersubsin.premiere"

if [ -d "$DEST" ]; then
  rm -rf "$DEST"
  echo "Whisper Subs In has been removed."
else
  echo "Whisper Subs In is not installed."
fi
echo "Your models are still in ~/Documents/Whisper Subs In. Delete that folder too if you no longer need them."
echo "You can close this window."

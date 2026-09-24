#!/bin/bash
# Regenerate docs/screenshot.png from the real panel with demo data.
set -e
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
TMP="$(mktemp -d)"; trap 'rm -rf "$TMP"' EXIT
python3 - "$ROOT" "$TMP/demo.html" <<'PY'
import sys
root, out = sys.argv[1], sys.argv[2]
html = open(root + "/panel/index.html", encoding="utf-8").read()
stub = open(root + "/scripts/screenshot/demo-stub.js", encoding="utf-8").read()
html = html.replace("<script>", "<script>\n" + stub + "\n</script>\n<script>", 1)
open(out, "w", encoding="utf-8").write(html)
PY
mkdir -p "$ROOT/docs"
swift "$ROOT/scripts/screenshot/render.swift" "$TMP/demo.html" "$ROOT/docs/screenshot.png" 380 350
echo "Saved docs/screenshot.png"

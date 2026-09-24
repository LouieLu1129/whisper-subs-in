#!/bin/bash
# Build a self-contained whisper-cli for Apple silicon and put it in panel/bin/.
# The result has no Homebrew dependencies and embeds the Metal (GPU) shaders,
# so the panel can ship it and users don't need to install anything.
#
# Needs: Xcode Command Line Tools (xcode-select --install) and CMake (brew install cmake).
set -e

WHISPER_VERSION="v1.9.4"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
WORK="$(mktemp -d)"
trap 'rm -rf "$WORK"' EXIT

echo "==> Downloading whisper.cpp $WHISPER_VERSION"
git clone --quiet --depth 1 --branch "$WHISPER_VERSION" https://github.com/ggml-org/whisper.cpp.git "$WORK/src"

echo "==> Building (static, Metal embedded, arm64)"
cmake -S "$WORK/src" -B "$WORK/build" \
  -DCMAKE_BUILD_TYPE=Release \
  -DCMAKE_OSX_ARCHITECTURES=arm64 \
  -DCMAKE_OSX_DEPLOYMENT_TARGET=13.0 \
  -DBUILD_SHARED_LIBS=OFF \
  -DGGML_METAL=ON \
  -DGGML_METAL_EMBED_LIBRARY=ON \
  -DGGML_BLAS=ON \
  -DGGML_OPENMP=OFF \
  -DGGML_NATIVE=OFF \
  -DWHISPER_BUILD_TESTS=OFF \
  -DWHISPER_BUILD_SERVER=OFF \
  -DWHISPER_SDL2=OFF > "$WORK/cmake.log"
cmake --build "$WORK/build" --config Release --target whisper-cli -j "$(sysctl -n hw.ncpu)" > "$WORK/build.log"

BIN="$ROOT/panel/bin"
mkdir -p "$BIN"
cp "$WORK/build/bin/whisper-cli" "$BIN/whisper-cli"
cp "$WORK/src/LICENSE" "$BIN/whisper.cpp-LICENSE"
strip -x "$BIN/whisper-cli"
codesign --force --sign - "$BIN/whisper-cli"   # ad-hoc signature, required on Apple silicon

echo "==> Done: $BIN/whisper-cli"
otool -L "$BIN/whisper-cli"

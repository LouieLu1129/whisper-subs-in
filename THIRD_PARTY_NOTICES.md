# Third-Party Notices

Whisper Subs In includes the following third-party software and data.

## opencc-js — https://github.com/nk2028/opencc-js

- In the panel folder, `lib/opencc-js.js` is the unmodified UMD build of opencc-js 1.4.2 (`dist/umd/full.js`), used for
  Traditional / Simplified character conversion.
- The code is MIT-licensed (below). Its dictionary data comes from [OpenCC](https://github.com/BYVoid/OpenCC)
  via opencc-data and is licensed under the Apache License 2.0; the full text is in the panel folder's `lib/Apache-2.0.txt`.

```
MIT License

Copyright (c) 2020-2021 The nk2028 Project

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## Spectrum Workflow Icons — https://github.com/adobe/spectrum-css-workflow-icons

- The Folder, FolderAdd, Refresh, Download, Close and AlertTriangle icons in the panel's `index.html` are SVG path data from
  @adobe/spectrum-css-workflow-icons 5.0.0, embedded unmodified.
- © 2015-2024 Adobe. Licensed under the Apache License 2.0; the full text is in the panel folder's `lib/Apache-2.0.txt`.

## whisper.cpp — https://github.com/ggml-org/whisper.cpp

- In the panel folder, `bin/whisper-cli` is built from whisper.cpp v1.9.4 source, unmodified, by `scripts/build-engine.sh`.

```
MIT License

Copyright (c) 2023-2026 The ggml authors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## Whisper models (not included)

Whisper Subs In doesn't ship or download any model. Users download `.bin` models themselves; the
[whisper.cpp models](https://huggingface.co/ggerganov/whisper.cpp) are converted from
[OpenAI Whisper](https://github.com/openai/whisper) (MIT).

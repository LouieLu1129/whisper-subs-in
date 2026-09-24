# Whisper Subs In

[English](README.md) · **繁體中文**

這是一個在 Premiere Pro 裡直接用 Whisper 產生字幕軌的擴充面板。按一下，序列上就多一條字幕軌；全程在你的電腦上執行，不會上傳任何檔案。

<img src="docs/screenshot.png" alt="Premiere Pro 裡的 Whisper Subs In 面板" width="380">

**[⬇ 下載最新版](https://github.com/LouieLu1129/whisper-subs-in/releases/latest)**

> [!IMPORTANT]
> **第一次打開安裝程式時，macOS 會擋下來。請按「完成」，不要按「丟到垃圾桶」。**
> 接著到「**系統設定 → 隱私權與安全性**」按「**強制打開**」。詳細步驟請見[安裝](#安裝)，為什麼會被擋請見[安全嗎？](#安全嗎)。

## 為什麼做這個

我以往要把 Whisper 的字幕放進 Premiere，總得繞一大圈：匯出音訊、打開轉錄軟體、等它跑完、匯入 SRT，再拖回時間軸。這個面板把這些步驟整合進 Premiere 裡，同時保留選擇模型、語言、範圍和音軌的彈性。

它的目標是產生一條相對準確的字幕軌，方便你接著手動校對，因此完整保留 Whisper 原本的用字、斷句和時間。如果你常需要快速瀏覽長影片的內容、剪出濃縮版，希望它能幫上一點忙。

## 功能

- 一鍵從序列產生字幕軌
- 可以轉錄整條序列，或只轉入點到出點
- 可以選擇要轉錄哪幾條音軌
- 自動偵測語言，也可以手動指定
- 中文字幕可以保留原樣，或轉成繁體、簡體
- 在 Apple 晶片上離線執行，轉錄引擎已經內建

## 系統需求

- Apple 晶片（M1 以後）的 Mac，macOS 13 以後
- Premiere Pro 2022 以後（在 Premiere Pro 2026 測試）

## 安裝

1. **下載：** 到 [Releases](https://github.com/LouieLu1129/whisper-subs-in/releases/latest) 下載最新的 `WhisperSubsIn-v….zip`，解壓縮。
2. **雙擊 `Install Whisper Subs In.command`。**
   第一次打開時，macOS 會因為它沒有 Apple 的簽章而擋下來。放行的方法：
   1. 在跳出的訊息按「**完成**」。**不要按「丟到垃圾桶」。**
   2. 打開「**系統設定 → 隱私權與安全性**」，往下捲，在安裝程式名稱旁按「**強制打開**」。
   3. 輸入密碼或用 Touch ID 確認。安裝程式會在終端機視窗裡執行，完成時會告訴你。
3. **放入模型：** 建議先下載較小型的模型，例如 [ggml-medium.bin](https://huggingface.co/ggerganov/whisper.cpp/resolve/main/ggml-medium.bin)（1.5 GB）做測試，放進「文件 › Whisper Subs In › Models」。
4. **完全結束 Premiere Pro（⌘Q）再重新打開，** 然後選「視窗 → 擴充功能 → Whisper Subs In」。

## 安全嗎？

macOS 會擋下安裝程式，是因為它沒有 Apple 的簽章，而簽章需要加入 Apple 付費的開發者計畫。免費的開源工具常常是這樣，並不代表檔案有問題。

安裝程式是一個純文字檔，執行前可以用「文字編輯」打開 `Install Whisper Subs In.command` 檢查內容。它只做三件事：

1. 把面板複製到 `~/Library/Application Support/Adobe/CEP/extensions/`。
2. 移除面板檔案上「從網路下載」的標記，讓內建的轉錄引擎可以執行。
3. 開啟 Premiere 的 `PlayerDebugMode`，讓 Premiere 可以載入沒有 Adobe 簽章的面板。

**請只從本專案的 [Releases](https://github.com/LouieLu1129/whisper-subs-in/releases) 頁面下載 Whisper Subs In。** 每個版本都會附上 zip 檔的 SHA-256 檢查碼；想確認下載的檔案沒被改過，可以在終端機輸入 `shasum -a 256` 再加上 zip 檔，把結果和頁面上的檢查碼比對。

`PlayerDebugMode` 對所有沒有 Adobe 簽章的面板都有效，不只這一個，所以請只安裝你信任的面板。之後想關掉的話，在終端機執行 `defaults write com.adobe.CSXS.12 PlayerDebugMode 0`（關掉後 Whisper Subs In 也會無法載入）。

## 模型

Whisper Subs In 使用 [whisper.cpp](https://github.com/ggml-org/whisper.cpp) 格式的 Whisper 模型（`.bin` 檔），不會自動下載。

我預設使用 **ggml-medium**（1.5 GB），一般影片、多數語言都很夠用。其他大小的模型可以在 [whisper.cpp 模型頁](https://huggingface.co/ggerganov/whisper.cpp/tree/main)下載：小的比較快，大的可能更準，但比較慢。

如果其他 Whisper 軟體已經下載過 `.bin` 模型，在面板按模型選單旁的「**新增資料夾**」按鈕，直接使用那個資料夾就好，不用重新下載。

## 使用方式

1. 打開要上字幕的序列。
2. 選擇模型、語言、範圍和音軌。
3. 按 **Create captions**。

字幕會存成 SRT 檔放在專案旁邊，同時在序列上建立字幕軌。匯出音訊時 Premiere 可能會暫時沒有反應，這是正常的。

**小技巧：** 如果序列開頭有一長段配樂或 B-roll，把入點和出點設在有人說話的範圍，時間會更準。

## 移除

雙擊 `Uninstall Whisper Subs In.command`。模型會留在「文件 › Whisper Subs In」，不需要的話可以一併刪除那個資料夾。

## 自行編譯

給開發者參考。需要 Xcode Command Line Tools 和 [CMake](https://cmake.org)。

```bash
bash scripts/build-engine.sh   # 編譯 whisper.cpp 引擎到 panel/bin/
bash scripts/package.sh        # 打包發佈用的 zip 到 dist/
```

## 致謝

- [whisper.cpp](https://github.com/ggml-org/whisper.cpp)：Georgi Gerganov 與貢獻者，轉錄引擎（MIT）
- [Whisper](https://github.com/openai/whisper)：OpenAI，語音辨識模型（MIT）
- [opencc-js](https://github.com/nk2028/opencc-js)：nk2028 專案，字典來自 [OpenCC](https://github.com/BYVoid/OpenCC)，用於繁簡轉換（MIT、Apache-2.0）
- [Spectrum Workflow Icons](https://github.com/adobe/spectrum-css-workflow-icons)：Adobe，介面圖示（Apache-2.0）
- 受到 Tom Moroney 的 [AutoSubs](https://github.com/tmoroney/auto-subs) 啟發，它示範了如何在 Premiere 匯出序列音訊並建立字幕軌

完整授權條款請見 [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)。

## 授權

[MIT](LICENSE) © 2026 LouieLu1129

Whisper Subs In 是獨立專案，與 Adobe、OpenAI 沒有任何關係。Premiere Pro 是 Adobe 的商標。

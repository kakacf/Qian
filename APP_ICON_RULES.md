# Qian App Icon / Home Screen 固定規則

本文件定義 Qian 的 App Icon、iOS「加入主畫面」與 PWA icon 固定規則。任何 AI Agent、ChatGPT、Codex、自動化程式或每日晨報重建流程，只要會修改 `index.html`、`archive/YYYY-MM-DD.html`、`site.webmanifest` 或 App icon 檔案，都必須先讀本文件。

## 1. 核心原則

Qian 的 App Icon 是 Protected Asset。

- 現行 App Icon 固定為「三隻招財貓」圖。
- 未經使用者明確要求，不得更換圖片、改成文字 icon、預設字母 icon、favicon 截圖或其他圖案。
- 每日晨報更新、UI 改版、HTML 重建、Theme 更新或 archive 產生時，都不得把 App Icon / PWA metadata 洗掉。
- 功能更新與日報重建都必須視為「保留 icon 設定」的情況，不是重新產生 `<head>` 後再補。

## 2. 必須永久存在的檔案

以下檔案不得因改版刪除：

- `/Qian/apple-touch-icon.png`：180×180 PNG，iOS 加入主畫面主要 icon。
- `/Qian/qian-icon-512.png`：512×512 PNG，manifest / PWA 使用。
- `/Qian/site.webmanifest`：PWA manifest。
- `/Qian/qian-icon.svg`：原始三貓 icon 資產，可保留作為來源或備援。
- `/Qian/qian-icon.jpg`：原始點陣來源，可保留作為 PNG 重建來源。

其中 iOS 主畫面 icon **必須優先使用 PNG**；不可只依賴 SVG 或 JPEG。

## 3. index.html 與每日 archive 的固定 <head>

`index.html` 與每個 `archive/YYYY-MM-DD.html` 的 `<head>` 必須保留以下等價設定：

```html
<meta name="theme-color" content="#FFF9E8">
<meta name="apple-mobile-web-app-title" content="Qian">
<link rel="icon" href="/Qian/qian-icon-512.png" type="image/png">
<link rel="apple-touch-icon" sizes="180x180" href="/Qian/apple-touch-icon.png">
<link rel="manifest" href="/Qian/site.webmanifest">
```

規則：

- `apple-touch-icon` 不加日期 query string；保持固定 URL，避免 iOS Home Screen 取圖異常。
- `apple-mobile-web-app-title` 固定為 `Qian`。
- 每日 `<title>` 可包含日期，但加入主畫面的名稱不可跟著每日 title 改變。
- archive 也必須保留相同 metadata，因為使用者可能從歷史頁或不同入口加入主畫面。

## 4. site.webmanifest 固定要求

manifest 至少包含：

- `name: "Qian Daily Brief"`
- `short_name: "Qian"`
- `start_url: "/Qian/"`
- `display: "standalone"`
- 180×180 PNG icon
- 512×512 PNG icon

不得只保留 SVG icon。

## 5. 晨報 / 改版流程的硬規則

任何會重寫 `index.html` 的流程，包含：

- 每日 07:00 晨報產生
- 07:15 補救
- 手動 UI 改版
- Theme 套用
- archive 同步
- 大段 HTML replace / regenerate

都必須採「保留既有 `<head>` App metadata」策略。

禁止：

- 用新模板整段覆蓋 `<head>`，卻沒有帶回 icon metadata。
- 因為每日 title / description 更新而重建整個 `<head>`。
- 用 favicon / SVG 取代 iOS `apple-touch-icon.png`。
- 把 `apple-mobile-web-app-title` 刪掉。
- 只修首頁、不修當日 archive。

## 6. 發布前驗證

每次修改 `index.html` 或當日 archive 後，至少檢查：

1. `index.html` 仍含 `apple-touch-icon.png`。
2. `index.html` 仍含 `qian-icon-512.png`。
3. `index.html` 仍含 `site.webmanifest`。
4. `index.html` 仍含 `apple-mobile-web-app-title" content="Qian"`。
5. 當日 archive 也含相同四項。
6. `apple-touch-icon.png` 與 `qian-icon-512.png` 檔案仍存在。
7. `site.webmanifest` 仍引用 PNG icons。
8. GitHub Pages 部署後，公開首頁能取得上述 icon 路徑。

若任一項缺失，發布視為未完成。

## 7. iPhone 驗收標準

Safari → 分享 → 加入主畫面時：

- 預覽 icon 必須顯示三隻招財貓。
- 不可顯示灰底「Q」。
- 名稱應為 `Qian`，不可顯示每天變動的 `Qian Daily Brief｜YYYY-MM-DD`。
- 「打開為網頁 App」開啟後，首頁功能應正常。

若看到灰底字母 icon，優先檢查：

1. `apple-touch-icon.png` 是否存在且為 PNG。
2. `<link rel="apple-touch-icon"...>` 是否仍在公開頁。
3. GitHub Pages 是否已部署最新 commit。
4. 是否從帶大量 query string 的舊入口加入。
5. iOS 是否仍使用舊 Home Screen 快取；必要時刪除舊捷徑再重新加入。

## 8. Agent 修改前後檢查

修改前：
- 先讀 `APP_ICON_RULES.md`。
- 如果 Task Scope 會碰到 HTML `<head>`、manifest、theme 或整頁模板，將 App Icon 視為 Protected Asset。

修改後：
- 執行本文件第 6 節驗證。
- 未經使用者要求，不得改三貓圖本身。

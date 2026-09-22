# Qian UI 修改邊界

本文件定義 Qian 專案的 UI 修改邊界。任何 AI Agent、Codex、ChatGPT 或自動化程式在修改前端畫面前，都必須遵守本文件。

## 1. 核心原則

### 預設：不要改 UI

如果任務沒有明確要求修改 UI：

- 不得調整版面、移動區塊或重新排序
- 不得修改間距、寬高、字體、顏色、邊框、陰影或卡片樣式
- 不得更換 icon、emoji、圖片或按鈕位置
- 不得改變桌機版或手機版的 RWD 行為
- 不得因為「看起來比較好」而自行重新設計

修資料、邏輯、排程、API、Daily Report、雷達或風險示警時，必須保持現有 UI 不變。

> Existing UI is protected unless the user explicitly asks to change it.

> Functional change does not imply visual change.

## 2. 最小變更原則

所有 UI 修改都必須只涵蓋完成當前需求所必要的最小範圍。

例如，需求是「風險示警加上更新時間」時，只能在指定位置加入更新時間；不得順便重新設計整張卡片、改 Banner 高度、調整 padding、字型大小、風險圖示位置或其他欄位順序。

## 3. 未經明確指示禁止修改的項目

### Layout

- section 或卡片順序
- Grid／Flex 結構與欄數
- 內容排列方向
- 區塊合併或拆分
- 導覽列、抽屜、Banner、Radar、Daily Report 或 Risk 區塊的位置

### Visual

- 色票與背景色
- border、border-radius、shadow
- font-size、font-weight、line-height
- icon、emoji、圖片與卡片風格

### Spacing and sizing

- margin、padding、gap
- width、height、max-width
- section 間距

只有當該項目本身就是使用者明確要求修正的問題時，才可以修改。

## 4. Protected UI

目前已完成並投入使用的畫面，一律視為 Protected UI。

Protected UI 可以依需求更新文字、數據、狀態或明確指定的小功能，但不得重新設計。若需求沒有提到某個 UI 元素，應假設使用者希望它保持原樣。

## 5. 功能修改不得影響外觀

修改以下功能時，應優先修改資料處理、API、狀態、排程或後端邏輯，不得順便重構 UI：

- Daily Brief
- ETF Radar
- 個股 Radar
- 風險示警
- 歷史資料
- 排程與 GitHub Actions
- 資料來源、API、快取、更新時間與排序邏輯

## 6. CSS 修改規則

修改 CSS 前必須確認：

1. CSS 修改是否為完成需求所必要。
2. 是否只會影響目標元件。
3. 是否會影響其他 section。
4. 是否修改到共用 class。
5. 是否可能造成桌機版或手機版其他畫面變動。

不得為了修正單一區塊而修改 `.card`、`.section`、`.container`、`body`、`main` 等全域或共用 selector，除非使用者明確要求全站修改。優先使用目標元件的專屬 selector。

## 7. 重構不得改變畫面

程式碼重構必須同時符合：

- Behavior-preserving
- UI-preserving

即使 HTML 結構、CSS、元件拆分或 UI library 可以重新整理，也不得自行改變現有畫面。重構與 UI redesign 必須視為兩個不同任務。

## 8. 任務範圍鎖定

開始修改前，必須先寫出本次 Task Scope。

例如使用者要求「修正 ETF Radar 排序」，Task Scope 只有 ETF Radar sorting，不包含 ETF Radar layout、個股 Radar layout、Risk Alert UI、Daily Report UI、Navigation 或 Theme。

## 9. 何時才算取得 UI 修改許可

以下類型的明確指令，才代表可以修改指定區域的 UI：

- 幫我調整 UI
- 重新排版
- 這裡移到上面
- 這個區塊改成表格
- 幫我改配色
- 這裡間距縮小
- 按鈕放右邊
- 重新設計這個區塊

以下指令不代表允許重新設計：

- 修正、更新、補資料
- 加入資料或增加欄位
- 排序
- 排程修正
- 資料錯了或沒有更新

即使取得 UI 修改許可，也只解除使用者明確指定區域的保護，其他區域仍維持 Protected UI。

## 10. 不確定時的處理方式

若需求可以透過修改邏輯或修改 UI 兩種方式完成，優先修改邏輯。

若無法確定是否允許 UI 修改，保留目前 UI，不得自行猜測使用者想重新設計。

## 11. UI Regression Check

每次修改完成後必須確認：

- 原本區塊與卡片順序相同
- 原本按鈕位置相同
- 原本字體、顏色與間距相同
- 桌機版沒有非預期變動
- 手機版沒有非預期變動
- 未在 Task Scope 內的 UI 元素沒有變動

如果任務沒有要求 UI 改動，UI diff 應接近 0。

## 12. Agent 執行規則

每次修改 Qian 前端之前，Agent 必須：

1. 讀取 `UI_BOUNDARIES.md`。
2. 寫出本次 Task Scope。
3. 判斷需求是否明確允許修改 UI。
4. 若不需要修改 UI，保持外觀完全不變。
5. 若需要修改 UI，只修改明確指定區域。
6. 完成後執行 UI Regression Check。

# Qian — Agent 工作規則

本檔案約束所有修改 `kakacf/Qian` 的 agent。執行前必讀 `QIAN_SPEC.md`、`QIAN_DATA_RUNBOOK.md`、`UI_BOUNDARIES.md` 與 `APP_ICON_RULES.md`。

## UI Protection

1. 修改任何前端 HTML、CSS、layout 或 component structure 前，必須先讀取 `UI_BOUNDARIES.md`，並明確寫出本次 Task Scope。
2. 現有 UI 預設全部受保護。功能需求不代表允許重新設計、重新排序、改樣式、改尺寸或移動任何未指定的 UI。
3. 只有使用者明確要求修改 UI 時，才可修改其指定區域；其他區域仍維持 Protected UI。
4. 所有修改採最小變更原則。若功能可透過資料、邏輯、狀態或排程修正完成，不得修改 UI。
5. 若任務沒有要求 UI 改動，HTML／CSS／layout 的視覺 diff 應接近 0。
6. 完成後必須依 `UI_BOUNDARIES.md` 執行 UI Regression Check。

> Existing UI is protected unless the user explicitly asks to change it.

> Functional change does not imply visual change.

## 每日晨報與資料更新

1. 先抓完所有觀察標的資料，再開始寫晨報；不得只更新首頁價格表而遺漏 ETF／個股雷達。
2. 美股一律使用 Alpaca IEX 的最近一個美股交易日收盤；台股一律用 FinMind 日線並與 TWSE 官方盤後交叉驗證。
3. 總經固定優先用 FRED／BLS；公司營收、財報與重大訊息用 MOPS。
4. 每張雷達卡都要標示相同的最新交易日。若單一標的抓取失敗，該卡改為「🟡 資料待更新」，標示最後成功日期與缺少來源；不得沿用舊日數字當成當日判讀。
5. 發布前，必須搜尋首頁與當日 archive 中是否殘留前一交易日（例如本期的 `9/10`）。只有明確標為「前一資料日／歷史比較」才可以保留。
6. **核心觀察表與快速索引屬每日晨報必要區塊，不得漏掉。** 首頁與當日 archive 都必須存在 `id="core"` 的「核心觀察表」，且快速索引必須存在 `href="#core"` 的「核心觀察」按鈕；缺任一項即視為發布失敗。
7. 核心觀察表固定保留所有核心標的；個別資料抓取失敗只能降級為「資料待更新」，不得刪除整表或該列。

## 發布與驗證

1. 07:00（Asia/Taipei）產出完整晨報，07:15 檢查首頁與當日 archive 是否存在、日期一致且內容一致。
2. 一次日報修改必須同步更新 `index.html` 和 `archive/YYYY-MM-DD.html`；日報主體內容兩者必須完全一致。首頁獨立的 Risk Alert 更新時間可不同。
3. Risk Alert 是獨立增量更新：只改首頁 `index.html` 與 `risk-alert.html`，但不能覆寫晨報內容。風險示警本身要顯示自己的更新時間。
4. 發布後重新讀取 GitHub 的檔案與 GitHub Pages，確認公開頁面已包含新日期與新數值；「排程被觸發」不算完成，只有可見頁面與 archive 都驗證成功才算完成。
5. 若 GitHub 寫入失敗，直接改用已連接的 GitHub connector；不得只留下本機 commit 就宣稱已發布。
6. 新增或更新日報時，首頁與 archive 都必須保留 `/Qian/history.js`；歷史 Drawer 由 `archive/history.json` 自動列出全部 archive，不得讓舊日報的歷史清單停在當時日期。

完整來源、檢查指令與失敗處置見 `QIAN_DATA_RUNBOOK.md`。


## App Icon Protection

1. 任何會修改 `index.html`、當日 archive、`<head>`、Theme 或 manifest 的任務，必須先讀 `APP_ICON_RULES.md`。
2. 三隻招財貓 App Icon 為 Protected Asset；每日晨報、UI 改版與 HTML 重建都不得移除或替換。
3. 發布前必須確認 iOS PNG icon、manifest 與 `apple-mobile-web-app-title=Qian` 仍存在；缺任一項不得視為完成。

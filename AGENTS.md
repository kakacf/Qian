# Qian — Agent 工作規則

本檔案約束所有修改 `kakacf/Qian` 的 agent。執行前必讀 `QIAN_SPEC.md` 與 `QIAN_DATA_RUNBOOK.md`。

## 每日晨報與資料更新

1. 先抓完所有觀察標的資料，再開始寫晨報；不得只更新首頁價格表而遺漏 ETF／個股雷達。
2. 美股一律使用 Alpaca IEX 的最近一個美股交易日收盤；台股一律用 FinMind 日線並與 TWSE 官方盤後交叉驗證。
3. 總經固定優先用 FRED／BLS；公司營收、財報與重大訊息用 MOPS。
4. 每張雷達卡都要標示相同的最新交易日。若單一標的抓取失敗，該卡改為「🟡 資料待更新」，標示最後成功日期與缺少來源；不得沿用舊日數字當成當日判讀。
5. 發布前，必須搜尋首頁與當日 archive 中是否殘留前一交易日（例如本期的 `9/10`）。只有明確標為「前一資料日／歷史比較」才可以保留。

## 發布與驗證

1. 07:00（Asia/Taipei）產出完整晨報，07:15 檢查首頁與當日 archive 是否存在、日期一致且內容一致。
2. 一次日報修改必須同步更新 `index.html` 和 `archive/YYYY-MM-DD.html`；日報主體內容兩者必須完全一致。首頁獨立的 Risk Alert 更新時間可不同。
3. Risk Alert 是獨立增量更新：只改首頁 `index.html` 與 `risk-alert.html`，但不能覆寫晨報內容。風險示警本身要顯示自己的更新時間。
4. 發布後重新讀取 GitHub 的檔案與 GitHub Pages，確認公開頁面已包含新日期與新數值；「排程被觸發」不算完成，只有可見頁面與 archive 都驗證成功才算完成。
5. 若 GitHub 寫入失敗，直接改用已連接的 GitHub connector；不得只留下本機 commit 就宣稱已發布。

完整來源、檢查指令與失敗處置見 `QIAN_DATA_RUNBOOK.md`。

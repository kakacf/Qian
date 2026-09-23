(() => {
  const drawer = document.getElementById("drawer");
  if (!drawer) return;

  const heading = [...drawer.querySelectorAll("h2,h3")].find((node) =>
    node.textContent.includes("歷史")
  );
  if (!heading) return;

  fetch("/Qian/archive/history.json", { cache: "no-store" })
    .then((response) => {
      if (!response.ok) throw new Error("history list unavailable");
      return response.json();
    })
    .then(({ reports }) => {
      if (!Array.isArray(reports)) return;

      const nextHeading = (() => {
        let node = heading.nextElementSibling;
        while (node && !/^H[23]$/.test(node.tagName)) node = node.nextElementSibling;
        return node;
      })();

      const existingLinks = [];
      let node = heading.nextElementSibling;
      while (node && node !== nextHeading) {
        if (node.tagName === "A") existingLinks.push(node);
        node = node.nextElementSibling;
      }

      const latest = reports[0];
      const homeLink = existingLinks.find(
        (link) => new URL(link.href, location.origin).pathname === "/Qian/"
      );
      if (homeLink && latest?.date) {
        homeLink.innerHTML = `<strong>最新 ${latest.date.replaceAll("-", "/")}</strong>`;
      }

      // 移除區段內既有的 archive 靜態連結，改由 history.json 統一重建。
      // 這可避免「只有較舊日期是動態補入」時被插到最新日期前面。
      for (const link of existingLinks) {
        const pathname = new URL(link.href, location.origin).pathname;
        if (pathname.startsWith("/Qian/archive/")) link.remove();
      }

      // history.json 已依日期由新到舊排列；一次建立完整清單並插入，
      // 保證 Drawer 永遠維持最新日期在最上方。
      const fragment = document.createDocumentFragment();
      for (const report of reports) {
        if (
          !report?.href ||
          !report?.date ||
          (homeLink && report.href === latest?.href)
        ) continue;
        const link = document.createElement("a");
        link.className = "history";
        link.href = report.href;
        link.textContent = report.date.replaceAll("-", "/");
        fragment.appendChild(link);
      }

      drawer.insertBefore(fragment, nextHeading);
    })
    .catch(() => {
      // 保留各頁原有靜態清單作為失敗時的 fallback。
    });
})();

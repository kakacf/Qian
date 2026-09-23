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

      const existingHrefs = new Set(
        existingLinks.map((link) => new URL(link.href, location.origin).pathname)
      );

      const latest = reports[0];
      const homeLink = existingLinks.find(
        (link) => new URL(link.href, location.origin).pathname === "/Qian/"
      );
      if (homeLink && latest?.date) {
        homeLink.innerHTML = `<strong>最新 ${latest.date.replaceAll("-", "/")}</strong>`;
      }

      const insertionPoint = homeLink
        ? homeLink.nextElementSibling
        : heading.nextElementSibling;

      // history.json 已依日期由新到舊排列。
      // 使用 DocumentFragment 一次插入，避免重複 insertBefore()
      // 將順序反轉成舊到新。
      const fragment = document.createDocumentFragment();
      for (const report of reports) {
        if (
          !report?.href ||
          !report?.date ||
          existingHrefs.has(report.href) ||
          (homeLink && report.href === latest?.href)
        ) continue;
        const link = document.createElement("a");
        link.className = "history";
        link.href = report.href;
        link.textContent = report.date.replaceAll("-", "/");
        fragment.appendChild(link);
      }
      drawer.insertBefore(fragment, insertionPoint);
    })
    .catch(() => {
      // 保留各頁原有靜態清單作為失敗時的 fallback。
    });
})();

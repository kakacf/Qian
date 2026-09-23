(() => {
  if (!("ontouchstart" in window)) return;

  const THRESHOLD = 78;
  const MAX_PULL = 120;
  let startY = 0;
  let pull = 0;
  let tracking = false;

  const indicator = document.createElement("div");
  indicator.setAttribute("aria-live", "polite");
  Object.assign(indicator.style, {
    position: "fixed",
    top: "0",
    left: "50%",
    zIndex: "1000",
    padding: "7px 12px",
    borderRadius: "0 0 12px 12px",
    background: "#102d3b",
    color: "#fff",
    fontSize: "13px",
    fontWeight: "700",
    lineHeight: "1.2",
    transform: "translate(-50%, -120%)",
    transition: "transform .16s ease",
    pointerEvents: "none",
    boxShadow: "0 6px 16px #102d3b22"
  });
  indicator.textContent = "下拉刷新";
  document.body.appendChild(indicator);

  const reset = () => {
    tracking = false;
    pull = 0;
    indicator.style.transform = "translate(-50%, -120%)";
    indicator.textContent = "下拉刷新";
  };

  document.addEventListener("touchstart", (event) => {
    if (window.scrollY > 0 || document.getElementById("drawer")?.classList.contains("open")) {
      tracking = false;
      return;
    }
    const touch = event.touches[0];
    if (!touch) return;
    startY = touch.clientY;
    pull = 0;
    tracking = true;
  }, { passive: true });

  document.addEventListener("touchmove", (event) => {
    if (!tracking) return;
    const touch = event.touches[0];
    if (!touch) return;

    const delta = touch.clientY - startY;
    if (delta <= 0 || window.scrollY > 0) {
      reset();
      return;
    }

    event.preventDefault();
    pull = Math.min(MAX_PULL, delta * 0.55);
    const progress = Math.min(1, pull / THRESHOLD);
    const y = -100 + progress * 118;
    indicator.style.transform = `translate(-50%, ${y}%)`;
    indicator.textContent = pull >= THRESHOLD ? "放開刷新" : "下拉刷新";
  }, { passive: false });

  document.addEventListener("touchend", () => {
    if (!tracking) return;
    const shouldRefresh = pull >= THRESHOLD;
    if (!shouldRefresh) {
      reset();
      return;
    }

    tracking = false;
    indicator.textContent = "更新中…";
    indicator.style.transform = "translate(-50%, 18%)";
    window.setTimeout(() => window.location.reload(), 120);
  }, { passive: true });

  document.addEventListener("touchcancel", reset, { passive: true });
})();

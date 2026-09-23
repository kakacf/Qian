(() => {
  const THRESHOLD = 64;
  let startY = null;
  let distance = 0;
  let tracking = false;

  const indicator = document.createElement("div");
  indicator.setAttribute("aria-live", "polite");
  indicator.textContent = "下拉刷新";
  Object.assign(indicator.style, {
    position: "fixed",
    left: "50%",
    top: "max(8px, env(safe-area-inset-top))",
    zIndex: "9999",
    padding: "7px 12px",
    borderRadius: "999px",
    background: "#102d3b",
    color: "#fff",
    fontSize: "13px",
    fontWeight: "700",
    lineHeight: "1.2",
    boxShadow: "0 6px 16px #102d3b22",
    pointerEvents: "none",
    opacity: "0",
    transform: "translate(-50%, -20px)",
    transition: "opacity .12s ease, transform .12s ease"
  });
  document.body.appendChild(indicator);

  const atTop = () => {
    const el = document.scrollingElement || document.documentElement;
    return (el.scrollTop || window.scrollY || 0) <= 1;
  };

  const hide = () => {
    indicator.style.opacity = "0";
    indicator.style.transform = "translate(-50%, -20px)";
    indicator.textContent = "下拉刷新";
    startY = null;
    distance = 0;
    tracking = false;
  };

  document.addEventListener("touchstart", (event) => {
    if (!atTop() || document.getElementById("drawer")?.classList.contains("open")) return;
    const touch = event.touches?.[0];
    if (!touch) return;
    startY = touch.clientY;
    distance = 0;
    tracking = true;
  }, { passive: true });

  document.addEventListener("touchmove", (event) => {
    if (!tracking || startY == null) return;
    const touch = event.touches?.[0];
    if (!touch) return;

    const delta = touch.clientY - startY;
    if (delta <= 0 || !atTop()) {
      hide();
      return;
    }

    distance = delta;
    event.preventDefault();

    indicator.style.opacity = "1";
    indicator.style.transform =
      `translate(-50%, ${Math.min(24, Math.max(0, delta * 0.18))}px)`;
    indicator.textContent = distance >= THRESHOLD ? "放開刷新" : "下拉刷新";
  }, { passive: false });

  document.addEventListener("touchend", () => {
    if (!tracking) return;

    if (distance < THRESHOLD) {
      hide();
      return;
    }

    tracking = false;
    indicator.style.opacity = "1";
    indicator.style.transform = "translate(-50%, 14px)";
    indicator.textContent = "更新中…";

    const url = new URL(window.location.href);
    url.searchParams.set("_refresh", Date.now().toString());
    window.location.replace(url.toString());
  }, { passive: true });

  document.addEventListener("touchcancel", hide, { passive: true });
})();
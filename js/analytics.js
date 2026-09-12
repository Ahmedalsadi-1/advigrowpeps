/* ADVIGROW analytics stub — paste IDs in docs/ANALYTICS-SETUP.md then uncomment */
(() => {
  "use strict";
  const CONFIG = { GA4_ID: "", META_PIXEL_ID: "", TIKTOK_PIXEL_ID: "" }; // TODO owner
  window.AdvigrowAnalytics = (event, params = {}) => {
    try {
      if (window.gtag && CONFIG.GA4_ID) window.gtag("event", event, { ...params, utm_source: new URLSearchParams(location.search).get("utm_source") || undefined });
      if (window.fbq && CONFIG.META_PIXEL_ID) window.fbq("trackCustom", event, params);
      if (window.ttq && CONFIG.TIKTOK_PIXEL_ID) window.ttq.track(event, params);
    } catch {}
    try { console.info("[analytics]", event, params); } catch {}
  };
  // UTM convention: ?utm_source=tiktok&utm_medium=social&utm_campaign=lot_launch&utm_content=video1&utm_term=ruo
})();

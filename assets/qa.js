/* ==============================================================
   야외 무선 활동 실전 Q&A 시리즈 — 공통 스크립트
   1) 모두 펼치기 / 모두 접기
   2) 티스토리 iframe 자동 높이 알림
   ============================================================== */
(function () {
  function postHeight() {
    if (window.parent === window) return;
    parent.postMessage({ type: 'otaHeight', h: document.documentElement.scrollHeight }, '*');
  }

  function syncToggleButton(btn) {
    var items = document.querySelectorAll('.qa-item');
    var allOpen = items.length > 0 && Array.prototype.every.call(items, function (d) { return d.open; });
    btn.textContent = allOpen ? '모두 접기 ▴' : '모두 펼치기 ▾';
    btn.setAttribute('aria-pressed', allOpen ? 'true' : 'false');
  }

  document.addEventListener('DOMContentLoaded', function () {
    var btn = document.getElementById('qaToggleAll');
    if (btn) {
      btn.addEventListener('click', function () {
        var items = document.querySelectorAll('.qa-item');
        var open = btn.getAttribute('aria-pressed') !== 'true';
        items.forEach(function (d) { d.open = open; });
        syncToggleButton(btn);
        postHeight();
      });
      document.addEventListener('toggle', function () { syncToggleButton(btn); }, true);
      syncToggleButton(btn);
    }
    postHeight();
  });

  window.addEventListener('load', postHeight);
  document.addEventListener('toggle', postHeight, true);
  if (window.ResizeObserver) {
    document.addEventListener('DOMContentLoaded', function () {
      new ResizeObserver(postHeight).observe(document.body);
    });
  }
})();

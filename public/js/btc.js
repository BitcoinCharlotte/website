// Bitcoin Charlotte — Shared JS
// MIT License — fully open source

// Accordion toggle
function btcToggle(id) {
  var acc = document.getElementById(id);
  if (acc) { acc.classList.toggle('open'); }
}
window.btcToggle = btcToggle;

// Progress bar initialization
function btcInitProgress(count, total) {
  total = total || 100;
  var pct = Math.min(Math.max((count / total) * 100, 0), 100);
  var remaining = total - count;
  var countEl = document.getElementById('btc-count-display');
  var bar = document.getElementById('btc-bar');
  var sub = document.getElementById('btc-progress-sub');
  if (countEl) countEl.innerHTML = count + ' <span style="font-size:16px;color:#5a5a7a;font-family:DM Sans,sans-serif;font-weight:500;">/ ' + total + '</span>';
  if (bar) {
    bar.style.transition = 'none';
    bar.style.width = '0%';
    bar.getBoundingClientRect();
    bar.style.transition = 'width 1.2s ease-out';
    bar.style.width = pct + '%';
  }
  if (sub) sub.innerHTML = remaining > 0
    ? '<strong style="color:#41449f;">' + remaining + ' more</strong> to reach the goal — let\'s go!'
    : '🎉 <strong>Goal reached!</strong> ' + total + ' businesses onboarded.';
}
window.btcInitProgress = btcInitProgress;

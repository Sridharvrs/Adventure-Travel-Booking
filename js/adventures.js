/* ============================================
   ADVENTURES PAGE JAVASCRIPT - Premium
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {

  // === Create particles in header ===
  var advParticles = document.getElementById('advParticles');
  if (advParticles) {
    for (var i = 0; i < 20; i++) {
      var p = document.createElement('div');
      p.className = 'particle';
      var size = Math.random() * 5 + 2;
      p.style.width = size + 'px';
      p.style.height = size + 'px';
      p.style.left = Math.random() * 100 + '%';
      p.style.background = Math.random() > 0.5 ? 'rgba(230,126,34,0.5)' : 'rgba(243,156,18,0.6)';
      p.style.boxShadow = '0 0 8px rgba(230,126,34,0.5)';
      p.style.animationDuration = (Math.random() * 10 + 12) + 's';
      p.style.animationDelay = (Math.random() * 10) + 's';
      advParticles.appendChild(p);
    }
  }

  // === Tab filtering ===
  var tabs = document.querySelectorAll('.adv-tab');
  var cards = document.querySelectorAll('.adventure-card');

  tabs.forEach(function(tab) {
    tab.addEventListener('click', function() {
      tabs.forEach(function(t) { t.classList.remove('active'); });
      tab.classList.add('active');

      var filter = tab.getAttribute('data-tab');

      cards.forEach(function(card) {
        var type = card.getAttribute('data-type');
        if (filter === 'all' || type === filter) {
          card.style.display = 'flex';
          card.style.animation = 'zoomIn 0.5s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // === Book button interaction ===
  document.querySelectorAll('.adv-card-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var originalText = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-check"></i> Added to Wishlist!';
      btn.style.background = 'var(--success)';
      setTimeout(function() {
        btn.innerHTML = originalText;
        btn.style.background = '';
      }, 2000);
    });
  });
});

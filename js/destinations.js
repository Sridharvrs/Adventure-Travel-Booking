/* ============================================
   DESTINATIONS PAGE JAVASCRIPT - Premium
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {

  // === Create particles in header ===
  var headerParticles = document.getElementById('headerParticles');
  if (headerParticles) {
    for (var i = 0; i < 20; i++) {
      var p = document.createElement('div');
      p.className = 'particle';
      var size = Math.random() * 5 + 2;
      p.style.width = size + 'px';
      p.style.height = size + 'px';
      p.style.left = Math.random() * 100 + '%';
      p.style.background = 'rgba(85,239,196,0.5)';
      p.style.animationDuration = (Math.random() * 10 + 12) + 's';
      p.style.animationDelay = (Math.random() * 10) + 's';
      headerParticles.appendChild(p);
    }
  }

  // === Filter pills ===
  var pills = document.querySelectorAll('.filter-pill');
  var cards = document.querySelectorAll('.dest-list-card');
  var noResults = document.getElementById('noResults');

  pills.forEach(function(pill) {
    pill.addEventListener('click', function() {
      pills.forEach(function(p) { p.classList.remove('active'); });
      pill.classList.add('active');

      var filter = pill.getAttribute('data-filter');
      var visibleCount = 0;

      cards.forEach(function(card) {
        var region = card.getAttribute('data-region');
        if (filter === 'all' || region === filter) {
          card.style.display = 'flex';
          card.style.animation = 'zoomIn 0.5s ease';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });

      if (noResults) {
        noResults.style.display = visibleCount === 0 ? 'block' : 'none';
      }
    });
  });

  // === Book button interaction ===
  document.querySelectorAll('.card-book-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var originalText = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-check"></i> Redirecting...';
      btn.style.background = 'var(--success)';
      setTimeout(function() {
        btn.innerHTML = originalText;
        btn.style.background = '';
      }, 2000);
    });
  });
});

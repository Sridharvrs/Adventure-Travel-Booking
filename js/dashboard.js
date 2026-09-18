/* ============================================
   DASHBOARD SHARED JAVASCRIPT
   Sidebar toggle, module switching, logout
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {

  // === Sidebar toggle (mobile) ===
  var toggle = document.querySelector('.topbar-toggle');
  var sidebar = document.querySelector('.sidebar');
  var overlay = document.querySelector('.sidebar-overlay');

  if (toggle && sidebar) {
    toggle.addEventListener('click', function() {
      sidebar.classList.toggle('open');
      if (overlay) overlay.classList.toggle('active');
    });
  }

  if (overlay) {
    overlay.addEventListener('click', function() {
      sidebar.classList.remove('open');
      overlay.classList.remove('active');
    });
  }

  // === Module switching ===
  var navItems = document.querySelectorAll('.sidebar-nav-item');
  var modules = document.querySelectorAll('.module-section');
  var topbarTitle = document.querySelector('.topbar-title');

  navItems.forEach(function(item) {
    item.addEventListener('click', function() {
      var targetModule = item.getAttribute('data-module');
      var moduleTitle = item.getAttribute('data-title') || targetModule;

      // Update nav active state
      navItems.forEach(function(n) { n.classList.remove('active'); });
      item.classList.add('active');

      // Show target module
      modules.forEach(function(m) { m.classList.remove('active'); });
      var target = document.getElementById('module-' + targetModule);
      if (target) {
        target.classList.add('active');
      }

      // Update topbar title
      if (topbarTitle) {
        topbarTitle.textContent = moduleTitle;
      }

      // Close sidebar on mobile
      if (window.innerWidth <= 768) {
        sidebar.classList.remove('open');
        if (overlay) overlay.classList.remove('active');
      }

      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  // === Logout ===
  var logoutBtns = document.querySelectorAll('.sidebar-logout, .topbar-logout-mobile');
  logoutBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      if (confirm('Are you sure you want to log out?')) {
        window.location.href = 'login.html';
      }
    });
  });

  // === Counter animation ===
  var counters = document.querySelectorAll('[data-count]');
  var countersAnimated = false;

  function animateCounters() {
    if (countersAnimated) return;
    var first = counters[0];
    if (!first) return;
    if (first.getBoundingClientRect().top < window.innerHeight * 0.9) {
      countersAnimated = true;
      counters.forEach(function(counter) {
        var target = parseInt(counter.getAttribute('data-count'));
        var suffix = counter.getAttribute('data-suffix') || '';
        var duration = 1800;
        var startTime = null;

        function update(currentTime) {
          if (!startTime) startTime = currentTime;
          var progress = Math.min((currentTime - startTime) / duration, 1);
          var eased = 1 - Math.pow(1 - progress, 3);
          var current = Math.floor(eased * target);
          counter.textContent = current.toLocaleString() + suffix;
          if (progress < 1) {
            requestAnimationFrame(update);
          } else {
            counter.textContent = target.toLocaleString() + suffix;
          }
        }
        requestAnimationFrame(update);
      });
    }
  }

  // Animate counters for the initially active module
  setTimeout(animateCounters, 300);

  // Re-animate when switching modules
  navItems.forEach(function(item) {
    item.addEventListener('click', function() {
      countersAnimated = false;
      counters.forEach(function(c) { c.textContent = '0'; });
      setTimeout(animateCounters, 100);
    });
  });
});

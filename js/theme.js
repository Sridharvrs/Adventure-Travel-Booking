/* ============================================
   SHARED JAVASCRIPT - All pages
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {

  // Navbar scroll effect
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // Mobile menu toggle
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const overlay = document.getElementById('overlay');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function() {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('open');
      if (overlay) overlay.classList.toggle('active');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });

    if (overlay) {
      overlay.addEventListener('click', function() {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('open');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
      });
    }

    // Close mobile menu when clicking a link (except login)
    mobileMenu.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('open');
        if (overlay) overlay.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // ''''''''''''''''''''''''''''''''''''''''''''''''
// Close button for mobile menu
const mobileMenuClose = document.getElementById("mobileMenuClose");

if (mobileMenuClose && mobileMenu) {
  mobileMenuClose.addEventListener("click", function() {
    hamburger.classList.remove("active");
    mobileMenu.classList.remove("open");

    if (overlay) {
      overlay.classList.remove("active");
    }

    document.body.style.overflow = '';
  });
}
  // Scroll reveal animation
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-zoom');

  function checkReveal() {
    var triggerBottom = window.innerHeight * 0.85;
    revealElements.forEach(function(el) {
      if (el.getBoundingClientRect().top < triggerBottom) {
        el.classList.add('active');
      }
    });
  }

  // Initial check
  checkReveal();

  // Throttled scroll
  var scrollTimeout;
  window.addEventListener('scroll', function() {
    if (scrollTimeout) cancelAnimationFrame(scrollTimeout);
    scrollTimeout = requestAnimationFrame(checkReveal);
  });

  // Counter animation
  var counters = document.querySelectorAll('[data-count]');
  var countersAnimated = false;

  function animateCounters() {
    if (countersAnimated) return;
    var firstCounter = counters[0];
    if (!firstCounter) return;
    if (firstCounter.getBoundingClientRect().top < window.innerHeight * 0.9) {
      countersAnimated = true;
      counters.forEach(function(counter) {
        var target = parseInt(counter.getAttribute('data-count'));
        var duration = 2000;
        var startTime = null;

        function update(currentTime) {
          if (!startTime) startTime = currentTime;
          var progress = Math.min((currentTime - startTime) / duration, 1);
          var current = Math.floor(progress * target);
          counter.textContent = current.toLocaleString();
          if (progress < 1) {
            requestAnimationFrame(update);
          } else {
            counter.textContent = target.toLocaleString() + (target >= 100 ? '+' : '');
          }
        }
        requestAnimationFrame(update);
      });
    }
  }

  window.addEventListener('scroll', animateCounters);
  animateCounters();
});

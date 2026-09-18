/* ============================================
   HOME PAGE JAVASCRIPT
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {

  // Testimonial slider
  var slides = document.querySelectorAll('.testimonial-card');
  var dots = document.querySelectorAll('.dot');
  var currentSlide = 0;
  var slideInterval;

  function showSlide(index) {
    slides.forEach(function(s) { s.classList.remove('active'); });
    dots.forEach(function(d) { d.classList.remove('active'); });
    if (slides[index]) slides[index].classList.add('active');
    if (dots[index]) dots[index].classList.add('active');
    currentSlide = index;
  }

  function nextSlide() {
    showSlide((currentSlide + 1) % slides.length);
  }

  if (slides.length > 0) {
    slideInterval = setInterval(nextSlide, 5000);

    dots.forEach(function(dot, index) {
      dot.addEventListener('click', function() {
        clearInterval(slideInterval);
        showSlide(index);
        slideInterval = setInterval(nextSlide, 5000);
      });
    });
  }

  // Newsletter form
  var newsletterForm = document.getElementById('newsletterForm');
  var newsletterMsg = document.getElementById('newsletterMsg');

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      var email = newsletterForm.querySelector('input').value;
      if (email) {
        newsletterMsg.textContent = 'Welcome aboard! Check your inbox for exclusive deals.';
        newsletterForm.querySelector('input').value = '';
        setTimeout(function() {
          newsletterMsg.textContent = '';
        }, 4000);
      }
    });
  }

  // Search button interaction
  var searchBtn = document.querySelector('.search-btn');
  if (searchBtn) {
    searchBtn.addEventListener('click', function(e) {
      e.preventDefault();
      searchBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Searching...';
      setTimeout(function() {
        searchBtn.innerHTML = '<i class="fas fa-check"></i> Found 24 trips!';
        searchBtn.style.background = 'var(--success)';
        setTimeout(function() {
          searchBtn.innerHTML = '<i class="fas fa-search"></i> Search';
          searchBtn.style.background = '';
        }, 2000);
      }, 1500);
    });
  }
});

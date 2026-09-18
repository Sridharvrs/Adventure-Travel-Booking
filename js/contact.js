/* ============================================
   CONTACT PAGE JAVASCRIPT
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {

  // FAQ accordion
  // toggleFaq is called via inline onclick, defined globally
});

/* ============================================
   FAQ ACCORDION
   ============================================ */

function toggleFaq(element) {

  const faqItem = element.closest('.faq-item');
  const allFaqItems = document.querySelectorAll('.faq-item');

  // Check if clicked FAQ is already open
  const isOpen = faqItem.classList.contains('active');

  // Close all FAQ items
  allFaqItems.forEach(function(item) {
    item.classList.remove('active');
  });

  // Open clicked FAQ
  if (!isOpen) {
    faqItem.classList.add('active');
  }
}

// Contact form submission
document.addEventListener('DOMContentLoaded', function() {
  var contactForm = document.getElementById('contactForm');
  var contactSubmit = document.getElementById('contactSubmitBtn');
  var contactSuccess = document.getElementById('contactSuccess');

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      contactSubmit.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      contactSubmit.disabled = true;

      setTimeout(function() {
        contactSubmit.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        contactSubmit.style.background = 'var(--success)';
        contactSuccess.textContent = 'Thank you! We\'ll get back to you within 24 hours.';

        setTimeout(function() {
          contactForm.reset();
          contactSubmit.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
          contactSubmit.style.background = '';
          contactSubmit.disabled = false;
          contactSuccess.textContent = '';
        }, 3000);
      }, 1500);
    });
  }
});

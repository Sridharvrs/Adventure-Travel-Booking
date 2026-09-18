document.addEventListener("DOMContentLoaded", () => {

    const currentUser = JSON.parse(
        sessionStorage.getItem("StacklyCurrentUser")
    );

    if (!currentUser) {
        return;
    }

    /* =========================================
       DYNAMIC PROFILE NAME
    ========================================= */

    document.querySelectorAll(".profileName").forEach(element => {
        element.textContent = currentUser.name || "Traveler";
    });


    /* =========================================
       DYNAMIC AVATAR LETTER
    ========================================= */

    const firstLetter = currentUser.name
        ? currentUser.name.trim().charAt(0).toUpperCase()
        : "?";

    document.querySelectorAll(".avatarLetter").forEach(element => {
        element.textContent = firstLetter;
    });

});







/* ============================================
   TRAVELER DASHBOARD JAVASCRIPT
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {

  // === Booking filter ===
  var filterBtns = document.querySelectorAll('.booking-filter-btn');
  var bookingCards = document.querySelectorAll('.booking-card');

  filterBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      filterBtns.forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');

      var filter = btn.getAttribute('data-filter');
      bookingCards.forEach(function(card) {
        var status = card.getAttribute('data-status');
        if (filter === 'all' || status === filter) {
          card.style.display = 'flex';
          card.style.animation = 'fadeInUp 0.4s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // === Book button interaction (explore) ===
  document.querySelectorAll('.btn-book-explore').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var original = btn.textContent;
      btn.textContent = 'Added!';
      btn.style.background = 'var(--success)';
      setTimeout(function() {
        btn.textContent = original;
        btn.style.background = '';
      }, 1500);
    });
  });

  // === Wishlist remove ===
  document.querySelectorAll('.wishlist-remove').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      var card = btn.closest('.wishlist-card');
      card.style.transition = 'all 0.4s ease';
      card.style.transform = 'scale(0.8)';
      card.style.opacity = '0';
      setTimeout(function() {
        card.remove();
      }, 400);
    });
  });

  // === Wishlist book ===
  document.querySelectorAll('.btn-wishlist-book').forEach(function(btn) {
    btn.addEventListener('click', function() {
      btn.textContent = 'Booking...';
      setTimeout(function() {
        btn.textContent = 'Booked!';
        btn.style.background = 'var(--success)';
      }, 1000);
    });
  });

  // === Conversation switching ===
  var conversations = document.querySelectorAll('.conversation-item');
  conversations.forEach(function(conv) {
    conv.addEventListener('click', function() {
      conversations.forEach(function(c) { c.classList.remove('active'); });
      conv.classList.add('active');
      // Remove unread badge
      var unread = conv.querySelector('.conv-unread');
      if (unread) unread.remove();
    });
  });

  // === Chat send ===
  var chatInput = document.querySelector('.chat-input input');
  var chatSend = document.querySelector('.chat-send');
  var chatBody = document.querySelector('.chat-body');

  function sendMessage() {
    if (!chatInput || !chatBody) return;
    var text = chatInput.value.trim();
    if (!text) return;

    var msg = document.createElement('div');
    msg.className = 'chat-msg sent';
    var now = new Date();
    var time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    msg.innerHTML = '<p>' + text + '</p><span>' + time + '</span>';
    chatBody.appendChild(msg);
    chatInput.value = '';
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  if (chatSend) chatSend.addEventListener('click', sendMessage);
  if (chatInput) {
    chatInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') sendMessage();
    });
  }

  // === Profile save ===
  var saveBtn = document.querySelector('.btn-save-profile');
  if (saveBtn) {
    saveBtn.addEventListener('click', function() {
      var original = saveBtn.textContent;
      saveBtn.innerHTML = '<i class="fas fa-check"></i> Saved!';
      saveBtn.style.background = 'var(--success)';
      setTimeout(function() {
        saveBtn.textContent = original;
        saveBtn.style.background = '';
      }, 2000);
    });
  }

  // === Booking actions ===
  document.querySelectorAll('.btn-view').forEach(function(btn) {
    btn.addEventListener('click', function() {
      btn.textContent = 'Loading...';
      setTimeout(function() {
        btn.textContent = 'View Details';
      }, 1000);
    });
  });

  document.querySelectorAll('.btn-cancel').forEach(function(btn) {
    btn.addEventListener('click', function() {
      if (confirm('Are you sure you want to cancel this booking?')) {
        var card = btn.closest('.booking-card');
        card.style.transition = 'all 0.4s ease';
        card.style.transform = 'scale(0.9)';
        card.style.opacity = '0';
        setTimeout(function() { card.remove(); }, 400);
      }
    });
  });

  document.querySelectorAll('.btn-pay').forEach(function(btn) {
    btn.addEventListener('click', function() {
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
      setTimeout(function() {
        btn.innerHTML = '<i class="fas fa-check"></i> Paid!';
        btn.style.background = 'var(--success)';
        var status = btn.closest('.booking-card').querySelector('.trip-status');
        if (status) {
          status.classList.remove('pending');
          status.classList.add('confirmed');
          status.textContent = 'Confirmed';
        }
      }, 2000);
    });
  });
});

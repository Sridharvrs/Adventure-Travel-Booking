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
   GUIDE DASHBOARD JAVASCRIPT
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {

  // === Tour manage button ===
  document.querySelectorAll('.btn-tour-manage').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var original = btn.textContent;
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
      setTimeout(function() {
        btn.innerHTML = '<i class="fas fa-check"></i> Opened';
        btn.style.background = 'var(--success)';
        setTimeout(function() {
          btn.textContent = original;
          btn.style.background = '';
        }, 1500);
      }, 1000);
    });
  });

  // === Tour roster button ===
  document.querySelectorAll('.btn-tour-roster').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var original = btn.textContent;
      btn.textContent = 'Loading Roster...';
      setTimeout(function() {
        btn.textContent = original;
      }, 1000);
    });
  });

  // === Tour publish button ===
  document.querySelectorAll('.btn-tour-publish').forEach(function(btn) {
    btn.addEventListener('click', function() {
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Publishing...';
      setTimeout(function() {
        btn.innerHTML = '<i class="fas fa-check"></i> Published!';
        btn.style.background = 'var(--success)';
        var badge = btn.closest('.tour-card').querySelector('.tour-status-badge');
        if (badge) {
          badge.classList.remove('draft');
          badge.classList.add('active');
          badge.textContent = 'Active';
        }
      }, 1500);
    });
  });

  // === Traveler action buttons ===
  document.querySelectorAll('.btn-traveler-action').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var icon = btn.querySelector('i');
      if (icon.classList.contains('fa-message')) {
        // Simulate opening a chat
        btn.style.background = 'var(--secondary)';
        btn.style.color = 'var(--white)';
        setTimeout(function() {
          btn.style.background = '';
          btn.style.color = '';
        }, 1500);
      }
    });
  });

  // === Profile save ===
  var saveBtn = document.querySelector('.btn-save-profile');
  if (saveBtn) {
    saveBtn.addEventListener('click', function() {
      var original = saveBtn.textContent;
      saveBtn.innerHTML = '<i class="fas fa-check"></i> Profile Updated!';
      saveBtn.style.background = 'var(--success)';
      setTimeout(function() {
        saveBtn.textContent = original;
        saveBtn.style.background = '';
      }, 2000);
    });
  }

  // === Calendar day click ===
  document.querySelectorAll('.cal-day:not(.dim)').forEach(function(day) {
    day.addEventListener('click', function() {
      document.querySelectorAll('.cal-day').forEach(function(d) {
        d.style.borderColor = '';
      });
      if (!day.classList.contains('today')) {
        day.style.borderColor = 'var(--accent)';
        day.style.background = 'rgba(0,184,148,0.1)';
      }
    });
  });

  // === Calendar navigation ===
  var calNavBtns = document.querySelectorAll('.cal-nav-btn');
  calNavBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      var calHeader = document.querySelector('.calendar-header h3');
      if (calHeader) {
        btn.querySelector('i').style.transform = 'rotate(360deg)';
        setTimeout(function() {
          btn.querySelector('i').style.transform = '';
        }, 300);
      }
    });
  });

  // === Bar chart hover enhancement ===
  document.querySelectorAll('.bar').forEach(function(bar) {
    bar.addEventListener('mouseenter', function() {
      bar.style.filter = 'brightness(1.15)';
    });
    bar.addEventListener('mouseleave', function() {
      bar.style.filter = '';
    });
  });
});

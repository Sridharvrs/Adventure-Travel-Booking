
/* ==========================================================================
   login.js — Stackly Login
   Role selection, validation, session storage, login feedback & redirects
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {

  "use strict";


  /* =========================================
     ELEMENTS
  ========================================= */

  const loginForm = document.getElementById("loginForm");
  const roleCards = document.querySelectorAll(".role-card");

  if (!loginForm) return;

  const email = loginForm.querySelector('input[type="email"]');
  const password = loginForm.querySelector('input[type="password"]');

  const rememberDevice = loginForm.querySelector(
    'input[type="checkbox"]'
  );

  const passToggle = document.getElementById("togglePassword");
//   const forgotLink = document.querySelector(".forgot-link");

  const submitBtn = document.getElementById("loginSubmitBtn");


  /* =========================================
     CREATE STATUS MESSAGE
  ========================================= */

  let loginStatus = document.getElementById("loginStatus");

  if (!loginStatus) {

    loginStatus = document.createElement("div");

    loginStatus.id = "loginStatus";

    loginStatus.setAttribute("aria-live", "polite");

    loginStatus.style.marginTop = "14px";

    loginStatus.style.fontSize = "14px";

    loginStatus.style.fontWeight = "500";

    loginForm.appendChild(loginStatus);
  }


  /* =========================================
     PASSWORD SHOW / HIDE
  ========================================= */

  if (passToggle && password) {

    passToggle.addEventListener("click", () => {

      if (password.type === "password") {

        password.type = "text";

        passToggle.classList.remove("fa-eye");

        passToggle.classList.add("fa-eye-slash");

        passToggle.setAttribute(
          "aria-label",
          "Hide password"
        );

      } else {

        password.type = "password";

        passToggle.classList.remove("fa-eye-slash");

        passToggle.classList.add("fa-eye");

        passToggle.setAttribute(
          "aria-label",
          "Show password"
        );

      }

    });

  }


  /* =========================================
     EMAIL VALIDATION
  ========================================= */

  function validateEmail(value) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  }


  /* =========================================
     PASSWORD VALIDATION

     Minimum:
     8 characters
     1 uppercase
     1 lowercase
     1 number
     1 special character
  ========================================= */

  function validatePassword(value) {

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#()_+\-=])[A-Za-z\d@$!%*?&^#()_+\-=]{8,}$/;

    return passwordRegex.test(value);

  }


  /* =========================================
     SHOW FIELD ERROR
  ========================================= */

  function showFieldError(field) {

    if (!field) return;

    const wrapper = field.closest(".form-group");

    if (wrapper) {

      wrapper.classList.add("invalid");

    }

  }


  /* =========================================
     REMOVE FIELD ERROR
  ========================================= */

  function clearFieldError(field) {

    if (!field) return;

    const wrapper = field.closest(".form-group");

    if (wrapper) {

      wrapper.classList.remove("invalid");

    }

  }


  /* =========================================
     CLEAR STATUS MESSAGE
  ========================================= */

  function clearStatus() {

    if (!loginStatus) return;

    loginStatus.textContent = "";

    loginStatus.removeAttribute("style");

    loginStatus.style.marginTop = "14px";

    loginStatus.style.fontSize = "14px";

    loginStatus.style.fontWeight = "500";

  }


  /* =========================================
     CLEAR ERRORS WHEN USER TYPES
  ========================================= */

  if (email) {

    email.addEventListener("input", () => {

      clearFieldError(email);

      clearStatus();

    });

  }


  if (password) {

    password.addEventListener("input", () => {

      clearFieldError(password);

      clearStatus();

    });

  }


  /* =========================================
     ROLE SELECTOR
  ========================================= */

  let selectedRole = "traveler";


  roleCards.forEach((card) => {

    card.addEventListener("click", () => {


      /* Remove active state */

      roleCards.forEach((item) => {

        item.classList.remove("active");

      });


      /* Add active state */

      card.classList.add("active");


      /* Get selected role */

      selectedRole =
        card.dataset.role || "traveler";


      /* Update submit button */

      if (submitBtn) {

        submitBtn.innerHTML = `
          Sign In as ${selectedRole === "traveler" ? "Traveler" : "Guide"}
          <i class="fas fa-arrow-right"></i>
        `;

      }


      /* Clear previous status */

      clearStatus();

    });

  });


  /* =========================================
     FORGOT PASSWORD
  ========================================= */

  if (forgotLink) {

    forgotLink.addEventListener("click", (e) => {

      e.preventDefault();

      clearStatus();

      loginStatus.style.color = "var(--primary-color, #2f6f6a)";

      loginStatus.textContent =
        "Password reset instructions will be available soon.";

    });

  }


  /* =========================================
     LOGIN FORM SUBMIT
  ========================================= */

  loginForm.addEventListener("submit", (e) => {

    e.preventDefault();


    /* Clear previous errors */

    clearFieldError(email);

    clearFieldError(password);

    clearStatus();


    /* Get values */

    const emailValue = email
      ? email.value.trim()
      : "";

    const passwordValue = password
      ? password.value
      : "";


    let valid = true;


    /* =====================================
       EMAIL VALIDATION
    ===================================== */

    if (
      !emailValue ||
      !validateEmail(emailValue)
    ) {

      showFieldError(email);

      valid = false;

    }


    /* =====================================
       PASSWORD EMPTY
    ===================================== */

    if (passwordValue === "") {

      showFieldError(password);

      valid = false;

    }


    /* =====================================
       PASSWORD FORMAT
    ===================================== */

    else if (!validatePassword(passwordValue)) {

      showFieldError(password);

      valid = false;

    }


    /* =====================================
       STOP IF INVALID
    ===================================== */

    if (!valid) {

      loginStatus.style.color = "#c94b43";

      loginStatus.textContent =
        "Please enter a valid email and password.";

      return;

    }


    /* =====================================
       SUBMIT BUTTON
    ===================================== */

    if (!submitBtn) return;


    const originalHTML =
      submitBtn.innerHTML;


    /* Loading state */

    submitBtn.disabled = true;

    submitBtn.classList.add("loading");

    submitBtn.innerHTML = `
      <span>Signing in...</span>
      <i class="fas fa-spinner fa-spin"></i>
    `;


    /* =====================================
       LOGIN PROCESS
    ===================================== */

    setTimeout(() => {


      /* =====================================
         CREATE CURRENT USER
      ===================================== */

      const currentUser = {

        name: emailValue.split("@")[0],

        email: emailValue,

        role:
          selectedRole === "traveler"
            ? "Traveler"
            : "Guide"

      };


      /* =====================================
         REMEMBER DEVICE
         Demo only — stores a flag locally
      ===================================== */

      if (rememberDevice) {

        if (rememberDevice.checked) {

          localStorage.setItem(
            "StacklyRememberDevice",
            "true"
          );

        } else {

          localStorage.removeItem(
            "StacklyRememberDevice"
          );

        }

      }


      /* =====================================
         SAVE SESSION
      ===================================== */

      sessionStorage.setItem(
        "StacklyCurrentUser",
        JSON.stringify(currentUser)
      );


      /* =====================================
         SUCCESS MESSAGE
      ===================================== */

      loginStatus.style.color = "#2f7d5b";

      loginStatus.textContent =
        `Welcome back. Signed in as ${currentUser.role}.`;


      /* =====================================
         RESET BUTTON
      ===================================== */

      submitBtn.classList.remove("loading");

      submitBtn.innerHTML = originalHTML;

      submitBtn.disabled = false;


      /* =====================================
         REDIRECT
      ===================================== */

      setTimeout(() => {

        if (selectedRole === "traveler") {

          window.location.href =
            "traveler-dashboard.html";

        } else {

          window.location.href =
            "guide-dashboard.html";

        }

      }, 1000);


    }, 1200);

  });


  /* =========================================
     RESET LOGIN PAGE ON BACK / FORWARD
  ========================================= */

  window.addEventListener("pageshow", () => {


    /* Reset form */

    loginForm.reset();


    /* Reset email */

    if (email) {

      email.value = "";

    }


    /* Reset password */

    if (password) {

      password.value = "";

      password.type = "password";

    }


    /* Reset password toggle */

    if (passToggle) {

      passToggle.classList.remove("fa-eye-slash");

      passToggle.classList.add("fa-eye");

      passToggle.setAttribute(
        "aria-label",
        "Show password"
      );

    }


    /* Clear status */

    clearStatus();


    /* Reset role cards */

    roleCards.forEach((card, index) => {

      const isFirst = index === 0;

      card.classList.toggle(
        "active",
        isFirst
      );

    });


    /* Default role */

    selectedRole = "traveler";


    /* Reset button label */

    if (submitBtn) {

      submitBtn.innerHTML = `
        Sign In as Traveler
        <i class="fas fa-arrow-right"></i>
      `;

      submitBtn.disabled = false;

      submitBtn.classList.remove("loading");

    }

  });

});
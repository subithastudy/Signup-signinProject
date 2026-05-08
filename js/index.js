// Hiding Hamburger pop up once selecting an option
document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
    link.addEventListener('click', () => {
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse.classList.contains('show')) {
            bootstrap.Collapse.getInstance(navbarCollapse).hide();
        }
    });
});

// Sign In form validation
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('signinForm');
    const emailInput = document.getElementById('loginEmail');
    const passInput = document.getElementById('loginPassword');
    const emailFeedback = document.getElementById('emailFeedback');
    const passLengthHint = document.getElementById('passLengthHint');
    const passFormatFeedback = document.getElementById('passFormatFeedback');
    const loginError = document.getElementById('loginError');

    // Default Credentials
    const DEFAULT_EMAIL = "admin@xplore.com";
    const DEFAULT_PASS = "Admin@123";

    // Password Toggle
    document.querySelector('.password-toggle').addEventListener('click', function () {
        const type = passInput.type === 'password' ? 'text' : 'password';
        passInput.type = type;
        this.querySelector('i').classList.toggle('fa-eye');
        this.querySelector('i').classList.toggle('fa-eye-slash');
    });

    // Password Validation
    passInput.addEventListener('input', () => {
        const val = passInput.value;

        // Show length hint while typing, disappear once 8 characters reached
        if (val.length > 0 && val.length < 8) {
            passLengthHint.style.display = 'block';
        } else {
            passLengthHint.style.display = 'none';
        }

        // Format Validation after 8 chars
        if (val.length >= 8) {
            const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%\^&+=!]).{8,255}$/;
            if (!regex.test(val)) {
                passFormatFeedback.textContent = "The entered password is weak: include a special character, number, uppercase, and lowercase letter.";
            } else {
                passFormatFeedback.textContent = "";
            }
        } else {
            passFormatFeedback.textContent = "";
        }
    });

    // Form Submission and Validation
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        // Reset display
        emailFeedback.textContent = "";
        loginError.style.display = 'none';

        // Email validation
        const emailVal = emailInput.value.trim();
        if (!emailVal) {
            emailFeedback.textContent = "Email field is empty";
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
            emailFeedback.textContent = "Not a valid email";
            isValid = false;
        }

        // Password Format Check on Submit
        const passVal = passInput.value;
        const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%\^&+=!]).{8,255}$/;
        if (!passRegex.test(passVal)) {
            isValid = false;
        }

        if (!isValid) return;

        // Default Credentials Authentication
        if (emailVal === DEFAULT_EMAIL && passVal === DEFAULT_PASS) {
            window.location.href = 'index.html';
        } else {
            loginError.textContent = "Invalid email or password";
            loginError.style.display = 'block';
        }
    });

    // Close button redirect
    document.getElementById('closeBtn').addEventListener('click', () => {
        window.location.href = 'index.html';
    });
});
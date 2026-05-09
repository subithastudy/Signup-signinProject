// Hiding Hamburger pop up once selecting an option
document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
    link.addEventListener('click', () => {
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse.classList.contains('show')) {
            bootstrap.Collapse.getInstance(navbarCollapse).hide();
        }
    });
});

// Show or hide using toggle button
const toggles = document.querySelectorAll(".toggle-password");
toggles.forEach(toggle => {
    toggle.addEventListener("click", () => {
        const input = toggle.previousElementSibling;
        if (input.type === "password") {
            input.type = "text";
        } else {
            input.type = "password";
        }
    });
});

// Sign Up validation
const signupForm = document.getElementById("signupForm");
if (signupForm) {
    signupForm.addEventListener("submit", function (e) {
        e.preventDefault();
        let isValid = true;

        // Fetching data using IDs
        const fullName = document.getElementById("fullName");
        const email = document.getElementById("signupEmail");
        const phone = document.getElementById("phone");
        const city = document.getElementById("city");
        const password = document.getElementById("signupPassword");
        const confirmPassword = document.getElementById("confirmPassword");

        // Regexes for validation
        const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
        const phonePattern = /^[0-9]{10}$/;
        const cityPattern = /^[A-Za-z ]+$/;
        // const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!])[A-Za-z\d@#$%^&+=!]{8,}$/;

        function setError(input, message) {
            input.classList.add("fail");
            input.classList.remove("success");

            // Select error element correctly
            const errorElement = input.parentElement.querySelector(".error");
            errorElement.innerText = message;

            isValid = false;
        }

        function setSuccess(input) {
            input.classList.add("success");
            input.classList.remove("fail");

            // Clear error message
            const errorElement = input.parentElement.querySelector(".error");
            errorElement.innerText = "";
        }

        // Regex for full name validation
        const namePattern = /^[A-Za-z ]+$/;

        // Full name validation
        if (fullName.value.trim() === "") {
            setError(fullName, "Full Name is required");
        }
        else if (!namePattern.test(fullName.value)) {
            setError(fullName, "Only alphabets allowed");
        }
        else {
            setSuccess(fullName);
        }

        // Email validation
        if (!emailPattern.test(email.value)) {
            setError(email, "Enter valid email");
        } else {
            setSuccess(email);
        }

        // Phone number validation
        if (!phonePattern.test(phone.value)) {
            setError(phone, "Phone must be 10 digits");
        } else {
            setSuccess(phone);
        }

        // Location or city validation
        if (!cityPattern.test(city.value)) {
            setError(city, "Only alphabets allowed");
        } else {
            setSuccess(city);
        }

        // Password validation
        if (!passwordPattern.test(password.value)) {
            setError(
                password,
                "Password must contain at least 8 characters, atleast one uppercase letter, one lowercase letter, one number and one special character"
            );
        } else {
            setSuccess(password);
        }

        // Confirm Password validation
        if (confirmPassword.value !== password.value || confirmPassword.value === "") {
            setError(confirmPassword, "Passwords do not match");
        } else {
            setSuccess(confirmPassword);
        }

        // Storing data
        if (isValid) {
            const userData = {
                email: email.value,
                password: password.value
            };
            localStorage.setItem("user", JSON.stringify(userData));
            alert("Account created successfully!");
            window.location.href = "signin.html";
        }
    });

}

// Sign In validation
const signinForm = document.getElementById("signinForm");
if (signinForm) {
    signinForm.addEventListener("submit", function (e) {
        e.preventDefault();
        let isValid = true;

        // Fetching data using IDs
        const email = document.getElementById("signinEmail");
        const password = document.getElementById("signinPassword");

        // Regex for validation Email
        const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
        const namePattern = /^[A-Za-z ]+$/;

        // Validation function
        function setError(input, message) {
            input.classList.add("fail");
            input.classList.remove("success");
            input.nextElementSibling.innerText = message;
            isValid = false;
        }

        function setSuccess(input) {
            input.classList.add("success");
            input.classList.remove("fail");
            input.nextElementSibling.innerText = "";
        }

        // Email validation
        if (!emailPattern.test(email.value)) {
            setError(email, "Enter valid email");
        } else {
            setSuccess(email);
        }

        // Password validation
        if (password.value.trim() === "") {
            setError(password, "Password required");
        } else {
            setSuccess(password);
        }

        // Sign In verification
        if (isValid) {
            const storedUser = JSON.parse(localStorage.getItem("user"));
            if (
                storedUser &&
                storedUser.email === email.value &&
                storedUser.password === password.value
            ) {
                alert("Login Successful!");
                window.location.href = "travelapp.html";
            } else {
                alert("Invalid Email or Password");
            }
        }
    });
}

// Close button functionality
const closeButtons = document.querySelectorAll(".close-btn");
closeButtons.forEach(button => {
    button.addEventListener("click", () => {
        window.location.href = "index.html";
    });
});
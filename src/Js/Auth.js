document.addEventListener("DOMContentLoaded", () => {
    const loginTabBtn = document.getElementById("loginTabBtn");
    const signupTabBtn = document.getElementById("signupTabBtn");

    const loginForm = document.getElementById("loginForm");
    const signupForm = document.getElementById("signupForm");

    const loginEmail = document.getElementById("loginEmail");
    const loginPassword = document.getElementById("loginPassword");

    const signupName = document.getElementById("signupName");
    const signupEmail = document.getElementById("signupEmail");
    const signupPassword = document.getElementById("signupPassword");
    const signupConfirmPassword = document.getElementById("signupConfirmPassword");

    const authMessage = document.getElementById("authMessage");
    const backBtn = document.getElementById("backBtn");

    const themeToggleBtn = document.getElementById("themeToggleBtn");
    const themeIcon = document.getElementById("themeIcon");
    const themeText = document.getElementById("themeText");

    const THEME_KEY = "qm_theme";
    const USERS_KEY = "qm_users";

    function initializeTheme() {
        const savedTheme = localStorage.getItem(THEME_KEY) || "light";
        applyTheme(savedTheme);
    }

    function bindThemeToggle() {
        if (!themeToggleBtn) return;

        themeToggleBtn.addEventListener("click", () => {
            const newTheme = document.body.classList.contains("dark-theme") ? "light" : "dark";
            localStorage.setItem(THEME_KEY, newTheme);
            applyTheme(newTheme);
        });
    }

    function applyTheme(theme) {
        if (theme === "dark") {
            document.body.classList.add("dark-theme");
            if (themeIcon) themeIcon.textContent = "☀️";
            if (themeText) themeText.textContent = "Light";
        } else {
            document.body.classList.remove("dark-theme");
            if (themeIcon) themeIcon.textContent = "🌙";
            if (themeText) themeText.textContent = "Dark";
        }
    }

    function showLoginForm() {
        loginTabBtn.classList.add("active");
        signupTabBtn.classList.remove("active");

        loginForm.classList.remove("hidden");
        signupForm.classList.add("hidden");

        clearMessage();
    }

    function showSignupForm() {
        signupTabBtn.classList.add("active");
        loginTabBtn.classList.remove("active");

        signupForm.classList.remove("hidden");
        loginForm.classList.add("hidden");

        clearMessage();
    }

    function getUsers() {
        return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
    }

    function saveUsers(users) {
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
    }

    function setMessage(text, type) {
        authMessage.textContent = text;
        authMessage.className = `auth-message ${type}`;
    }

    function clearMessage() {
        authMessage.textContent = "";
        authMessage.className = "auth-message";
    }

    function generateToken() {
        return `token_${Date.now()}`;
    }

    function mergeGuestHistoryIntoUser(email) {
        const guestKey = "qm_history_guest";
        const userKey = `qm_history_${email}`;

        const guestHistory = JSON.parse(localStorage.getItem(guestKey)) || [];
        const userHistory = JSON.parse(localStorage.getItem(userKey)) || [];

        if (guestHistory.length > 0) {
            const mergedHistory = [...guestHistory, ...userHistory];
            localStorage.setItem(userKey, JSON.stringify(mergedHistory));
            localStorage.removeItem(guestKey);
        }
    }

    function redirectAfterAuth() {
        const redirectTarget = localStorage.getItem("redirectAfterAuth") || "dashboard";
        localStorage.removeItem("redirectAfterAuth");

        if (redirectTarget === "history") {
            window.location.href = "./History.html";
        } else {
            window.location.href = "../../index.html";
        }
    }

    if (loginTabBtn) {
        loginTabBtn.addEventListener("click", showLoginForm);
    }

    if (signupTabBtn) {
        signupTabBtn.addEventListener("click", showSignupForm);
    }

    if (loginForm) {
        loginForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const email = loginEmail.value.trim();
            const password = loginPassword.value.trim();

            if (!email || !password) {
                setMessage("Please enter email and password.", "error");
                return;
            }

            const users = getUsers();
            const existingUser = users.find((user) => user.email === email && user.password === password);

            if (!existingUser) {
                setMessage("Invalid email or password.", "error");
                return;
            }

            localStorage.setItem("token", generateToken());
            localStorage.setItem("email", existingUser.email);
            localStorage.setItem("fullName", existingUser.fullName);

            mergeGuestHistoryIntoUser(existingUser.email);

            setMessage("Login successful.", "success");

            setTimeout(() => {
                redirectAfterAuth();
            }, 700);
        });
    }

    if (signupForm) {
        signupForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const fullName = signupName.value.trim();
            const email = signupEmail.value.trim();
            const password = signupPassword.value.trim();
            const confirmPassword = signupConfirmPassword.value.trim();

            if (!fullName || !email || !password || !confirmPassword) {
                setMessage("Please fill all fields.", "error");
                return;
            }

            if (password !== confirmPassword) {
                setMessage("Passwords do not match.", "error");
                return;
            }

            const users = getUsers();
            const userExists = users.some((user) => user.email === email);

            if (userExists) {
                setMessage("User already exists. Please login.", "error");
                return;
            }

            users.push({
                fullName,
                email,
                password
            });

            saveUsers(users);

            localStorage.setItem("token", generateToken());
            localStorage.setItem("email", email);
            localStorage.setItem("fullName", fullName);

            mergeGuestHistoryIntoUser(email);

            setMessage("Signup successful.", "success");

            setTimeout(() => {
                redirectAfterAuth();
            }, 700);
        });
    }

    if (backBtn) {
        backBtn.addEventListener("click", () => {
            window.location.href = "../../index.html";
        });
    }

    initializeTheme();
    bindThemeToggle();
    showLoginForm();
});
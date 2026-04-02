import { signupUser, loginUser } from "./Api.js";
import { validateLogin, validateSignup } from "./Validators.js";
import {
    saveCurrentUser,
    mergeGuestHistoryToUser,
    getTheme,
    clearCurrentUser
} from "./Storage.js";

const loginTabBtn = document.getElementById("loginTabBtn");
const signupTabBtn = document.getElementById("signupTabBtn");
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");
const authMessage = document.getElementById("authMessage");
const backToDashboardBtn = document.getElementById("backToDashboardBtn");

function applyTheme() {
    const savedTheme = getTheme();

    if (savedTheme === "dark") {
        document.body.classList.add("dark-theme");
    } else {
        document.body.classList.remove("dark-theme");
    }
}

function clearErrors() {
    const errorElements = document.querySelectorAll(".error-text");
    errorElements.forEach((element) => {
        element.textContent = "";
    });
}

function showMessage(message, type) {
    authMessage.textContent = message;
    authMessage.className = `message-box ${type}`;
}

function hideMessage() {
    authMessage.textContent = "";
    authMessage.className = "message-box";
}

function switchTab(tabName) {
    clearErrors();
    hideMessage();

    if (tabName === "login") {
        loginTabBtn.classList.add("active");
        signupTabBtn.classList.remove("active");
        loginForm.classList.add("active");
        signupForm.classList.remove("active");
    } else {
        signupTabBtn.classList.add("active");
        loginTabBtn.classList.remove("active");
        signupForm.classList.add("active");
        loginForm.classList.remove("active");
    }
}

function setError(id, message) {
    const element = document.getElementById(id);
    if (element) {
        element.textContent = message;
    }
}

function setupPasswordToggle() {
    const buttons = document.querySelectorAll(".toggle-password-btn");

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            const inputId = button.dataset.target;
            const input = document.getElementById(inputId);

            if (input.type === "password") {
                input.type = "text";
                button.textContent = "Hide";
            } else {
                input.type = "password";
                button.textContent = "Show";
            }
        });
    });
}

function setupLogin() {
    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        clearErrors();
        hideMessage();

        const formData = {
            email: document.getElementById("loginEmail").value.trim(),
            password: document.getElementById("loginPassword").value.trim()
        };

        const errors = validateLogin(formData);

        if (errors.email) setError("loginEmailError", errors.email);
        if (errors.password) setError("loginPasswordError", errors.password);

        if (Object.keys(errors).length > 0) {
            return;
        }

        const response = await loginUser(formData);

        if (!response.success) {
            showMessage(response.message, "error");
            return;
        }

        saveCurrentUser(response.data);
        mergeGuestHistoryToUser(response.data.email);

        showMessage("Login successful. Redirecting to history...", "success");

        setTimeout(() => {
            window.location.href = "./History.html";
        }, 900);
    });
}

function setupSignup() {
    signupForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        clearErrors();
        hideMessage();

        const formData = {
            name: document.getElementById("signupName").value.trim(),
            email: document.getElementById("signupEmail").value.trim(),
            password: document.getElementById("signupPassword").value.trim(),
            confirmPassword: document.getElementById("signupConfirmPassword").value.trim()
        };

        const errors = validateSignup(formData);

        if (errors.name) setError("signupNameError", errors.name);
        if (errors.email) setError("signupEmailError", errors.email);
        if (errors.password) setError("signupPasswordError", errors.password);
        if (errors.confirmPassword) {
            setError("signupConfirmPasswordError", errors.confirmPassword);
        }

        if (Object.keys(errors).length > 0) {
            return;
        }

        const response = await signupUser(formData);

        if (!response.success) {
            showMessage(response.message, "error");
            return;
        }

        showMessage(response.message || "Signup successful. Please login now.", "success");
        signupForm.reset();

        setTimeout(() => {
            switchTab("login");
        }, 1000);
    });
}

function setupEvents() {
    loginTabBtn.addEventListener("click", () => switchTab("login"));
    signupTabBtn.addEventListener("click", () => switchTab("signup"));

    backToDashboardBtn.addEventListener("click", () => {
        window.location.href = "../../index.html";
    });
}

document.addEventListener("DOMContentLoaded", () => {
    clearCurrentUser();
    applyTheme();
    setupEvents();
    setupPasswordToggle();
    setupLogin();
    setupSignup();
});
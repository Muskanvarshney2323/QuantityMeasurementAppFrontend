export function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

export function validateLogin(data) {
    const errors = {};

    if (!data.email.trim()) {
        errors.email = "Email is required";
    } else if (!validateEmail(data.email)) {
        errors.email = "Enter a valid email";
    }

    if (!data.password.trim()) {
        errors.password = "Password is required";
    }

    return errors;
}

export function validateSignup(data) {
    const errors = {};

    if (!data.name.trim()) {
        errors.name = "Full name is required";
    }

    if (!data.email.trim()) {
        errors.email = "Email is required";
    } else if (!validateEmail(data.email)) {
        errors.email = "Enter a valid email";
    }

    if (!data.password.trim()) {
        errors.password = "Password is required";
    } else if (data.password.length < 6) {
        errors.password = "Password must be at least 6 characters";
    }

    if (!data.confirmPassword.trim()) {
        errors.confirmPassword = "Confirm password is required";
    } else if (data.password !== data.confirmPassword) {
        errors.confirmPassword = "Passwords do not match";
    }

    return errors;
}
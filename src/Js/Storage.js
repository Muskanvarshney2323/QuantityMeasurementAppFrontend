const USERS_KEY = "qm_users";
const CURRENT_USER_KEY = "qm_current_user";
const THEME_KEY = "qm_theme";
const GUEST_HISTORY_KEY = "qm_guest_history";

export function getUsers() {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
}

export function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function getCurrentUser() {
    return JSON.parse(localStorage.getItem(CURRENT_USER_KEY));
}

export function saveCurrentUser(user) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
}

export function clearCurrentUser() {
    localStorage.removeItem(CURRENT_USER_KEY);
}

export function getToken() {
    const currentUser = getCurrentUser();
    return currentUser?.token || "";
}

export function getTheme() {
    return localStorage.getItem(THEME_KEY) || "light";
}

export function saveTheme(theme) {
    localStorage.setItem(THEME_KEY, theme);
}

export function getGuestHistory() {
    return JSON.parse(localStorage.getItem(GUEST_HISTORY_KEY)) || [];
}

export function saveGuestHistory(history) {
    localStorage.setItem(GUEST_HISTORY_KEY, JSON.stringify(history));
}

export function clearGuestHistory() {
    localStorage.removeItem(GUEST_HISTORY_KEY);
}

export function getUserHistoryKey(email) {
    return `qm_user_history_${email}`;
}

export function getUserHistory(email) {
    const key = getUserHistoryKey(email);
    return JSON.parse(localStorage.getItem(key)) || [];
}

export function saveUserHistory(email, history) {
    const key = getUserHistoryKey(email);
    localStorage.setItem(key, JSON.stringify(history));
}

export function addResultToHistory(historyItem) {
    const currentUser = getCurrentUser();

    if (currentUser && currentUser.email) {
        const userHistory = getUserHistory(currentUser.email);
        userHistory.unshift(historyItem);
        saveUserHistory(currentUser.email, userHistory);
        return;
    }

    const guestHistory = getGuestHistory();
    guestHistory.unshift(historyItem);
    saveGuestHistory(guestHistory);
}

export function mergeGuestHistoryToUser(email) {
    const guestHistory = getGuestHistory();
    const userHistory = getUserHistory(email);
    const mergedHistory = [...guestHistory, ...userHistory];
    saveUserHistory(email, mergedHistory);
    clearGuestHistory();
}

export function clearUserHistory(email) {
    const key = getUserHistoryKey(email);
    localStorage.removeItem(key);
}
document.addEventListener("DOMContentLoaded", () => {
    const historyList = document.getElementById("historyList");
    const clearHistoryBtn = document.getElementById("clearHistoryBtn");
    const backBtn = document.getElementById("backBtn");
    const historyTitle = document.getElementById("historyTitle");
    const historySubtitle = document.getElementById("historySubtitle");

    const themeToggleBtn = document.getElementById("themeToggleBtn");
    const themeIcon = document.getElementById("themeIcon");
    const themeText = document.getElementById("themeText");

    const THEME_KEY = "qm_theme";

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

    function getUserHistoryKey() {
        const email = localStorage.getItem("email");
        return `qm_history_${email}`;
    }

    function renderHistory() {
        const token = localStorage.getItem("token");
        const email = localStorage.getItem("email");
        const fullName = localStorage.getItem("fullName");

        if (!token || !email) {
            localStorage.setItem("redirectAfterAuth", "history");
            window.location.href = "./Auth.html";
            return;
        }

        const historyData = JSON.parse(localStorage.getItem(getUserHistoryKey())) || [];

        if (historyTitle) {
            historyTitle.textContent = `${fullName || "User"}'s History`;
        }

        if (historySubtitle) {
            historySubtitle.textContent = "Your saved measurement results are shown below.";
        }

        if (historyData.length === 0) {
            historyList.innerHTML = `
                <div class="empty-history">
                    <i class="fas fa-clock-rotate-left"></i>
                    <h3>No saved history found</h3>
                    <p>Save a result from the dashboard to view it here.</p>
                </div>
            `;
            return;
        }

        historyList.innerHTML = historyData
            .map((item) => {
                return `
                    <div class="history-card">
                        <div class="history-card-top">
                            <span class="history-badge">${item.type}</span>
                            <span class="history-date">${item.savedAt || item.date || ""}</span>
                        </div>

                        <h3>${item.action}</h3>
                        <div class="history-value">${item.value}</div>
                        <p class="history-meta">${item.meta}</p>
                    </div>
                `;
            })
            .join("");
    }

    function clearHistory() {
        localStorage.removeItem(getUserHistoryKey());
        renderHistory();
    }

    if (clearHistoryBtn) {
        clearHistoryBtn.addEventListener("click", clearHistory);
    }

    if (backBtn) {
        backBtn.addEventListener("click", () => {
            window.location.href = "../../index.html";
        });
    }

    initializeTheme();
    bindThemeToggle();
    renderHistory();
});
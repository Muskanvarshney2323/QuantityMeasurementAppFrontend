document.addEventListener("DOMContentLoaded", () => {
    const THEME_KEY = "qm_theme";

    const getStartedBtn = document.getElementById("getStartedBtn");
    const learnMoreBtn = document.getElementById("learnMoreBtn");
    const dashboardSection = document.getElementById("dashboardSection");
    const loginBtn = document.getElementById("loginBtn");
    const guestLoginBtn = document.getElementById("guestLoginBtn");
    const historyBtn = document.getElementById("historyBtn");
    const saveResultBtn = document.getElementById("saveResultBtn");
    const calculateBtn = document.getElementById("calculateBtn");

    const themeToggleBtn = document.getElementById("themeToggleBtn");
    const themeIcon = document.getElementById("themeIcon");
    const themeText = document.getElementById("themeText");

    const typeCards = document.querySelectorAll(".type-card");
    const actionTabs = document.querySelectorAll(".action-tab");

    const value1Input = document.getElementById("value1");
    const value2Input = document.getElementById("value2");
    const unit1Select = document.getElementById("unit1");
    const unit2Select = document.getElementById("unit2");
    const targetUnitSelect = document.getElementById("targetUnit");
    const targetRow = document.getElementById("targetRow");

    const labelOne = document.getElementById("labelOne");
    const labelTwo = document.getElementById("labelTwo");
    const operationIcon = document.getElementById("operationIcon");

    const resultStatus = document.getElementById("resultStatus");
    const resultValue = document.getElementById("resultValue");
    const resultMeta = document.getElementById("resultMeta");

    const selectedTypePreview = document.getElementById("selectedTypePreview");
    const selectedActionPreview = document.getElementById("selectedActionPreview");
    const userStatus = document.getElementById("userStatus");

    let selectedType = "Length";
    let selectedAction = "Compare";
    let currentResult = null;

    const units = {
        Length: ["Millimeter", "Centimeter", "Meter", "Kilometer", "Inch", "Feet"],
        Weight: ["Gram", "Kilogram", "Pound"],
        Temperature: ["Celsius", "Fahrenheit", "Kelvin"],
        Volume: ["Milliliter", "Liter", "Gallon"]
    };

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

    function getAllowedActions(type) {
        if (type === "Temperature") {
            return ["Compare", "Convert"];
        }

        return ["Compare", "Convert", "Add", "Subtract", "Divide"];
    }

    function updateActionAvailability() {
        const allowedActions = getAllowedActions(selectedType);

        actionTabs.forEach((tab) => {
            const action = tab.dataset.action;

            if (allowedActions.includes(action)) {
                tab.disabled = false;
                tab.classList.remove("disabled-tab");
            } else {
                tab.disabled = true;
                tab.classList.add("disabled-tab");
            }
        });

        if (!allowedActions.includes(selectedAction)) {
            selectedAction = "Compare";

            actionTabs.forEach((tab) => {
                tab.classList.remove("active");

                if (tab.dataset.action === "Compare") {
                    tab.classList.add("active");
                }
            });
        }
    }

    function updateUnits() {
        const currentUnits = units[selectedType] || [];

        unit1Select.innerHTML = "";
        unit2Select.innerHTML = "";
        targetUnitSelect.innerHTML = "";

        currentUnits.forEach((unit) => {
            unit1Select.innerHTML += `<option value="${unit}">${unit}</option>`;
            unit2Select.innerHTML += `<option value="${unit}">${unit}</option>`;
            targetUnitSelect.innerHTML += `<option value="${unit}">${unit}</option>`;
        });
    }

    function updateUI() {
        if (selectedTypePreview) {
            selectedTypePreview.textContent = selectedType;
        }

        if (selectedActionPreview) {
            selectedActionPreview.textContent = selectedAction;
        }

        if (selectedAction === "Convert") {
            labelOne.textContent = "Enter Value";
            labelTwo.textContent = "Reference Unit";
            operationIcon.textContent = "→";

            targetRow.classList.remove("hidden");
            value2Input.disabled = true;
            value2Input.value = "";
            value2Input.placeholder = "Not required";
            unit2Select.disabled = true;
        } else {
            labelOne.textContent = "Value 1";
            labelTwo.textContent = "Value 2";
            targetRow.classList.add("hidden");

            value2Input.disabled = false;
            value2Input.placeholder = "Enter second value";
            unit2Select.disabled = false;

            if (selectedAction === "Compare") operationIcon.textContent = "=";
            if (selectedAction === "Add") operationIcon.textContent = "+";
            if (selectedAction === "Subtract") operationIcon.textContent = "−";
            if (selectedAction === "Divide") operationIcon.textContent = "÷";
        }
    }

    function convertToBase(value, unit, type) {
        if (type === "Length") {
            const map = {
                Millimeter: value / 1000,
                Centimeter: value / 100,
                Meter: value,
                Kilometer: value * 1000,
                Inch: value * 0.0254,
                Feet: value * 0.3048
            };
            return map[unit];
        }

        if (type === "Weight") {
            const map = {
                Gram: value / 1000,
                Kilogram: value,
                Pound: value * 0.453592
            };
            return map[unit];
        }

        if (type === "Volume") {
            const map = {
                Milliliter: value / 1000,
                Liter: value,
                Gallon: value * 3.78541
            };
            return map[unit];
        }

        return value;
    }

    function convertFromBase(value, unit, type) {
        if (type === "Length") {
            const map = {
                Millimeter: value * 1000,
                Centimeter: value * 100,
                Meter: value,
                Kilometer: value / 1000,
                Inch: value / 0.0254,
                Feet: value / 0.3048
            };
            return map[unit];
        }

        if (type === "Weight") {
            const map = {
                Gram: value * 1000,
                Kilogram: value,
                Pound: value / 0.453592
            };
            return map[unit];
        }

        if (type === "Volume") {
            const map = {
                Milliliter: value * 1000,
                Liter: value,
                Gallon: value / 3.78541
            };
            return map[unit];
        }

        return value;
    }

    function convertTemperature(value, fromUnit, toUnit) {
        let celsius = value;

        if (fromUnit === "Fahrenheit") {
            celsius = ((value - 32) * 5) / 9;
        }

        if (fromUnit === "Kelvin") {
            celsius = value - 273.15;
        }

        if (toUnit === "Celsius") return celsius;
        if (toUnit === "Fahrenheit") return (celsius * 9) / 5 + 32;
        if (toUnit === "Kelvin") return celsius + 273.15;

        return value;
    }

    function normalizeValue(value, unit, type) {
        if (type === "Temperature") {
            return convertTemperature(value, unit, "Celsius");
        }

        return convertToBase(value, unit, type);
    }

    function formatNumber(value) {
        return Number(value.toFixed(4)).toString();
    }

    function setResult(title, type, meta, valueText = "—") {
        resultStatus.textContent = title;
        resultValue.textContent = valueText;
        resultMeta.textContent = meta;

        if (type === "error") {
            resultStatus.style.background = "rgba(239,68,68,0.12)";
            resultStatus.style.color = "#dc2626";
        } else if (type === "warning") {
            resultStatus.style.background = "rgba(249,115,22,0.12)";
            resultStatus.style.color = "#c2410c";
        } else if (type === "success") {
            resultStatus.style.background = "rgba(16,185,129,0.12)";
            resultStatus.style.color = "#059669";
        } else {
            resultStatus.style.background = "rgba(14,165,233,0.10)";
            resultStatus.style.color = "#0284c7";
        }
    }

    function clearResult() {
        currentResult = null;
        setResult("Ready", "default", "Select values and run an operation", "—");
    }

    function runOperation() {
        const value1 = parseFloat(value1Input.value);
        const value2 = parseFloat(value2Input.value);
        const unit1 = unit1Select.value;
        const unit2 = unit2Select.value;
        const targetUnit = targetUnitSelect.value;

        if (Number.isNaN(value1)) {
            setResult("Invalid input", "error", "Please enter a valid first value.");
            return;
        }

        if (selectedAction !== "Convert" && Number.isNaN(value2)) {
            setResult("Invalid input", "error", "Please enter a valid second value.");
            return;
        }

        let finalText = "";
        let metaText = "";

        if (selectedAction === "Compare") {
            const first = normalizeValue(value1, unit1, selectedType);
            const second = normalizeValue(value2, unit2, selectedType);

            if (first > second) {
                finalText = "Value 1 is greater";
            } else if (second > first) {
                finalText = "Value 2 is greater";
            } else {
                finalText = "Both values are equal";
            }

            metaText = `${formatNumber(value1)} ${unit1} vs ${formatNumber(value2)} ${unit2}`;
        }

        if (selectedAction === "Convert") {
            let convertedValue;

            if (selectedType === "Temperature") {
                convertedValue = convertTemperature(value1, unit1, targetUnit);
            } else {
                const baseValue = convertToBase(value1, unit1, selectedType);
                convertedValue = convertFromBase(baseValue, targetUnit, selectedType);
            }

            finalText = `${formatNumber(convertedValue)} ${targetUnit}`;
            metaText = `${formatNumber(value1)} ${unit1} converted to ${targetUnit}`;
        }

        if (selectedAction === "Add") {
            const first = normalizeValue(value1, unit1, selectedType);
            const second = normalizeValue(value2, unit2, selectedType);
            const sum = first + second;
            const display = convertFromBase(sum, unit1, selectedType);

            finalText = `${formatNumber(display)} ${unit1}`;
            metaText = `${formatNumber(value1)} ${unit1} + ${formatNumber(value2)} ${unit2}`;
        }

        if (selectedAction === "Subtract") {
            const first = normalizeValue(value1, unit1, selectedType);
            const second = normalizeValue(value2, unit2, selectedType);
            const difference = first - second;
            const display = convertFromBase(difference, unit1, selectedType);

            finalText = `${formatNumber(display)} ${unit1}`;
            metaText = `${formatNumber(value1)} ${unit1} - ${formatNumber(value2)} ${unit2}`;
        }

        if (selectedAction === "Divide") {
            const first = normalizeValue(value1, unit1, selectedType);
            const second = normalizeValue(value2, unit2, selectedType);

            if (second === 0) {
                setResult("Not allowed", "error", "Division by zero is not allowed.");
                return;
            }

            const division = first / second;
            finalText = formatNumber(division);
            metaText = `${formatNumber(value1)} ${unit1} ÷ ${formatNumber(value2)} ${unit2}`;
        }

        setResult("Completed", "default", metaText, finalText);

        currentResult = {
            id: Date.now(),
            type: selectedType,
            action: selectedAction,
            value: finalText,
            meta: metaText,
            date: new Date().toLocaleString()
        };
    }

    function saveHistory(resultData) {
        const email = localStorage.getItem("email") || "guest";
        const storageKey = `qm_history_${email}`;
        const existingHistory = JSON.parse(localStorage.getItem(storageKey)) || [];

        existingHistory.unshift({
            ...resultData,
            savedAt: new Date().toLocaleString()
        });

        localStorage.setItem(storageKey, JSON.stringify(existingHistory));
    }

    function updateUserStatus() {
        const token = localStorage.getItem("token");
        const fullName = localStorage.getItem("fullName");

        if (token && fullName) {
            userStatus.textContent = `Logged in as ${fullName}`;
            loginBtn.innerHTML = `<i class="fas fa-user-check"></i><span>Logged In</span>`;
        } else {
            userStatus.textContent = "Guest Mode";
        }
    }

    if (getStartedBtn) {
        getStartedBtn.addEventListener("click", () => {
            dashboardSection.scrollIntoView({ behavior: "smooth" });
        });
    }

    if (learnMoreBtn) {
        learnMoreBtn.addEventListener("click", () => {
            dashboardSection.scrollIntoView({ behavior: "smooth" });
        });
    }

    if (loginBtn) {
        loginBtn.addEventListener("click", () => {
            localStorage.setItem("redirectAfterAuth", "dashboard");
            window.location.href = "./src/Pages/Auth.html";
        });
    }

    if (guestLoginBtn) {
        guestLoginBtn.addEventListener("click", () => {
            localStorage.setItem("redirectAfterAuth", "dashboard");
            window.location.href = "./src/Pages/Auth.html";
        });
    }

    if (historyBtn) {
        historyBtn.addEventListener("click", () => {
            const token = localStorage.getItem("token");

            if (token) {
                window.location.href = "./src/Pages/History.html";
            } else {
                localStorage.setItem("redirectAfterAuth", "history");
                window.location.href = "./src/Pages/Auth.html";
            }
        });
    }

    if (saveResultBtn) {
        saveResultBtn.addEventListener("click", () => {
            if (!currentResult) {
                setResult("Run operation first", "warning", "No result is available to save.");
                return;
            }

            saveHistory(currentResult);
            setResult("Saved", "success", "Result saved successfully. Login or signup to view history.", "Done");
        });
    }

    typeCards.forEach((card) => {
        card.addEventListener("click", () => {
            typeCards.forEach((item) => item.classList.remove("active"));
            card.classList.add("active");

            selectedType = card.dataset.type || "Length";
            updateUnits();
            updateActionAvailability();
            updateUI();
            clearResult();
        });
    });

    actionTabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            if (tab.disabled) return;

            actionTabs.forEach((item) => item.classList.remove("active"));
            tab.classList.add("active");

            selectedAction = tab.dataset.action || "Compare";
            updateUI();
            clearResult();
        });
    });

    if (calculateBtn) {
        calculateBtn.addEventListener("click", runOperation);
    }

    initializeTheme();
    bindThemeToggle();
    updateUnits();
    updateActionAvailability();
    updateUI();
    clearResult();
    updateUserStatus();
});
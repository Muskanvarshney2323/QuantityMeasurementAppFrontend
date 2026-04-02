const API_BASE_URL = "http://127.0.0.1:5020/api/Quantity";

const quantityUnits = {
    Length: ["Inch", "Feet", "Yard", "Centimeter", "Meter"],
    Weight: ["Gram", "Kilogram", "Tonne"],
    Temperature: ["Celsius", "Fahrenheit", "Kelvin"],
    Volume: ["Milliliter", "Liter", "Gallon"]
};

let selectedType = "Length";
let selectedAction = "Comparison";

const typeCards = document.querySelectorAll(".type-card");
const actionTabs = document.querySelectorAll(".action-tab");

const unit1 = document.getElementById("unit1");
const unit2 = document.getElementById("unit2");

const value1 = document.getElementById("value1");
const value2 = document.getElementById("value2");

const value2Label = document.getElementById("value2Label");

const submitBtn = document.getElementById("submitBtn");
const resetBtn = document.getElementById("resetBtn");
const saveBtn = document.getElementById("saveBtn");
const swapBtn = document.getElementById("swapBtn");

const resultText = document.getElementById("resultText");
const operationSymbol = document.getElementById("operationSymbol");

const selectedTypeText = document.getElementById("selectedTypeText");
const selectedActionText = document.getElementById("selectedActionText");

const themeToggleBtn = document.getElementById("themeToggleBtn");
const openHistoryBtn = document.getElementById("openHistoryBtn");
const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");
const toast = document.getElementById("toast");

document.addEventListener("DOMContentLoaded", () => {
    loadUnits();
    updateActionUI();
    bindEvents();
    updateWelcomeText();
    addCardHoverEffect();
});

function bindEvents() {
    typeCards.forEach((card) => {
        card.addEventListener("click", () => {
            selectedType = card.dataset.type;

            typeCards.forEach((item) => item.classList.remove("active"));
            card.classList.add("active");

            selectedTypeText.textContent = selectedType;
            loadUnits();
            resetForm(false);
            animateResultCard();
            showToast(`${selectedType} selected`);
        });
    });

    actionTabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            selectedAction = tab.dataset.action;

            actionTabs.forEach((item) => item.classList.remove("active"));
            tab.classList.add("active");

            selectedActionText.textContent = selectedAction;
            updateActionUI();
            resetForm(false);
            animateResultCard();
            showToast(`${selectedAction} selected`);
        });
    });

    submitBtn.addEventListener("click", handleSubmit);
    resetBtn.addEventListener("click", () => resetForm(true));
    saveBtn.addEventListener("click", saveResultLocally);
    swapBtn.addEventListener("click", swapValuesAndUnits);
    themeToggleBtn.addEventListener("click", toggleTheme);

    openHistoryBtn.addEventListener("click", handleHistoryClick);

    loginBtn.addEventListener("click", () => {
        window.location.href = "./src/Pages/Auth.html?mode=login";
    });

    signupBtn.addEventListener("click", () => {
        window.location.href = "./src/Pages/Auth.html?mode=signup";
    });
}

function loadUnits() {
    const units = quantityUnits[selectedType] || [];

    unit1.innerHTML = "";
    unit2.innerHTML = "";

    units.forEach((unit) => {
        const option1 = document.createElement("option");
        option1.value = unit;
        option1.textContent = unit;
        unit1.appendChild(option1);

        const option2 = document.createElement("option");
        option2.value = unit;
        option2.textContent = unit;
        unit2.appendChild(option2);
    });

    if (units.length > 1) {
        unit2.selectedIndex = 1;
    } else {
        unit2.selectedIndex = 0;
    }
}

function updateActionUI() {
    if (selectedAction === "Conversion") {
        value2.style.display = "none";
        value2Label.textContent = "TO UNIT";
        submitBtn.textContent = "Convert";
        operationSymbol.textContent = "→";
    } else {
        value2.style.display = "block";
        value2Label.textContent = "VALUE 2";
        submitBtn.textContent = getButtonText(selectedAction);
        operationSymbol.textContent = getOperationSymbol(selectedAction);
    }
}

function getButtonText(action) {
    switch (action) {
        case "Comparison":
            return "Compare";
        case "Conversion":
            return "Convert";
        case "Addition":
            return "Add";
        case "Subtraction":
            return "Subtract";
        default:
            return "Submit";
    }
}

function getOperationSymbol(action) {
    switch (action) {
        case "Comparison":
            return "=";
        case "Conversion":
            return "→";
        case "Addition":
            return "+";
        case "Subtraction":
            return "−";
        default:
            return "=";
    }
}

function resetForm(showMessage = true) {
    value1.value = "";
    value2.value = "";
    resultText.textContent = "Your result will appear here.";
    loadUnits();
    updateActionUI();

    if (showMessage) {
        showToast("Form reset successfully");
    }
}

function swapValuesAndUnits() {
    if (selectedAction === "Conversion") {
        const tempUnit = unit1.value;
        unit1.value = unit2.value;
        unit2.value = tempUnit;
        showToast("Units swapped");
        return;
    }

    const tempValue = value1.value;
    value1.value = value2.value;
    value2.value = tempValue;

    const tempUnit = unit1.value;
    unit1.value = unit2.value;
    unit2.value = tempUnit;

    showToast("Values and units swapped");
}

async function handleSubmit() {
    try {
        if (!value1.value) {
            showToast("Please enter Value 1");
            resultText.textContent = "Please enter Value 1";
            return;
        }

        if (selectedAction !== "Conversion" && !value2.value) {
            showToast("Please enter Value 2");
            resultText.textContent = "Please enter Value 2";
            return;
        }

        let endpoint = "";
        let payload = {};

        switch (selectedAction) {
            case "Comparison":
                endpoint = "/compare";
                payload = {
                    value1: parseFloat(value1.value),
                    unit1: unit1.value,
                    value2: parseFloat(value2.value),
                    unit2: unit2.value,
                    quantityType: selectedType
                };
                break;

            case "Addition":
                endpoint = "/add";
                payload = {
                    value1: parseFloat(value1.value),
                    unit1: unit1.value,
                    value2: parseFloat(value2.value),
                    unit2: unit2.value,
                    quantityType: selectedType
                };
                break;

            case "Subtraction":
                endpoint = "/subtract";
                payload = {
                    value1: parseFloat(value1.value),
                    unit1: unit1.value,
                    value2: parseFloat(value2.value),
                    unit2: unit2.value,
                    quantityType: selectedType
                };
                break;

            case "Conversion":
                endpoint = "/convert";
                payload = {
                    value: parseFloat(value1.value),
                    fromUnit: unit1.value,
                    toUnit: unit2.value,
                    quantityType: selectedType
                };
                break;

            default:
                showToast("Invalid action selected");
                resultText.textContent = "Invalid action selected";
                return;
        }

        resultText.textContent = "Loading result...";

        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        let data = null;
        const rawText = await response.text();

        if (rawText) {
            try {
                data = JSON.parse(rawText);
            } catch {
                data = { message: rawText };
            }
        }

        if (!response.ok) {
            const errorMessage =
                (data && (data.message || data.title || data.error || data.outputText)) ||
                `Request failed with status ${response.status}`;

            resultText.textContent = errorMessage;
            showToast(errorMessage);
            return;
        }

        renderResult(data);
        animateResultCard();
        showToast(`${selectedAction} completed successfully`);
    } catch (error) {
        console.error("Frontend fetch error:", error);

        if (error.message && error.message.includes("Failed to fetch")) {
            resultText.textContent = "Backend is not running or API URL is incorrect.";
            showToast("Backend is not running");
        } else {
            resultText.textContent = error.message || "Request failed";
            showToast(error.message || "Request failed");
        }
    }
}

function renderResult(data) {
    if (!data) {
        resultText.textContent = "No result received.";
        return;
    }

    if (typeof data === "string") {
        resultText.textContent = data;
        return;
    }

    const textResult =
        data.result ||
        data.message ||
        data.outputText ||
        data.comparisonResult ||
        data.finalResult;

    if (textResult) {
        resultText.textContent = textResult;
        return;
    }

    if (data.outputValue !== undefined && data.outputUnit) {
        resultText.textContent = `${data.outputValue} ${data.outputUnit}`;
        return;
    }

    if (data.outputValue !== undefined) {
        resultText.textContent = `${data.outputValue}`;
        return;
    }

    resultText.textContent = JSON.stringify(data, null, 2);
}

function saveResultLocally() {
    const result = resultText.textContent.trim();

    if (!result || result === "Your result will appear here." || result === "Loading result...") {
        showToast("No result available to save");
        return;
    }

    const savedResults = JSON.parse(localStorage.getItem("quantityResults")) || [];

    const record = {
        type: selectedType,
        action: selectedAction,
        result: result,
        savedAt: new Date().toLocaleString()
    };

    savedResults.unshift(record);
    localStorage.setItem("quantityResults", JSON.stringify(savedResults));

    showToast("Result saved locally");
}

function handleHistoryClick() {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    if (!isLoggedIn) {
        localStorage.setItem("historyAccessMessage", "Please login or signup to view history.");
        showToast("Login or Signup required for history");

        setTimeout(() => {
            window.location.href = "./src/Pages/Auth.html?redirect=history";
        }, 700);

        return;
    }

    window.location.href = "./src/Pages/History.html";
}

function updateWelcomeText() {
    const welcomeText = document.querySelector(".welcome-text");
    const savedUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (savedUser && savedUser.name) {
        welcomeText.textContent = `Welcome, ${savedUser.name}`;
    } else {
        welcomeText.textContent = "Welcome, Guest";
    }
}

function toggleTheme() {
    document.body.classList.toggle("light-mode");

    if (document.body.classList.contains("light-mode")) {
        themeToggleBtn.textContent = "Dark Mode";
    } else {
        themeToggleBtn.textContent = "Light Mode";
    }
}

function animateResultCard() {
    const resultCard = document.getElementById("resultCard");
    resultCard.classList.remove("result-pop");

    void resultCard.offsetWidth;

    resultCard.classList.add("result-pop");
}

function addCardHoverEffect() {
    typeCards.forEach((card) => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty("--x", `${x}px`);
            card.style.setProperty("--y", `${y}px`);
        });
    });
}

function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}
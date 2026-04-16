document.addEventListener("DOMContentLoaded", () => {
    const selectedType = localStorage.getItem("selectedType") || "Length";

    const typeTitle = document.getElementById("typeTitle");
    const actionButtons = document.querySelectorAll(".action-btn");
    const runBtn = document.getElementById("runBtn");
    const resultBox = document.getElementById("resultBox");

    let selectedAction = "Compare";

    if (typeTitle) {
        typeTitle.textContent = selectedType;
    }

    actionButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            actionButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            selectedAction = btn.dataset.action;
        });
    });

    if (runBtn) {
        runBtn.addEventListener("click", () => {
            const val1 = parseFloat(document.getElementById("value1").value);
            const val2 = parseFloat(document.getElementById("value2").value);

            if (isNaN(val1) || isNaN(val2)) {
                resultBox.textContent = "Please enter valid values";
                return;
            }

            let result = "";

            if (selectedAction === "Compare") {
                result = val1 > val2
                    ? "Value 1 is greater"
                    : val2 > val1
                    ? "Value 2 is greater"
                    : "Both are equal";
            }

            if (selectedAction === "Add") {
                result = val1 + val2;
            }

            if (selectedAction === "Subtract") {
                result = val1 - val2;
            }

            if (selectedAction === "Convert") {
                result = val1;
            }

            resultBox.textContent = `Result: ${result}`;
        });
    }
});
// Select DOM elements
const themeSwitcher = document.querySelector(".js-theme-switcher");
const resultEl = document.querySelector(".js-display");
const keys = document.querySelectorAll(".js-key");
const delBtn = document.querySelector(".js-del");
const resetBtn = document.querySelector(".js-reset");
const equalBtn = document.querySelector(".js-equal");

// Initialize expressions for display and calculation
let expressionDisplay = "";
let expressionCalc = "";

themeSwitcher.addEventListener("change", () => {
  const themeValue = Number(themeSwitcher.value);

  // Remove existing themes
  document.body.classList.remove("theme-1", "theme-2", "theme-3");

  // Add selected theme
  const themes = {
    50: "theme-2",
    100: "theme-3",
  };

  document.body.classList.add(themes[themeValue] || "theme-1");
});

// Handle key clicks
keys.forEach((key) => {
  key.addEventListener("click", () => {
    const value = key.textContent;

    // Append value to display expression
    expressionDisplay += value;

    // Append correct value to calculation expression
    expressionCalc += value === "x" ? "*" : value;

    // Update display
    resultEl.value = expressionDisplay;
  });
});

// Handle calculation when equal button is clicked
equalBtn.addEventListener("click", () => {
  try {
    const result = eval(expressionCalc);
    resultEl.value = result;
    expressionDisplay = result.toString();
    expressionCalc = result.toString();
  } catch (e) {
    resultEl.value = "Error";
    expressionDisplay = "";
    expressionCalc = "";
  }
});

// Handle delete button click (remove last character)
delBtn.addEventListener("click", () => {
  expressionDisplay = expressionDisplay.slice(0, -1);
  expressionCalc = expressionCalc.slice(0, -1);
  resultEl.value = expressionDisplay;
});

// Handle reset button click (clear all)
resetBtn.addEventListener("click", () => {
  expressionDisplay = "";
  expressionCalc = "";
  resultEl.value = "";
});

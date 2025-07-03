const themeSwitcher = document.querySelector(".js-theme-switcher");

themeSwitcher.addEventListener("change", () => {
  const val = Number(themeSwitcher.value);

  document.body.classList.remove("theme-1", "theme-2", "theme-3");

  switch (val) {
    case 50:
      document.body.classList.add("theme-2");
      break;
    case 100:
      document.body.classList.add("theme-3");
      break;
    default:
      document.body.classList.add("theme-1");
      break;
  }
});

const keys = document.querySelectorAll(".js-key");
const resetBtn = document.querySelector(".js-reset");
const delBtn = document.querySelector(".js-del");
const equalBtn = document.querySelector(".js-equal");
const expressionEl = document.querySelector(".js-expression");
const resultEl = document.querySelector(".js-display");
const displayContainer = document.querySelector(".calculator__display");

let currentInput = "";
let previousInput = "";
let operator = "";

keys.forEach((key) => {
  key.addEventListener("click", () => {
    const value = key.textContent;
    pressKey(key);

    if (!isNaN(value) || value === ".") {
      handleNumber(value);
    } else {
      handleOperator(value);
    }

    updateDisplay();
  });
});

resetBtn.addEventListener("click", () => {
  pressKey(resetBtn);
  currentInput = "";
  previousInput = "";
  operator = "";
  updateDisplay();
});

delBtn.addEventListener("click", () => {
  pressKey(delBtn);
  currentInput = currentInput.slice(0, -1);
  updateDisplay();
});

equalBtn.addEventListener("click", () => {
  pressKey(equalBtn);
  if (previousInput && currentInput && operator) {
    calculate();
    operator = "";
    updateDisplay();
  }
});

function handleNumber(value) {
  if (value === "." && currentInput.includes(".")) return;
  currentInput += value;
}

function handleOperator(value) {
  if (["+", "-", "x", "/"].includes(value)) {
    if (currentInput === "") return;
    if (previousInput && operator) {
      calculate();
    } else {
      previousInput = currentInput;
    }
    operator = value;
    currentInput = "";
  }
}

function calculate() {
  const prev = parseFloat(previousInput);
  const curr = parseFloat(currentInput);
  if (isNaN(prev) || isNaN(curr)) return;

  let result = 0;
  switch (operator) {
    case "+":
      result = prev + curr;
      break;
    case "-":
      result = prev - curr;
      break;
    case "x":
      result = prev * curr;
      break;
    case "/":
      result = prev / curr;
      break;
  }

  currentInput = result.toString();
  previousInput = "";
}

function updateDisplay() {
  expressionEl.textContent = `${previousInput} ${operator}`;
  resultEl.textContent = currentInput || "0";

  // Kalau ada previousInput + operator, kasih animasi aktif
  if (previousInput && operator) {
    displayContainer.classList.add("is-active");
  } else {
    displayContainer.classList.remove("is-active");
  }
}

function pressKey(button) {
  button.classList.add("is-pressed");
  setTimeout(() => {
    button.classList.remove("is-pressed");
  }, 100);
}

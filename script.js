var output = document.querySelector(".output").textContent;
let accumulator = "0";
let aux = 0;
firstPass = true;
nextOperator = "+";

function display(input) {
  const output = document.querySelector(".output");
  outputLen = input.toString().length;
  if (outputLen > 9) {
    if (input >= 10e99 || input <= 10e-4) {
      input = Number(input).toPrecision(4);
    } else if (input >= 10e9) {
      input = Number(input).toPrecision(4);
    } else if (input >= 10e8 || input <= 10e-3) {
      input = Number(input).toPrecision(5);
    } else {
      input = Number(input).toPrecision(9);
    }
  }
  output.textContent = input;
}

const add = (a, b) => +a + +b;

const subtract = (a, b) => a - b;

const multiply = (a, b) => a * b;

const divide = (a, b) => a / b;

function operate(operator, a, b) {
  switch (operator) {
    case "+":
      accumulator = add(a, b);
      output = accumulator;
      break;
    case "-":
      accumulator = subtract(a, b);
      output = accumulator;
      break;
    case "×":
      !firstPass, () => (a = 1);
      accumulator = multiply(a, b);
      output = accumulator;
      break;
    case "÷":
      !firstPass, () => (a = 1);
      accumulator = divide(a, b);
      output = accumulator;
      break;

    default:
      break;
  }
}

function input() {
  const operands = document.querySelectorAll(".operand");
  window.addEventListener("keydown", function (e) {
    const operands = document.querySelector(
      '.operand[data-key="' + e.key + '"]'
    );
    if (operands) executeFunction(operands);
  });

  operands.forEach((operand) =>
    operand.addEventListener("click", () => {
      executeFunction(operand);
    })
  );

  const executeFunction = (operand) => {
    if (output.length >= 9) return;
    (output == 0 && !output.toString().includes(".")) || output == accumulator
      ? (output = Number(operand.textContent))
      : (output += operand.textContent);
    display(output);
  };
}

function clear() {
  const clear = document.querySelector(".clear");
  clear.addEventListener("click", () => {
    reset();
    display(output);
  });
}

function reset() {
  accumulator = 0;
  output = 0;
  firstPass = true;
  nextOperator = "+";
}

function del() {
  const del = document.querySelector(".back");
  window.addEventListener("keydown", function (e) {
    const del = document.querySelector('.back[data-key="' + e.key + '"]');
    if (del) executeFunction(del);
  });

  del.addEventListener("click", () => {
    executeFunction(del);
  });

  const executeFunction = (del) => {
    if (output.length <= 1) {
      output = 0;
    } else {
      output = output.toString().slice(0, -1);
    }
    display(output);
  };
}

function operator() {
  const operators = document.querySelectorAll(".operator");
  window.addEventListener("keydown", function (e) {
    const operator = document.querySelector(
      '.operator[data-key="' + e.key + '"]'
    );
    if (operator) executeFunction(operator);
  });

  operators.forEach((operator) => {
    operator.addEventListener("click", () => {
      executeFunction(operator);
    });
  });

  const executeFunction = (operator) => {
    operator.classList.add("operator-pressed");
    output = output.toString();
    if (nextOperator == "÷" && output == 0) {
      display("lmao");
      reset();
      operator.classList.remove("operator-pressed");
      return;
    }
    const keys = document.querySelectorAll(".button");
    keys.forEach((key) =>
      key.addEventListener("transitionend", removeTransition)
    );

    function removeTransition(e) {
      keys.forEach((key) => {
        if (operator != key) {
          key.addEventListener("click", removeColor);
        }
      });
      window.addEventListener("keydown", removeColor);

      function removeColor(e) {
        if (e.key == operator.value) return;
        operator.classList.remove("operator-pressed");
        keys.forEach((key) => key.removeEventListener("click", removeColor));
        keys.forEach((key) =>
          key.removeEventListener("transitionend", removeTransition)
        );
        window.removeEventListener("keydown", removeColor);
      }
    }
    operate(nextOperator, accumulator, output);
    display(output);
    nextOperator = operator.textContent;
    firstPass = false;
  };
}

function decimal() {
  const decimal = document.querySelector(".decimal");
  window.addEventListener("keydown", function (e) {
    const decimal = document.querySelector(
      '.decimal[data-key="' + e.key + '"]'
    );
    if (decimal) executeFunction();
  });

  decimal.addEventListener("click", () => {
    executeFunction();
  });

  const executeFunction = () => {
    if (!output.toString().includes(".")) {
      output += ".";
      display(output);
    }
  };
}

//percent button
function percent() {
  firstPass = false;
  const output = document.querySelector(".output");
  const percent = document.querySelector(".percent");
  percent.addEventListener("click", () => {
    if (percent) executeFunction();
  });

  const executeFunction = () => {
    const current = Number(output.textContent);
    operate("÷", current, 100);
    display(accumulator);
    accumulator = current;
  };
}
// +- button
function invertSign() {
  firstPass = false;
  const output = document.querySelector(".output");
  const invert = document.querySelector(".invert");
  invert.addEventListener("click", () => {
    if (invert) executeFunction();
  });

  const executeFunction = () => {
    const current = Number(output.textContent);
    operate("×", current, Number(-1));
    display(accumulator);
    accumulator = 0;
  };
}

// result button
function result() {
  const result = document.querySelector(".result");

  result.addEventListener("click", () => {
    executeFunction();
  });
  window.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
      executeFunction();
    }
  });

  function executeFunction() {
    if (nextOperator == "") return;
    output = output.toString();
    if (nextOperator == "÷" && output == 0) {
      display("lmao");
      reset();
      return;
    }
    operate(nextOperator, accumulator, output);
    display(output);
    nextOperator = operator.textContent;
    firstPass = false;
  }
}

function animateButtons() {
  const buttons = document.querySelectorAll(".button:not(.operator)");
  buttons.forEach((button) =>
    button.addEventListener("click", () => {
      button.classList.add("button-pressed");
    })
  );
  buttons.forEach((button) =>
    button.addEventListener("transitionend", removeTransition)
  );

  window.addEventListener("keydown", function (e) {
    const button = document.querySelector(
      '.button[data-key="' + e.key + '"]:not(.operator)'
    );
    if (button) {
      button.classList.add("button-pressed");
    }
  });

  function removeTransition(e, button) {
    buttons.forEach((button) => {
      button.classList.remove("button-pressed");
    });
  }
}

input();
clear();
del();
operator();
decimal();
percent();
invertSign();
result();
animateButtons();

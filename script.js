let accumulator = 0;
let screenNumber = 0;


function display(input) {
  const output = document.querySelector(".output");
  output.textContent = input;
}

const add = (a, b) => a + b;

const subtract = (a, b) => a - b;

const multiply = (a, b) => a * b;

const divide = (a, b) => a / b;

function operate(opperator, a, b) {
  switch (opperator) {
    case "+":
      add(a, b);
      break;
    case "-":
      subtract(a, b);
      break;
    case "×":
      multiply(a, b);
      break;
    case "÷":
      divide(a, b);
      break;

    default:
      break;
  }
}

function input() {
  const operands = document.querySelectorAll(".operand");
  operands.forEach((operand) =>
    operand.addEventListener("click", () => {
        screenNumber === 0 
        ? screenNumber = Number(operand.textContent)
        :screenNumber+= operand.textContent;
        display(screenNumber);
    })
  );
}

input(8);

/*     currentInput = Number(output['textContent']);
    (currentInput === 0) 
    ? output.textContent = input 
    : output.textContent += input;
    console.log(currentInput === 0)  */

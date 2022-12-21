let accumulator = "0";
let screenNumber = 0;
firstPass = false;
nextOperator = '+';

function display(input) {
  const output = document.querySelector(".output");
  output.textContent = input;
}

const add = (a, b) => +a + +b;

const subtract = (a, b) => a - b;

const multiply = (a, b) => a * b;

const divide = (a, b) => (a / b);

function operate(opperator, a, b) {
  switch (opperator) {
    case "+":
      accumulator = add(a, b);
      screenNumber = accumulator;

      break;
    case "-":
      accumulator = subtract(a, b);
      screenNumber = accumulator;
      break;
    case "×":
      !firstPass, () => (a = 1);
      accumulator = multiply(a, b);
      screenNumber = accumulator;
      break;
    case "÷":
      !firstPass, () => (a = 1);
      accumulator = divide(a, b);
      screenNumber = accumulator;
      break;

    default:
      break;
  }
}

function input() {
  const operands = document.querySelectorAll(".operand");
  operands.forEach((operand) =>
    operand.addEventListener("click", () => {
      if (screenNumber.length >= 9) return;
      screenNumber === 0
        ? (screenNumber = Number(operand.textContent))
        : (screenNumber += operand.textContent);
      display(screenNumber);
    })
  );
}

function clear() {
  const clear = document.querySelector(".clear");
  clear.addEventListener("click", () => {
    accumulator = 0;
    screenNumber = 0;
    firstPass = true;
    nextOperator = '+'
    display(0);
  });
}

function del() {
  const del = document.querySelector(".back");
  del.addEventListener("click", () => {
    const output = document.querySelector(".output");
    if (output.textContent.length <= 1) {
      screenNumber = 0;
    } else {
      screenNumber = output.textContent.toString().slice(0, -1);
    }
    display(screenNumber);
  });
}

function operator() {
  const operators = document.querySelectorAll(".operator");
  operators.forEach((operator) =>
    operator.addEventListener("click", () => {
      const output = document.querySelector(".output");
      current = output.textContent.toString();
      if(operator.textContent == '÷' && current == 0){
        display('lmao');
        return;
      }
      operate(nextOperator, accumulator, current);
      screenNumber = accumulator;
      display(screenNumber);
      nextOperator = operator.textContent;
      firstPass = false;
      screenNumber = 0;
    })
  );
}

input(8);
clear();
del();
operator();


/*     currentInput = Number(output['textContent']);
    (currentInput === 0) 
    ? output.textContent = input 
    : output.textContent += input;
    console.log(currentInput === 0)  */

/*     operands.forEach((operand) =>
    operand.addEventListener("click", () => {
        auxNumber += operand.textContent;
        display(auxNumber);
    
    })
  ); */

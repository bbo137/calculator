var output = document.querySelector(".output").textContent;
let accumulator = "0";
let aux = 0;
firstPass = false;
nextOperator = "+";

function display(input) {
  const output = document.querySelector(".output");
  outputLen = input.toString().length
  if(outputLen > 9){
    if(input >= 10e99 || input <= 10e-9){
      input = Number(input).toPrecision(4);
    }else if(input >= 10e9 || input <= -10e-9){
      input = Number(input).toPrecision(4);
    }else if(input >= 10e8 || input <= -10e-8){
      input = Number(input).toPrecision(5);
    }else{
      input = Number(input).toPrecision(9);
    }
  }
  output.textContent = input;
}

const add = (a, b) => +a + +b;

const subtract = (a, b) => a - b;

const multiply = (a, b) => a * b;

const divide = (a, b) => a / b;

function operate(opperator, a, b) {
  switch (opperator) {
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
  operands.forEach((operand) =>
    operand.addEventListener("click", () => {
      if (output.length >= 9) return;
      ((output == 0 && !output.toString().includes('.')) || output == accumulator)
        ? (output = Number(operand.textContent))
        : (output += operand.textContent);
      display(output);
    })
  );
}

function clear() {
  const clear = document.querySelector(".clear");
  clear.addEventListener("click", () => {
    reset()
    display(output);
  });
}

function reset(){
  accumulator = 0;
  output = 0;
  firstPass = true;
  nextOperator = "+";
}

function del() {
  const del = document.querySelector(".back");
  del.addEventListener("click", () => {
    if (output.length <= 1) {
      output = 0;
    } else {
      output = output.toString().slice(0, -1);
    }
    display(output);
  });
}

function operator() {
  const operators = document.querySelectorAll(".operator");
  operators.forEach((operator) =>
    operator.addEventListener("click", () => {
      operator.setAttribute("style", "background-color: red");
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
    })
  );
}

function decimal(){
  const decimal = document.querySelector('.decimal');
  decimal.addEventListener('click', () => {
    if(!output.toString().includes('.')){
      output+= '.';
      display(output);
    }
  })
}

input();
clear();
del();
operator();
decimal();

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

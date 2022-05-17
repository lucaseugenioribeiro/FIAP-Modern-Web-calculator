const display = document.getElementById('display');
const buttons = document.querySelectorAll('[id*=tecla]');
const operators = document.querySelectorAll('[id*=operador]');
const decimal = document.querySelector('#decimal');

let newNumber = true;
let operator;
let previousNumber;

function updateDisplay(numero) {
    if(newNumber) {
        display.textContent = numero;
        newNumber = false;
    }
    else display.textContent += numero;
}

const insertNumber = (event) => {
    updateDisplay(event.target.textContent);
}

// Prototype são atributos e funções inerentes ao tipo

buttons.forEach((button) => button.addEventListener('click', insertNumber));

const setDecimal = (event) => {
    const isDecimal = display.textContent.includes(event.target.textContent);
    if(!isDecimal){
        updateDisplay(event.target.textContent);
    }
}

decimal.addEventListener('click', setDecimal);

const selectOperator = (event) => {
    newNumber = true;
    operator = event.target.textContent;
    previousNumber = display.textContent;
}

operators.forEach((operator) => operator.addEventListener('click', selectOperator));

const calculate = () => {
    const actualNumber = display.textContent;
    const result = eval(`${previousNumber.replace(",",".")}${operator}${actualNumber.replace(",",".")}`); //template string, utilizando craze
    newNumber = true;
    updateDisplay(String(result).replace(".",","));
}

const equal = document.querySelector("#igual");

equal.addEventListener('click', calculate);

const clearDisplay = () => (display.textContent = "");

document.querySelector("#limparDisplay").addEventListener("click", clearDisplay);

const clearCalc = () => {
  clearDisplay();
  newNumber = true;
  operator = undefined;
  previousNumber = undefined;
};

document.querySelector("#limparCalculo").addEventListener("click", clearCalc);

const removeLastNumber = () => 
    (display.textContent = display.textContent.slice(0,-1));

document.querySelector("#backspace").addEventListener("click", removeLastNumber);

const invertSignal = () => {
    newNumber = true;
    updateDisplay(display.textContent * -1);
}

document.querySelector("#inverter").addEventListener("click", invertSignal);
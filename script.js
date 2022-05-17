const display = document.getElementById('display');
const buttons = document.querySelectorAll('[id*=tecla]');
const operators = document.querySelectorAll('[id*=operador]');
const decimal = document.querySelector('#decimal');

let newNumber = true;
let operator;
let previousNumber;
let currentNumber;

function updateDisplay(numero) {
    display.textContent = numero;
}

const insertNumber = (event) => {
    if(newNumber) {
        currentNumber = event.target.textContent;
        newNumber = false;
        updateDisplay(currentNumber)
    }
    else {
        currentNumber += event.target.textContent;
        updateDisplay(currentNumber)
    }
}

buttons.forEach((button) => button.addEventListener('click', insertNumber));

const setDecimal = (event) => {
    if(newNumber){
        currentNumber = "0"+event.target.textContent;
        newNumber = false;
        updateDisplay(currentNumber)
    }
    else {
        const isDecimal = display.textContent.includes(event.target.textContent);
        if(!isDecimal){
            if(newNumber) {
                currentNumber = event.target.textContent;
                newNumber = false;
                updateDisplay(currentNumber)
            }
            else {
                currentNumber += event.target.textContent;
                updateDisplay(currentNumber)
            }
        }
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
    updateDisplay(String(result).replace(".",","))
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
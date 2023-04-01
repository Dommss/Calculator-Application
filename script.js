// Main functions of the calculator.
class Calculator {
    constructor(previousOperationTextElement, currentOperationTextElement) {
      this.previousOperationTextElement = previousOperationTextElement;
      this.currentOperationTextElement = currentOperationTextElement;
      this.clear();
    }
    // Clearing of variables.
    clear() {
      this.currentOperation = '';
      this.previousOperation = '';
      this.operation = undefined;
    }
    // Deletion of the last number.
    delete() {
      this.currentOperation = this.currentOperation.toString().slice(0, -1);
    }
    // Addition of a new number.
    appendNumber(number) {
      if (number === '.' && this.currentOperation.includes('.')) return;
      this.currentOperation = this.currentOperation.toString() + number.toString();
    }
    // Choosing of the operator.
    chooseOperation(operation) {
      if (this.currentOperation === '') return;
      if (this.previousOperation !== '') {
        this.compute();
      }
      this.operation = operation;
      this.previousOperation = this.currentOperation;
      this.currentOperation = '';
    }
    // Main computation function.
    compute() {
      let computation;
      const prev = parseFloat(this.previousOperation);
      const current = parseFloat(this.currentOperation);
      if (isNaN(prev) || isNaN(current)) return;
      switch (this.operation) {
        case '+':
          computation = prev + current;
          break;
        case '-':
          computation = prev - current;
          break;
        case '*':
          computation = prev * current;
          break;
        case '÷':
          computation = prev / current;
          break;
        default:
          return;
      }
      this.currentOperation = computation;
      this.operation = undefined;
      this.previousOperation = '';
    }
    // Displaying digits and integers.
    getDisplayNumber(number) {
      const stringNumber = number.toString();
      const integerDigits = parseFloat(stringNumber.split('.')[0]);
      const decimalDigits = stringNumber.split('.')[1];
      let integerDisplay;
      if (isNaN(integerDigits)) {
        integerDisplay = '';
      } else {
        integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
      }
      if (decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`;
      } else {
        return integerDisplay;
      }
    }
    // Updating the result display.
    updateDisplay() {
      this.currentOperationTextElement.innerText =
        this.getDisplayNumber(this.currentOperation);
      if (this.operation != null) {
        this.previousOperationTextElement.innerText =
          `${this.getDisplayNumber(this.previousOperation)} ${this.operation}`;
      } else {
        this.previousOperationTextElement.innerText = '';
      }
    }
  }
  
  // Constants and linking to HTML happens here.
  const numbers = document.querySelectorAll('[data-number]');
  const operators = document.querySelectorAll('[data-operator]');
  const equal = document.querySelector('[data-equals]');
  const deleteButton = document.querySelector('[data-delete]');
  const allClear = document.querySelector('[data-all-clear]');
  const previousOperationTextElement = document.querySelector('[data-previous-operation]');
  const currentOperationTextElement = document.querySelector('[data-current-operation]');
  
  const calculator = new Calculator(previousOperationTextElement, currentOperationTextElement);
  // Making so that every number button is counted separately.
  numbers.forEach(button => {
    button.addEventListener('click', () => {
      calculator.appendNumber(button.innerText);
      calculator.updateDisplay();
    })
  })
  // Making so that every operator button is counted separately.
  operators.forEach(button => {
    button.addEventListener('click', () => {
      calculator.chooseOperation(button.innerText);
      calculator.updateDisplay();
    })
  })
  // Listener for the Equal button.
  equal.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
  })
  // Listener for the AC button.
  allClear.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
  })
  // Listener for the Delete button.
  deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
  })
  // Adding interaction between the keyboard and the calculator.
  document.addEventListener('keydown', function (event) {
    let patternForNumbers = /[0-9]/g;
    let patternForOperators = /[+\-*\/]/g
    if (event.key.match(patternForNumbers)) {
      event.preventDefault();
      calculator.appendNumber(event.key)
      calculator.updateDisplay()
    }
    if (event.key === '.') {
      event.preventDefault();
      calculator.appendNumber(event.key)
      calculator.updateDisplay()
    }
    if (event.key.match(patternForOperators)) {
      event.preventDefault();
      calculator.chooseOperation(event.key)
      calculator.updateDisplay()
    }
    if (event.key === 'Enter' || event.key === '=') {
      event.preventDefault();
      calculator.compute()
      calculator.updateDisplay()
    }
    if (event.key === "Backspace") {
      event.preventDefault();
      calculator.delete()
      calculator.updateDisplay()
    }
    if (event.key == 'Delete') {
      event.preventDefault();
      calculator.clear()
      calculator.updateDisplay()
    }
  
  });
```javascript
class Calculator {
  constructor() {
    this.displayScreen = document.getElementById('display-screen');
    this.currentNumber = '';
    this.previousNumber = '';
    this.operator = '';
    this.memory = 0;
    this.error = '';

    this.addEventListeners();
  }

  addEventListeners() {
    const buttons = document.querySelectorAll('button');

    buttons.forEach(button => {
      button.addEventListener('click', () => {
        this.handleButtonClick(button.value);
      });
    });
  }

  handleButtonClick(buttonValue) {
    if (buttonValue >= '0' && buttonValue <= '9' || buttonValue === '.') {
      this.currentNumber += buttonValue;
      this.updateDisplayScreen();
    } else if (buttonValue === '+' || buttonValue === '-' || buttonValue === '*' || buttonValue === '/') {
      this.operator = buttonValue;
      this.previousNumber = this.currentNumber;
      this.currentNumber = '';
      this.updateDisplayScreen();
    } else if (buttonValue === '=') {
      this.performCalculation();
    } else if (buttonValue === 'M+' || buttonValue === 'M-' || buttonValue === 'MC') {
      this.handleMemoryButton(buttonValue);
    } else if (buttonValue === 'C' || buttonValue === 'AC') {
      this.clearDisplayScreen();
    } else if (buttonValue === 'backspace') {
      this.deleteLastDigit();
    }
  }

  updateDisplayScreen() {
    if (this.error !== '') {
      this.displayScreen.textContent = this.error;
    } else {
      this.displayScreen.textContent = this.currentNumber;
    }
  }

  performCalculation() {
    let result;

    if (this.operator === '+') {
      result = parseFloat(this.previousNumber) + parseFloat(this.currentNumber);
    } else if (this.operator === '-') {
      result = parseFloat(this.previousNumber) - parseFloat(this.currentNumber);
    } else if (this.operator === '*') {
      result = parseFloat(this.previousNumber) * parseFloat(this.currentNumber);
    } else if (this.operator === '/') {
      if (this.currentNumber === '0') {
        this.error = 'Error: Division by zero';
        this.updateDisplayScreen();
        return;
      }
      result = parseFloat(this.previousNumber) / parseFloat(this.currentNumber);
    }

    if (result.toString().length > 10) {
      this.error = 'Error: Overflow';
      this.updateDisplayScreen();
      return;
    }

    this.currentNumber = result.toString();
    this.updateDisplayScreen();
  }

  clearDisplayScreen() {
    this.currentNumber = '';
    this.previousNumber = '';
    this.operator = '';
    this.memory = 0;
    this.error = '';
    this.updateDisplayScreen();
  }

  deleteLastDigit() {
    this.currentNumber = this.currentNumber.slice(0, -1);
    this.updateDisplayScreen();
  }

  handleMemoryButton(buttonValue) {
    if (buttonValue === 'M+') {
      this.memory += parseFloat(this.currentNumber);
    } else if (buttonValue === 'M-') {
      this.memory -= parseFloat(this.currentNumber);
    } else if (buttonValue === 'MC') {
      this.memory = 0;
    }
  }
}

const calculator = new Calculator();
```
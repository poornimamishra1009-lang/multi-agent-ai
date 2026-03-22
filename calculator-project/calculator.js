```javascript
// Define variables
let currentNumber = '';
let previousNumber = '';
let operator = '';
let result = '';
let displayValue = '0';
let error = '';

// Function to handle button clicks
function handleButtonClick(event) {
    const buttonValue = event.target.textContent;
    if (!isNaN(buttonValue) || buttonValue === '.') {
        handleDigitClick(buttonValue);
    } else if (['+', '-', '*', '/'].includes(buttonValue)) {
        handleOperatorClick(buttonValue);
    } else if (buttonValue === '=') {
        handleEqualsClick();
    }
}

// Function to handle digit button clicks
function handleDigitClick(digit) {
    if (error) {
        handleError(error);
        return;
    }
    if (currentNumber === '0' && digit !== '.') {
        currentNumber = digit;
    } else {
        currentNumber += digit;
    }
    updateDisplay(currentNumber);
}

// Function to handle operator button clicks
function handleOperatorClick(op) {
    if (error) {
        handleError(error);
        return;
    }
    if (currentNumber !== '') {
        previousNumber = currentNumber;
        operator = op;
        currentNumber = '';
    }
}

// Function to handle equals button click
function handleEqualsClick() {
    if (error) {
        handleError(error);
        return;
    }
    if (currentNumber !== '' && previousNumber !== '') {
        performCalculation();
    }
}

// Function to perform calculation
function performCalculation() {
    if (validateInput(previousNumber, operator, currentNumber)) {
        switch (operator) {
            case '+':
                result = parseFloat(previousNumber) + parseFloat(currentNumber);
                break;
            case '-':
                result = parseFloat(previousNumber) - parseFloat(currentNumber);
                break;
            case '*':
                result = parseFloat(previousNumber) * parseFloat(currentNumber);
                break;
            case '/':
                if (currentNumber !== '0') {
                    result = parseFloat(previousNumber) / parseFloat(currentNumber);
                } else {
                    error = 'Division by zero';
                    handleError(error);
                    return;
                }
                break;
            default:
                error = 'Invalid operator';
                handleError(error);
                return;
        }
        updateDisplay(result.toString());
        previousNumber = '';
        currentNumber = result.toString();
    } else {
        error = 'Invalid input';
        handleError(error);
    }
}

// Function to update HTML display
function updateDisplay(value) {
    displayValue = value;
    document.getElementById('display').textContent = displayValue;
}

// Function to validate user input
function validateInput(num1, op, num2) {
    if (isNaN(num1) || isNaN(num2)) {
        return false;
    }
    if (!['+', '-', '*', '/'].includes(op)) {
        return false;
    }
    return true;
}

// Function to handle errors
function handleError(error) {
    updateDisplay('Error');
    console.error(error);
    setTimeout(() => {
        resetCalculator();
    }, 2000);
}

// Function to reset calculator
function resetCalculator() {
    currentNumber = '';
    previousNumber = '';
    operator = '';
    result = '';
    displayValue = '0';
    error = '';
    updateDisplay(displayValue);
}

// Initialize calculator
resetCalculator();
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', handleButtonClick);
    });
});
```
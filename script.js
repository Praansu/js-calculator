let display = document.getElementById('display');
let currentInput = '0';
let operator = null;
let previousValue = null;
let waitingForOperand = false;

function updateDisplay() {
    display.textContent = currentInput;
}

function appendNumber(num) {
    if (waitingForOperand) {
        currentInput = num;
        waitingForOperand = false;
    } else {
        currentInput = currentInput === '0' ? num : currentInput + num;
    }
    updateDisplay();
}

function appendOperator(op) {
    if (operator && !waitingForOperand) {
        calculate();
    }
    previousValue = parseFloat(currentInput);
    operator = op;
    waitingForOperand = true;
}

function calculate() {
    if (!operator || waitingForOperand) return;
    
    const current = parseFloat(currentInput);
    let result;
    
    switch (operator) {
        case '+': result = previousValue + current; break;
        case '-': result = previousValue - current; break;
        case '*': result = previousValue * current; break;
        case '/': result = current === 0 ? 'Error' : previousValue / current; break;
        default: return;
    }
    
    if (result === 'Error') {
        currentInput = 'Error';
    } else {
        currentInput = String(parseFloat(result.toFixed(10)));
    }
    
    operator = null;
    previousValue = null;
    waitingForOperand = false;
    updateDisplay();
}

function clearDisplay() {
    currentInput = '0';
    operator = null;
    previousValue = null;
    waitingForOperand = false;
    updateDisplay();
}

function appendDecimal() {
    if (waitingForOperand) {
        currentInput = '0.';
        waitingForOperand = false;
    } else if (!currentInput.includes('.')) {
        currentInput += '.';
    }
    updateDisplay();
}

function toggleSign() {
    currentInput = String(parseFloat(currentInput) * -1);
    updateDisplay();
}

function backspace() {
    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput = '0';
    }
    updateDisplay();
}

// Keyboard support
document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') appendNumber(e.key);
    if (e.key === '.') appendDecimal();
    if (['+', '-', '*', '/'].includes(e.key)) appendOperator(e.key);
    if (e.key === 'Enter' || e.key === '=') calculate();
    if (e.key === 'Backspace') backspace();
    if (e.key === 'Escape') clearDisplay();
});

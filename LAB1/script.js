window.onload = function() {
    let currentValue = '0';
    let previousValue = '';
    let operation = null;
    let resetScreen = false;
    let accumulatedResult = null;
    
    const outputElement = document.getElementById("result");
    outputElement.innerHTML = currentValue;

    function updateDisplay() {
        outputElement.innerHTML = currentValue;
    }

    function clearAll() {
        currentValue = '0';
        previousValue = '';
        operation = null;
        resetScreen = false;
        accumulatedResult = null;
        updateDisplay();
    }

    function appendNumber(number) {
        if (currentValue === '0' || resetScreen || outputElement.innerHTML === "Error") {
            currentValue = '';
            resetScreen = false;
        }
        currentValue += number;
        updateDisplay();
    }

    function setOperation(op) {
        if (operation !== null) calculate();    
        if ((op === '+' && operation === '-') || (op === '-' && operation === '+')) {
            accumulatedResult = null;
        }
        previousValue = currentValue;
        operation = op;
        resetScreen = true;
    }

    function calculate() {
        if (operation === null || resetScreen) return;

        const prev = parseFloat(previousValue);
        const current = parseFloat(currentValue);
        let result;
        
        switch(operation) {
            case '+':
                if (accumulatedResult === null) {
                    accumulatedResult = prev + current;
                } else {
                    accumulatedResult += current;
                }
                result = accumulatedResult;
                break;
            case '-':
                if (accumulatedResult === null) {
                    accumulatedResult = prev - current;
                } else {
                    accumulatedResult -= current;
                }
                result = accumulatedResult;
                break;
            case 'x':
                result = prev * current;
                accumulatedResult = null;
                break;
            case '/':
                result = prev / current;
                accumulatedResult = null;
                break;
            default:
                return;
        }
        
        currentValue = result.toString();
        operation = null;
        resetScreen = true;
        updateDisplay();
    }

    // Специальные операции
    function calculateSquareRoot() {
        const num = parseFloat(currentValue);
        if (num < 0) {
            currentValue = "Error";
        } else {
            currentValue = Math.sqrt(num).toString();
        }
        updateDisplay();
    }

    function calculateSquare() {
        currentValue = Math.pow(parseFloat(currentValue), 2).toString();
        updateDisplay();
    }

    function calculateFactorial() {
        const num = parseInt(currentValue);
        if (num < 0 || num > 170) {
            currentValue = "Error";
        } else {
            let result = 1;
            for (let i = 2; i <= num; i++) result *= i;
            currentValue = result.toString();
        }
        updateDisplay();
    }

    function addTripleZero() {
        // Исправленная версия - не сбрасывает число, а дописывает нули
        if (outputElement.innerHTML === "Error") {
            currentValue = '0';
        }
        if (resetScreen) {
            currentValue = '0';
            resetScreen = false;
        }
        currentValue += '000';
        updateDisplay();
    }

    // Назначение обработчиков кнопок
    document.querySelectorAll('[id^="btn_digit_"]').forEach(button => {
        button.onclick = () => appendNumber(button.innerHTML);
    });

    document.getElementById("btn_op_plus").onclick = () => setOperation('+');
    document.getElementById("btn_op_minus").onclick = () => setOperation('-');
    document.getElementById("btn_op_mult").onclick = () => setOperation('x');
    document.getElementById("btn_op_div").onclick = () => setOperation('/');
    document.getElementById("btn_op_equal").onclick = calculate;
    document.getElementById("btn_op_clear").onclick = clearAll;
    document.getElementById("btn_op_sqrt").onclick = calculateSquareRoot;
    document.getElementById("btn_op_square").onclick = calculateSquare;
    document.getElementById("btn_op_factorial").onclick = calculateFactorial;
    document.getElementById("btn_digit_triple_zero").onclick = addTripleZero;

    document.getElementById("btn_op_sign").onclick = function() {
        currentValue = (-parseFloat(currentValue)).toString();
        updateDisplay();
    };

    document.getElementById("btn_op_percent").onclick = function() {
        currentValue = (parseFloat(currentValue) / 100).toString();
        updateDisplay();
    };

    function toggleTheme() {
        const body = document.body;
        body.classList.toggle('light-theme');
        document.querySelectorAll('.my-btn').forEach(button => {
            button.classList.toggle('light-theme');
        });
        if (body.classList.contains('light-theme')) {
            localStorage.setItem('theme', 'light');
        } else {
            localStorage.setItem('theme', 'dark');
        }
    }

    function restoreTheme() {
        const body = document.body;
        const savedTheme = localStorage.getItem('theme');
    
        if (savedTheme === 'light') {
            body.classList.add('light-theme');
            document.querySelectorAll('.my-btn').forEach(button => {
                button.classList.add('light-theme');
            });
        } else {
            body.classList.remove('light-theme');
            document.querySelectorAll('.my-btn').forEach(button => {
                button.classList.remove('light-theme');
            });
        }
    }
    
    const themeToggleHeart = document.getElementById('theme-toggle-heart');
    if (themeToggleHeart) {
        themeToggleHeart.addEventListener('click', toggleTheme);
    }

    restoreTheme();
};
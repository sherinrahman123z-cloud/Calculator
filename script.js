const resultInput = document.getElementById('result');
const calculator = document.querySelector('.calculator');
const body = document.querySelector('body');
const checkbox = document.getElementById('checkbox');
const historyList = document.getElementById('history-list');
const clearHistoryBtn = document.getElementById('clear-history');

let history = [];

checkbox.addEventListener('change', () => {
    calculator.classList.toggle('dark-mode');
    body.classList.toggle('dark-mode');
});

function appendValue(value) {
    resultInput.value += value;
}

function clearResult() {
    resultInput.value = '';
}

function deleteLast() {
    resultInput.value = resultInput.value.slice(0, -1);
}

function calculateResult() {
    try {
        const expression = resultInput.value;
        // Replace percentage symbol with '/100'
        let evalExpression = expression.replace(/%/g, '/100');
        const result = eval(evalExpression);
        resultInput.value = result;
        addToHistory(expression, result);
    } catch (error) {
        resultInput.value = 'Error';
    }
}

function addToHistory(expression, result) {
    history.push({ expression, result });
    renderHistory();
}

function renderHistory() {
    historyList.innerHTML = '';
    history.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.expression} = ${item.result}`;
        historyList.appendChild(li);
    });
}

clearHistoryBtn.addEventListener('click', () => {
    history = [];
    renderHistory();
});

document.addEventListener('keydown', function(event) {
    const key = event.key;
    if (/[0-9]|\.|\/|\*|-|\+/.test(key)) {
        appendValue(key);
    } else if (key === 'Enter') {
        calculateResult();
    } else if (key === 'Backspace') {
        deleteLast();
    } else if (key.toLowerCase() === 'c') {
        clearResult();
    }
});
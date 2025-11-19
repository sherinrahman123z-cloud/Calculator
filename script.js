const resultInput = document.getElementById('result');

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
        // Replace percentage symbol with '/100'
        let expression = resultInput.value.replace(/%/g, '/100');
        resultInput.value = eval(expression);
    } catch (error) {
        resultInput.value = 'Error';
    }
}

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
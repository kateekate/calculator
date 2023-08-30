const displayCurrent = document.querySelector('.display-current');
const displayPrevious = document.querySelector('.display-previous');
const operatorMemoryClear = document.querySelector('.memory-clear');
const operatorMemoryRecall = document.querySelector('.memory-recall');
const operatorMemorySubtract = document.querySelector('.memory-subtract');
const operatorMemoryAdd = document.querySelector('.memory-add');
const operatorBack = document.querySelector('.back');
const operatorClear = document.querySelector('.operator-clear');
const operatorToggle = document.querySelector('.operator-toggle');
const operatorPercent = document.querySelector('.operator-percent');
const operators = document.querySelectorAll('.operator');
const equal = document.querySelector('.equal');
const numbers = document.querySelectorAll('.num');
const dot = document.querySelector('.dot');

let memoryValue = 0;
let operator = '';
let previousValue = '';
let currentValue = '';

operatorMemoryClear.addEventListener('click', function () {
  memoryValue = 0;
  displayPrevious.textContent = `Memory is clear.`;
})

operatorMemoryRecall.addEventListener('click', function () {
  currentValue = memoryValue.toString();
  displayCurrent.textContent = currentValue;
});

operatorMemorySubtract.addEventListener('click', function () {
  if (currentValue !== '') {
    memoryValue -= parseFloat(currentValue);
    displayCurrent.textContent = memoryValue;
    displayPrevious.textContent = `In memory: ${memoryValue}`;
  }
});

operatorMemoryAdd.addEventListener('click', function () {
  if (currentValue !== '') {
    memoryValue += parseFloat(currentValue);
    displayPrevious.textContent = `In memory: ${memoryValue}`;
  }
})

operatorBack.addEventListener('click', function () {
  currentValue = currentValue.toString();
  currentValue = currentValue.substring(0, currentValue.length - 1);
  displayCurrent.textContent = currentValue;
})

operatorClear.addEventListener('click', function () {
  displayCurrent.textContent = '';
  displayPrevious.textContent = '';
  previousValue = '';
  currentValue = '';
  operator = '';
})

operatorToggle.addEventListener('click', function () {
  if (!isNaN(currentValue) && currentValue !== '') {
    currentValue = (-parseFloat(currentValue)).toString();
    displayCurrent.textContent = currentValue;
  }
})

operatorPercent.addEventListener('click', function () {
  if (currentValue !== '') {
    currentValue = parseFloat(currentValue) / 100;
    displayCurrent.textContent = currentValue;
    displayPrevious.textContent = `Result: ${currentValue}`;
  }
});

operators.forEach((op) => op.addEventListener('click', function (e) {
  if (previousValue !== '' && currentValue !== '') {
    calculate();
    displayPrevious.textContent = `Result: ${previousValue}`;
    currentValue = previousValue;
  }

  handleOperator(e.target.textContent);
  displayPrevious.textContent = previousValue + ' ' + operator;
  displayCurrent.textContent = currentValue;
}))

equal.addEventListener('click', function () {
  if (currentValue != '' && previousValue != '') {
    calculate();
    displayPrevious.textContent = `Result: ${previousValue}`;
    displayCurrent.textContent = previousValue;
  }
})

numbers.forEach((number) => {
  number.addEventListener('click', function (e) {
    handleNumber(e.target.textContent);
    displayCurrent.textContent = currentValue;
  })
})

dot.addEventListener('click', function () {
  const canAddDot = currentValue !== '' && !currentValue.includes('.') && !currentValue.match(/^0(\d|\.)/);

  if (canAddDot) {
    currentValue += '.';
    displayCurrent.textContent = currentValue;
  }
})

function handleNumber(num) {
  if (num === '0' && currentValue === '0') {
    return;
  }

  if (currentValue.length <= 5) {
    currentValue += num;
  }

  const removeZero = currentValue.length > 1 && currentValue[0] === '0' && currentValue[1] !== '.';

  if (removeZero) {
    currentValue = currentValue.slice(1);
  }
}

function handleOperator(op) {
  operator = op;
  previousValue = currentValue;
  currentValue = '';
}

function updateFontSize(val) {
  const fontSize = 40 - val.length + 10;

  displayCurrent.style.fontSize = fontSize + 'px';
}

function calculate() {
  previousValue = Number(previousValue);
  currentValue = Number(currentValue);

  if (operator === '+') {
    previousValue += currentValue;
  } else if (operator === '-') {
    previousValue -= currentValue;
  } else if (operator === '×') {
    previousValue *= currentValue;
  } else if (operator === '÷') {
    previousValue /= currentValue;
  }

  let result = previousValue;

  const shouldRoundResult = result.toString().length > 8 && result.toString().includes('.');

  if (shouldRoundResult) {
    result = Number.parseFloat(result).toFixed(8);
  }

  if (result.toString().length > 15) {
    updateFontSize(result);
  }

  previousValue = result;
  currentValue = result;

  return result;
}



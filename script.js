const buttons = document.querySelectorAll('button');
const input = document.querySelector('input');
let currentExpression = '';

buttons.forEach(button => {
  button.addEventListener('click', (event) => {
    const buttonTextContent = button.textContent || button.getAttribute('data-operator');

    if (buttonTextContent === 'AC') {
      input.value = '0';
      currentExpression = '';
    } else if (buttonTextContent === '=') {
      input.value = eval(input.value);
    } else if (buttonTextContent === '÷') {
      currentExpression += '/';
      input.value = currentExpression;
    } else if (buttonTextContent === '×') {
      currentExpression += '*';
      input.value = currentExpression;
    }
    else {
      currentExpression += buttonTextContent;
      input.value = currentExpression;
    }
  });
});
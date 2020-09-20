/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */
/* @jsx createElement */
function createElement(tagName, props, ...children) {
  const element = document.createElement(tagName);

  Object.entries(props || {}).forEach(([key, value]) => {
    element[key.toLowerCase()] = value;
  });

  children.flat().forEach((child) => {
    if (child instanceof Node) {
      element.appendChild(child);
      return;
    }
    element.appendChild(document.createTextNode(child));
  });

  return element;
}

const NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const BASIC_OPERATORS = ['+', '-', '*', '/'];

function render(
  displayNumber = 0,
  bufferNumber = 0,
  bufferOperator = '+',
  isEditableNumber = false,
) {
  function calculate(num1, num2, operator) {
    const calculation = {
      '+': num1 + num2,
      '-': num1 - num2,
      '*': num1 * num2,
      '/': num1 / num2,
    };

    return calculation[operator];
  }

  function handleClickNumber(number) {
    const displayNumberNew = isEditableNumber
      ? displayNumber * 10 + number
      : number;
    render(displayNumberNew, bufferNumber, bufferOperator, true);
  }

  function handleClickBasicOperator(operator) {
    const bufferNumberNew = calculate(
      bufferNumber,
      displayNumber,
      bufferOperator,
    );

    const displayBufferNumber = () => render(bufferNumberNew, bufferNumberNew, operator, false);

    displayBufferNumber();
  }

  function handleClickEqualOperator() {
    const bufferNumberNew = calculate(
      bufferNumber,
      displayNumber,
      bufferOperator,
    );

    const displayBufferNumberAndReset = () => render(bufferNumberNew, 0, '+', false);

    displayBufferNumberAndReset();
  }

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{displayNumber}</p>
      <p>
        {NUMBERS.map((i) => (
          <button type="button" onClick={() => handleClickNumber(i)}>
            {i}
          </button>
        ))}
      </p>
      <p>
        {BASIC_OPERATORS.map((i) => (
          <button type="button" onClick={() => handleClickBasicOperator(i)}>
            {i}
          </button>
        ))}
        <button type="button" onClick={() => handleClickEqualOperator()}>
          =
        </button>
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();

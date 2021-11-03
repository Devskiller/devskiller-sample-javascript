import { fireEvent, getByText, getByTestId } from '@testing-library/dom'
import '@testing-library/jest-dom/extend-expect'
import { JSDOM } from 'jsdom'
import fs from 'fs'
import path from 'path'

const html = fs.readFileSync(path.resolve(__dirname, '../../src/index.html'), 'utf8');
const js = fs.readFileSync(path.resolve(__dirname, '../../src/app.js'), 'utf8');
let dom, container

const initializeJSDOM = () => {
  dom = new JSDOM(html, { runScripts: 'dangerously' });
  container = dom.window.document.body;
  let scriptElement = dom.window.document.createElement('script');
  scriptElement.textContent = js;
  dom.window.document.body.appendChild(scriptElement);
}

describe('verify_pack.Calculator', () => {
  beforeEach(initializeJSDOM);

  const click = (...chars) => {
    for (const char of chars) {
      fireEvent.click(getByText(container, char));
    }
  }
  
  const expectDisplayed = (text) => {
    const display = getByTestId(container, 'display');
    expect(display).toHaveValue(text);
  }

  it.each([
    ['', '', 'display empty text by default'],
    ['234', '234', 'display number according to all digits that were pushed'],
    ['', '234C', 'display empty text after "C" clicked'],
    ['34+56', '34+56', 'don\'t evaluate before "equal" button pushed'],
    ['34+56+', '34+56++++', 'display at most one operator at the end even if more were pushed'],
    ['34+56/', '34+56+-*/', 'display the last operator, if more than one operator was pushed'],
    ['90', '34+56=', 'add two numbers according to user input'],
    ['-22', '34-56=', 'subtract two numbers according to user input'],
    ['1904', '34*56=', 'multiply two numbers according to user input'],
    ['0.6071428571428571', '34/56=', 'divide two numbers according to user input'],
    ['9.5', '5+6*3/4=', 'perform sequence of computations according to user input'],
  ])('should display "%s" for input "%s" (%s)', (expectedOutput, input) => {
    // when
    click(...input);
    // then
    expectDisplayed(expectedOutput);
  });
});

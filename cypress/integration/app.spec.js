/// <reference types="cypress" />

describe('Calculator', () => {
  beforeEach(() => {
    cy.visit("http://localhost:5000/")
  })

  const testcases = [
    ['', '', 'display empty text by default'],
    ['123', '123', 'display number according to all digits that were pushed'],
    ['', '123C', 'display empty text after "C" clicked'],
    ['12+3', '12+3', 'don\'t evaluate before "equal" button pushed'],
    ['12+3+', '12+3++++', 'display at most one operator at the end even if more were pushed'],
    ['12+3/', '12+3+-*/', 'display the last operator, if more than one operator was pushed'],
    ['15', '12+3=', 'add two numbers according to user input'],
    ['9', '12-3=', 'subtract two numbers according to user input'],
    ['36', '12*3=', 'multiply two numbers according to user input'],
    ['4', '12/3=', 'divide two numbers according to user input'],
    ['2.5', '1+2*3/4=', 'perform sequence of computations according to user input'],
  ]
  for (const [expectedOutput, input, testName] of testcases){
    it(`should display "${expectedOutput}" for input "${input}" (${testName})`, () => {
      // when
      for (const char of input) {
        cy.get('.btn').contains(char).click()
      }

      // then
      cy.get('#display').should('have.value', expectedOutput)
    })
  }
})

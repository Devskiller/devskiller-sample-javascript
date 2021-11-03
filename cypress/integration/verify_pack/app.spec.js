/// <reference types="cypress" />

describe('verify_pack.Calculator', () => {
  beforeEach(() => {
    cy.visit("http://localhost:5000/")
  })

  const testcases = [
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

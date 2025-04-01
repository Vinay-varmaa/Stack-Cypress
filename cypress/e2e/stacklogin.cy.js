/// <reference types="cypress" />

describe('Login page', () => {
  beforeEach('The login page consists of',()=>{
    cy.visit("https://stage.stackenable.com")
  })
  it('Stack login page',()=>{
    cy.get("[alt = 'Stack Enable Logo']")
    cy.get("[class='loginInputs flex justify-content-center']").find("input").eq(0).type("wms.logisticsstudio@gmail.com")
    cy.get("[class='loginInputs flex justify-content-center']").find("input").eq(1).type("Test@1234").then(()=>{
      cy.log('Test failed : "Incorrect Password"')
      cy.screenshot("Incorrect Password")
    })
    cy.get(".p-button-label").click();
    cy.pathname('/home').then(()=>{
      cy.log('Test Passed : "Logged in Successfully"')
    })
  })
})
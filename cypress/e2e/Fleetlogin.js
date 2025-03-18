Cypress.on ('uncaught:exception', (err, runnable) => {
  return false;
});
describe('Login validation', () => {
  it('should successfully log in', () => {
    cy.visit('https://fe-qa.fleetenable.com/login')
    cy.get("input[placeholder='Enter Email or Mobile Number']").type('fe-qa@fleetenable.com')
    cy.get("input[type='password']").type('test1234')
    cy.get('button[type="submit"]').click()
  })
})
Cypress.on ('uncaught:exception', (err, runnable) =>
{
    return false;
});

describe('Create Fleet Order', () => {
    beforeEach('Login to the application', () => {
        cy.fleetlogin();
    });
    it('Create Delivery Order',()=> {
        cy.navigateToOrderModule();
    })
})

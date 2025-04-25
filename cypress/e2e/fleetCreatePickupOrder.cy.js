Cypress.on ('uncaught:exception', (err, runnable) =>
{
    return false;
});

describe('Create Fleet Order', () => {
    beforeEach('Login to the application', () => {
        cy.fleetlogin();
    });
    it('Create Pickup Order',()=> {
        cy.navigateToOrderModule();
        cy.selectOrderType(0);
        cy.selectLevelOfServiceForPickupOrder();
        cy.fillOrderPrimaryDetails();
        cy.fillReferenceNumbers();
        cy.fillConsigneeDetails();
        cy.addItem();
        cy.clickOnCreateOrder();

    })
})

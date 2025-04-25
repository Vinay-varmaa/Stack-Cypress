Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
});

describe('Create Fleet Order', () => {
    beforeEach('Login to the application', () => {
        cy.fleetlogin();
    });
    it('Create Move Order', () => {
        cy.navigateToOrderModule();
        cy.selectOrderType(4);
        cy.selectLevelOfServiceForPickupOrder();
        cy.fillOrderPrimaryDetails();
        cy.selectLevelOfServiceForTransferOrder();
        cy.fillOrderSecondaryDetails()
        cy.fillReferenceNumbers();
        cy.fillConsigneeDetails();
        cy.addItemForTransferOrder();
        cy.clickOnCreateOrder();
    })
})

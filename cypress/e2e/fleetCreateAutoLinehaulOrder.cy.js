Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
});

describe('Create Fleet Order', () => {
    beforeEach('Login to the application', () => {
        cy.fleetlogin();
    });
    it('Create Auto Linehaul Order', () => {
        cy.navigateToOrderModule();
        cy.selectOrderType(5);
        cy.selectLevelOfServiceForPickupOrder();
        cy.fillOrderPrimaryDetails();
        cy.selectLevelOfServiceForTransferOrder();
        cy.fillAutoLinehaulDetails();
        cy.fillReferenceNumbers();
        cy.fillConsigneeDetails();
        cy.addItemForTransferOrder();
        cy.clickOnCreateOrder();
        cy.checkTheLinehaulOrder();
    })
})

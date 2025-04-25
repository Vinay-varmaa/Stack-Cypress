Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
});

describe('Create Fleet Order', () => {
    beforeEach('Login to the application', () => {
        cy.fleetlogin();
    });
    it('Create Manual Linehaul Order', () => {
        cy.navigateToOrderModule();
        cy.selectOrderType(13);
        cy.selectOriginLevelOfServiceForLinehaulOrder()
        cy.selectDestinationLevelOfServiceForLinehaulOrder()
        cy.fillLinehaulOrderDetails();
        cy.fillReferenceNumbers();
        cy.fillConsigneeDetails();
        cy.wait(2000);
        // cy.addItemForTransferOrder();
        cy.clickOnCreateOrder();
    })
})

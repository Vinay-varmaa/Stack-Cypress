Cypress.on ('uncaught:exception', (err, runnable) =>
{
    return false;
});

describe('Create Fleet order' ,() => {
    beforeEach('The organization page performs',()=>{
        cy.fleetlogin('dt@fleetenable.com','test1234');
    })

    it('CreateOrder',()=>{
        cy.get("[class = 'menu-container']").find("li").eq(1).click();
        cy.get("[class='ant-row page-header']").find("button").eq(1).click();
        cy.get("[class='ant-select-selection-selected-value']").eq(2).type("SAN").click();
    })
})
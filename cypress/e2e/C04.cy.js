describe('create the inbound order and check the sync',() =>{
    beforeEach('Login into the application',() =>{
        cy.login("otay@yopmail.com","Test@1234");
        cy.get("[class='sidebar-full']").find("app-side-nav-option").find("a[href='/orders']").click();
        cy.pathname('/orders').then(() => {
            cy.log('Test Passed : "Navigated to the orders page"');
        });

    });
    it('Click on the Create order button ',()=>{
        cy.clickOnCreateInboundOrder();
        cy.enterTheRequiredFields();
    });
});


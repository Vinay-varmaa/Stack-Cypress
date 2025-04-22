describe('Validation of Shipper and Product Details in the Create Order', () => {
    beforeEach('Login into the application', () => {
        cy.login("dfw@yopmail.com", "Test@1234");
        cy.get("[class='sidebar-full']").find("app-side-nav-option").find("a[href='/orders']").click();
        cy.pathname('/orders').then(() => {
            cy.log('Test Passed : "Navigated to the orders page"');
        });
    });
    //C06 starts from here
    it('Get the shippers and the Respective Products', () => {
        cy.clickOnCreateInboundOrder();
        cy.selectCustomerAndProducts();
        cy.fixture('shipperAndProducts').then((data) => {
            cy.get("[class='sidebar-full']").find("app-side-nav-option").find("a[href='/products']").click();
            cy.get("[class='inputField formFields']").click();
            cy.get("[class='p-dropdown-filter-container ng-star-inserted']").type(data.shipperName).wait(2000);
            cy.get("[role='listbox']").find("li").eq(0).click().wait(2000);

            let productNames = [];

            cy.get("[class='p-element p-datatable-tbody']").find("tr").each(($row) => {
                cy.wrap($row).find("td").eq(1).invoke("text").then((productName) => {
                    productNames.push(productName.trim());
                });
            }).then(() => {
                cy.log(productNames);
                expect(productNames).to.deep.eq(data.productsList, 'Products matched');
            });
        });
    });

})
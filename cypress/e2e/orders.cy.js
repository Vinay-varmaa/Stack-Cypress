describe('Organizations page',()=> {
    beforeEach('The organization page performs', () => {
        cy.login('otay@yopmail.com', 'Test@1234')
        cy.get("[class='sidebar-full']").find("app-side-nav-option").find("a[href='/orders']").click();
        cy.pathname('/orders').then(() => {
            cy.log('Test Passed : "Navigated to the orders page"')
        })
    })
    it('search the order and navigate to the order', () => {
        cy.get("[class='tableHeaderFilters']").find("input").eq(0).type("10001746", {force: true});
        cy.wait(2000);
        cy.get("[class='p-element p-datatable-tbody']").find("a").then(($a) => {
            const number = $a.text();
            cy.log(`Test Passed : ${number}`);
            cy.get("[class='p-element p-datatable-tbody']").find("span").contains("Inbound").then(($span) => {
                const type = $span.text();
                cy.log(`Test Passed : ${type}`);

                if (number === "10001746") {
                    cy.wrap($a).eq(0).click();
                    cy.pathinclude('/orders/viewOrder').then(() => {
                        cy.log('Test Passed : "Navigated to the view order page"')
                    })
                } else {
                    cy.log('Test failed : "Order number not found"')
                }
            })
        })

    })
    //Receive the order with the new status
    it('Compare the order status and Receive the order', () => {
        cy.SearchOrder("10002692");
        cy.navigateToInboundOrder("10002692");
        cy.compareTheOrderStatus("NEW");
        cy.get("[placeholder='Enter Dock Number']").eq(0).type("1221");
        cy.get("[placeholder='Enter Truck Number']").eq(1).type("4321");
        cy.get("[class='listing-action-button ng-star-inserted']").find("i").click();
        cy.get("[class='product-id']").find("span").then(($span) => {
            const quantity = $span.text();
            cy.log(`Quantity: ${quantity}`);
            cy.get("input[placeholder='Enter Quantity']").type(quantity.trim(), {force: true})
        })
        cy.get("[class='inputField formFields']").eq(3).click()
        cy.get("[role='listbox']").find("li").eq(0).click();
        cy.wait(1000)
        cy.get("[class='inputField formFields']").eq(4).click(); // storage location dropdown
        cy.get("[role='listbox']").find("li").eq(2).click(); //Bin selection
        cy.wait(1000);
        cy.get("[class='save-button']").click();
        // cy.get("[class='tableCheckBox ng-star-inserted']").click();
        cy.get("[class='check_box_select checkBoxStyle']").click();
        cy.get("[class ='p-button-label']").click();
        cy.pathinclude('/orders/viewOrder').then(() => {

            cy.log('Test Passed : Order updated Successfully')
        })
    })
    //Dispatch the outbound order
    it.only('Dispatch the order',()=>{
        cy.SearchOrder("10002850");
        cy.navigateToOutboundboundOrder("10002850");
        cy.compareTheOrderStatus("New");
        cy.get("[class='check_box_select checkBoxStyle']").click();
        cy.get("[class ='p-button-label']").click();
        cy.pathinclude('/orders/viewOrder').then(() => {

            cy.log('Test Passed : Order updated Successfully');
            cy.wait(2000);
            cy.screenshot("Order Updated to Ready to Dispatch");
        })
        cy.SearchOrder("10002850");
        cy.navigateToOutboundboundOrder("10002850");
        const status = cy.compareTheOrderStatus("Ready to dispatch");
        console.log(status);
        cy.get("[placeholder='Enter Dock Number']").eq(0).type("1221");
        cy.get("[placeholder='Enter Truck Number']").eq(1).type("4321");
        cy.get("[class='check_box_select checkBoxStyle']").click();
        cy.get("[class ='p-button-label']").click();
        cy.pathinclude('/orders/viewOrder').then(() => {

            cy.log('Test Passed : Order updated Successfully')
        })
        cy.SearchOrder("10002850")
        cy.navigateToOutboundboundOrder("10002850");
        cy.compareTheOrderStatus("Dispatch")
    })
})

describe('Organizations page',()=>{
    beforeEach('The organization page performs',()=>{
        cy.visit("https://stage.stackenable.com/")
        cy.get("[alt = 'Stack Enable Logo']")
        cy.get("[class='loginInputs flex justify-content-center']").find("input").eq(0).type("otay@yopmail.com")
        cy.get("[class='loginInputs flex justify-content-center']").find("input").eq(1).type("Test@1234").then(()=>{
           cy.log('Test failed : "Incorrect Password"')
        })
        cy.get(".p-button-label").click();
        cy.pathname('/home').then(()=>{
        cy.log('Test Passed : "Logged in Successfully"')
        })
        cy.get("[class='sidebar-full']").find("app-side-nav-option").find("a[href='/orders']").click();
        cy.pathname('/orders').then(()=>{
            cy.log('Test Passed : "Navigated to the orders page"')
        })   
    })
    it('search the order and navigate to the order',()=>{
        cy.get("[class='tableHeaderFilters']").find("input").eq(0).type("10001746", {force:true});
        cy.wait(2000);
        cy.get("[class='p-element p-datatable-tbody']").find("a").then(($a)=>{
            const number = $a.text();
            cy.log(`Test Passed : ${number}`);
            cy.get("[class='p-element p-datatable-tbody']").find("span").contains("Inbound").then(($span)=>{
                    const type = $span.text();
                    cy.log(`Test Passed : ${type}`);
            
            if(number === "10001746"){
                cy.wrap($a).eq(0).click();
                cy.pathinclude('/orders/viewOrder').then(()=>{
                    cy.log('Test Passed : "Navigated to the view order page"')
                })
            }else
            {
                cy.log('Test failed : "Order number not found"')
            }
        })
        })

    })
    it.only('Compare the order status',()=>{
        cy.get("[class='tableHeaderFilters']").find("input").eq(0).type("10001746", {force:true});
        cy.wait(2000);
        cy.get("[class='p-element p-datatable-tbody']").find("a").then(($a)=>{
            const number = $a.text();
            cy.log(`Test Passed : ${number}`);
            cy.get("[class='p-element p-datatable-tbody']").find("span").contains("Inbound").then(($span)=>{
                    const type = $span.text();
                    cy.log(`Test Passed : ${type}`);
            
            if(number === "10001746"){
                cy.wait(2000);
                cy.wrap($a).eq(0).should('have.text','10001746').click({force: true});
                cy.pathinclude('/orders/viewOrder').then(()=>{
                    cy.log('Test Passed : "Navigated to the view order page"')
                })
            }else
            {
                cy.log('Test failed : "Order number not found"')
            }
        })
    })
    cy.get("[class='status-section flex']").find("div").contains("New").then(($div) => {
        const status = $div.text();
        cy.log(`Test Passed : ${status}`);
        if(status === "New"){
            cy.log('Test Passed : "Status is New"').then()
        }
    }); 
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
        cy.get("[class='inputField formFields']").eq(4).click(); // storage location dropdown
        cy.get("[role='listbox']").find("li").eq(2).click(); //Bin selection
        cy.get("[class='save-button']").click();

    })
})
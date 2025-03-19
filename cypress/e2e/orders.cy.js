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
    it('search the order with order number',()=>{
        cy.get("[class='tableHeaderFilters']").find("input").eq(0).type("10001746", {force:true});
        cy.wait(2000);
        cy.get("[class='p-element p-datatable-tbody']").find("a").then(($a)=>{
            const number = $a.text();
            cy.log(`Test Passed : ${number}`);
            cy.get("[class='p-element p-datatable-tbody']").find("span").contains("Inbound").then(($span)=>{
                    const type = $span.text();
                    cy.log(`Test Passed : ${type}`);
            
            if(number === "10001746"){
                cy.wrap($a).click();
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
})
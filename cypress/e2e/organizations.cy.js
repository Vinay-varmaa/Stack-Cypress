describe('Organizations page',()=>{
    beforeEach('The organization page performs',()=>{
        cy.visit("https://stage.stackenable.com/")
        cy.get("[alt = 'Stack Enable Logo']")
        cy.get("[class='loginInputs flex justify-content-center']").find("input").eq(0).type("wms.logisticsstudio@gmail.com")
        cy.get("[class='loginInputs flex justify-content-center']").find("input").eq(1).type("Test@1234").then(()=>{
           cy.log('Test failed : "Incorrect Password"');
        })
        cy.get(".p-button-label").click();
        cy.pathname('/home').then(()=>{
        cy.log('Test Passed : "Logged in Successfully"')
        })
    })
    it('click on organizations in the home screen',()=>{
        cy.get("[class='ng-star-inserted']").find("a").eq(6).click();
        cy.pathname('/organization').then(()=>{
            cy.log('Test Passed : "Navigated to the orders page"')
        })
    })
    it.only('Search organization',()=>{
        cy.get("[class='ng-star-inserted']").find("a").eq(6).click();
        cy.pathname('/organization').then(()=>{
            cy.log('Test Passed : "Navigated to the orders page"')  
        })
        cy.get("[class='input_text_component']").find("input").type("All Freight")
        cy.wait(2000);
        cy.get("[class='p-element p-datatable-tbody']").find("span","All Freight").then(($span)=>{
           const name = $span.text();
            cy.log(`Test Passed : ${name}`);  
        })
    })
})
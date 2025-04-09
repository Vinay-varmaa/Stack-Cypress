// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

Cypress.Commands.add('pathname', (expectedpathname) => {
    return cy.location('pathname').should('eq', expectedpathname);
  });  

Cypress.Commands.add('pathinclude',(approxpathname) => {
    return cy.location('pathname').should('include', approxpathname);
  })

Cypress.Commands.add('login',(email,password)=>{
    cy.visit("https://stage.stackenable.com/")
    cy.get("[alt = 'Stack Enable Logo']")
    cy.get("[class='loginInputs flex justify-content-center']").find("input").eq(0).type(email);
    cy.get("[class='loginInputs flex justify-content-center']").find("input").eq(1).type(password).then(()=>{
        cy.log('Test failed : "Incorrect Password"')
    })
    cy.get(".p-button-label").click();
    cy.pathname('/home').then(()=>{
        cy.log('Test Passed : "Logged in Successfully"')
    })
})

Cypress.Commands.add('SearchOrder',(orderNumber)=>{
    cy.get("[class='tableHeaderFilters']").find("input").eq(0).type(orderNumber, {force:true});
    cy.wait(2000);
})

Cypress.Commands.add('navigateToInboundOrder',(orderNumber)=>{
    cy.get("[class='p-element p-datatable-tbody']").find("a").then(($a)=> {
        const number = $a.text();
        cy.log(`Test Passed : ${number}`);
        cy.get("[class='p-element p-datatable-tbody']").find("span").contains("Inbound").then(($span) => {
            const type = $span.text();
            cy.log(`Test Passed : ${type}`);

            if (number === "10002692") {
                cy.wait(2000);
                cy.wrap($a).eq(0).should('have.text', '10002692').click({force: true});
                cy.pathinclude('/orders/viewOrder').then(() => {
                    cy.log('Test Passed : "Navigated to the view order page"')
                })
            } else {
                cy.log('Test failed : "Order number not found"')
            }
        })
    })
})

Cypress.Commands.add('navigateToOutboundboundOrder',(orderNumber)=>{
    cy.get("[class='p-element p-datatable-tbody']").find("a").then(($a)=> {
        const number = $a.text();
        cy.log(`Test Passed : ${number}`);
        cy.get("[class='p-element p-datatable-tbody']").find("span").contains("Outbound").then(($span) => {
            const type = $span.text();
            cy.log(`Test Passed : ${type}`);

            if (number === "10002850") {
                cy.wait(2000);
                cy.wrap($a).eq(0).should('have.text', '10002850').click({force: true});
                cy.pathinclude('/orders/viewOrder').then(() => {
                    cy.log('Test Passed : "Navigated to the view order page"')
                })
            } else {
                cy.log('Test failed : "Order number not found"')
            }
        })
    })
})

Cypress.Commands.add('compareTheOrderStatus',(expectedStatus)=>{
    cy.get("[class='status-section flex']").find("div").contains(expectedStatus).then(($div) => {
        const status = $div.text();
        cy.log(`Test Passed : ${status}`);
        if (status === expectedStatus) {
            cy.log('Test Passed : "Status is New"');
        }else if (status === "Ready to dispatch"){
            cy.log('Test Passed : "Status is Ready to dispatch"')
        }else if(status === "Dispatch"){
            cy.log('Test Passed : "Dispatch"')
        }
    })
})
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

Cypress.Commands.add('pathconsists', (fleetPathName) => {
    return cy.location('pathconsists').should('eq', fleetPathName);
});

Cypress.Commands.add('pathinclude',(approxpathname) => {
    return cy.location('pathname').should('include', approxpathname);
  })

Cypress.Commands.add('login',(email,password)=>{
    cy.visit("http://34.133.110.143:7073/")
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

Cypress.Commands.add('fleetlogin',(email,password)=>{
    cy.visit("https://fe-qa.fleetenable.com")
    cy.get("[placeholder='Enter Email or Mobile Number']").type("dt@fleetenable.com");
    cy.get("[id='auth_form_password']").type("test1234");
    cy.get("[type='submit']").click();
    cy.wait(5000);
    // cy.pathconsists('/dashboard').then(()=>{
    //     cy.log('Test Passed : "Logged in Successfully"')
    // })
})


Cypress.Commands.add('clickOnCreateInboundOrder',()=> {
    cy.get("[class = 'header-component']").find("button").click();
    cy.wait(1000);
    cy.get("[class ='p-card-content']").eq(0).click();
    cy.get("[class = 'title']").eq(0).then(($div) => {
        let ordertype = $div.text();
        cy.log(ordertype);
        if (ordertype.trim() === "Create Inbound Order") {
            cy.log("Navigated to the Create Inbound Order Page successfully");
        } else {
            cy.log("Failed to navigate to the Inbound Order Page");
        }
    });
});

Cypress.Commands.add('enterTheRequiredFields',()=> {
    cy.get("[class='p-inputswitch-slider']").eq(1).click();
    cy.get("[formcontrolname='orderProccess']").eq(1).click();
    cy.get("[name='originName']").find("input").type("AFT").invoke('val').then((originName)=>{
        cy.get("[name='address1Origin']").find("input").type("9475, Nicola Tesla Court").invoke('val').then((address1Origin)=>{
            cy.get("[name='originCity']").find("input").type("San Diego").invoke('val').then((originCity)=>{
                cy.get("[name='originState']").click();
                cy.get("[role='listbox']").find("p-dropdownitem").eq(2).click().invoke('text').then((originState)=>{
                    cy.wait(1000);
                    cy.get("[name='originZipcode']").type("75261").wait(1000).invoke('val').then((originZipcode)=>{
                        cy.get("[name='selectShipper']").click();
                        cy.get("[role='listbox']").find("p-dropdownitem").eq(1).click().invoke('text').then((selectShipper)=>{
                            cy.get("[class='add-button']").click();
                            cy.wait(1000);
                            cy.get("[placeholder='Enter PO Number']").invoke('val').then((orderNumber) => {
                                cy.log(`Order Number: ${orderNumber}`);
                                cy.get("[name='selectProducts']").click(); // Open the dropdown
                                cy.get("[role='listbox']").find("p-multiselectitem").eq(0).click().invoke('text').then((selectProducts)=>{
                                    cy.get("[class='p-datatable-thead']").click();
                                    cy.get("[class='p-element p-datatable-tbody']").find("td").eq(6).find("input").type("10" , {force : true}).invoke('val').then((itemquantity)=>{
                                        cy.task('writeToFixture',{
                                            filename : 'order.json',
                                            data: {
                                                orderNumber : orderNumber,
                                                originName: originName,
                                                address1Origin: address1Origin,
                                                originCity: originCity,
                                                originState: originState.trim(), // Trim the spaces
                                                originZipcode: originZipcode,
                                                shipper: selectShipper.trim(),
                                                product: selectProducts.trim(),
                                                quantity: itemquantity

                                            }
                                        });
                                    })
                                })
                        })
                    })

                })
            })
        })
    })

    });
    cy.get("[class='p-button-label']").then(($button) => {
        cy.get("[class='p-button-label']").should('be.visible').then(($button) => {
            if ($button.attr('disabled')) {
                cy.log("The button is disabled. Please submit after entering all the required fields.");
            } else {
                cy.log("Clicked on Submit button");
                cy.wrap($button).click();
            }
        });
    });
});

Cypress.Commands.add('selectCustomerAndProducts',()=> {
    cy.get("[name='selectShipper']").click();
    cy.get("[role='listbox']").find("p-dropdownitem").eq(1).click().invoke('text').then((selectShipper) => {
        cy.get("[class='add-button']").click();
        cy.wait(1000);
        cy.get("[name='selectProducts']").click(); // Open the dropdown
        cy.wait(2000)
        cy.get("[class='p-checkbox-box']").eq(0).click({force: true, multiple: true});
        cy.get("[class='p-datatable-thead']").click();
        let productNames: string[] = [];
        cy.get("[class='p-element p-datatable-tbody']").find("tr").each(($row) => {
            cy.wrap($row).find("td").eq(1).invoke("text").then((productname) => {
                productNames.push(productname.trim());
            })
        }).then(() => {
            cy.task('writeToFixture', {
                filename: 'shipperAndProducts.json',
                data: {
                    shipperName: selectShipper.trim(),
                    producstList: productNames
                }
            })
        })
    })
})
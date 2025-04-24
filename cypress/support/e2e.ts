// Import commands.js using ES2015 syntax:
import './commands'

Cypress.Commands.add('pathname', (expectedpathname) => {
    return cy.location('pathname').should('eq', expectedpathname);
});


Cypress.Commands.add('login', (email, password) => {
    cy.visit("http://34.133.110.143:7073/")
    cy.get("[alt = 'Stack Enable Logo']")
    cy.get("[class='loginInputs flex justify-content-center']").find("input").eq(0).type(email);
    cy.get("[class='loginInputs flex justify-content-center']").find("input").eq(1).type(password).then(() => {
    })
    cy.get(".p-button-label").click();
    cy.pathname('/home').then(() => {
        cy.log('Test Passed : "Logged in Successfully"')
    })
})

Cypress.Commands.add('SearchOrder', (orderNumber) => {
    cy.get("[class='tableHeaderFilters']").find("input").eq(0).type(orderNumber, {force: true});
    cy.wait(2000);
})

Cypress.Commands.add('navigateToInboundOrder', (orderNumber) => {
    cy.get("[class='p-element p-datatable-tbody']").find("a").then(($a) => {
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

Cypress.Commands.add('navigateToOutboundboundOrder', (orderNumber) => {
    cy.get("[class='p-element p-datatable-tbody']").find("a").then(($a) => {
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

Cypress.Commands.add('compareTheOrderStatus', (expectedStatus) => {
    cy.get("[class='status-section flex']").find("div").contains(expectedStatus).then(($div) => {
        const status = $div.text();
        cy.log(`Test Passed : ${status}`);
        if (status === expectedStatus) {
            cy.log('Test Passed : "Status is New"');
        } else if (status === "Ready to dispatch") {
            cy.log('Test Passed : "Status is Ready to dispatch"')
        } else if (status === "Dispatch") {
            cy.log('Test Passed : "Dispatch"')
        }
    })
})

Cypress.Commands.add('fleetlogin', () => {
    cy.fixture('logins.json').then((data) => {
        cy.visit("https://uitabs.fleetenable.com")
        cy.get("[placeholder='Enter Email or Mobile Number']").type(data.Email);
        cy.get("[id='auth_form_password']").type(data.Passwords)
        cy.get("[type='submit']").click();
        cy.wait(5000);
        cy.pathname('/dashboard').then(() => {
            cy.log('Test Passed : "Logged in Successfully"')
        })
    })
})


Cypress.Commands.add('clickOnCreateInboundOrder', () => {
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

Cypress.Commands.add('enterTheRequiredFields', () => {
    cy.get("[class='p-inputswitch-slider']").eq(1).click();
    cy.get("[formcontrolname='orderProccess']").eq(1).click();
    cy.get("[name='originName']").find("input").type("AFT").invoke('val').then((originName) => {
        cy.get("[name='address1Origin']").find("input").type("9475, Nicola Tesla Court").invoke('val').then((address1Origin) => {
            cy.get("[name='originCity']").find("input").type("San Diego").invoke('val').then((originCity) => {
                cy.get("[name='originState']").click();
                cy.get("[role='listbox']").find("p-dropdownitem").eq(2).click().invoke('text').then((originState) => {
                    cy.wait(1000);
                    cy.get("[name='originZipcode']").type("75261").wait(1000).invoke('val').then((originZipcode) => {
                        cy.get("[name='selectShipper']").click();
                        cy.get("[role='listbox']").find("p-dropdownitem").eq(1).click().invoke('text').then((selectShipper) => {
                            cy.get("[class='add-button']").click();
                            cy.wait(1000);
                            cy.get("[placeholder='Enter PO Number']").invoke('val').then((orderNumber) => {
                                cy.log(`Order Number: ${orderNumber}`);
                                cy.get("[name='selectProducts']").click(); // Open the dropdown
                                cy.get("[role='listbox']").find("p-multiselectitem").eq(0).click().invoke('text').then((selectProducts) => {
                                    cy.get("[class='p-datatable-thead']").click();
                                    cy.get("[class='p-element p-datatable-tbody']").find("td").eq(6).find("input").type("10", {force: true}).invoke('val').then((itemquantity) => {
                                        cy.task('writeToFixture', {
                                            filename: 'order.json',
                                            data: {
                                                orderNumber: orderNumber,
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

Cypress.Commands.add('ValidateProducts', () => {
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
                filename: 'Products.json',
                data: {
                    shipperName: selectShipper.trim(),
                    producstList: productNames
                }
            })
        })
    })
})

Cypress.Commands.add('validationShippers', () => {
    let shippernames: string[] = [];
    cy.get("[name='selectShipper']").click();
    cy.get("[role='listbox']").find("li").each(($shipper) => {
        cy.wrap($shipper).find("span").invoke("text").then((shippername) => {
            shippernames.push(shippername.trim());
        })
    }).then(() => {
        cy.task('writeToFixture', {
            filename: 'Shippers.json',
            data: {
                shipperName: shippernames
            }
        })
    })
})

Cypress.Commands.add('navigateToOrderModule', () => {
    cy.get("[class = 'menu-container']").find("li").eq(1).click();
    cy.get("[class='ant-row page-header']").find("button").eq(0).click().wait(1000);
    cy.get("[class='modal-header']").find("span").invoke("text").then(($popup) => {
        let dialogBox;
        dialogBox = $popup.trim();
        cy.log(dialogBox);
    })
    cy.get("[class='ant-col ant-col-8']").eq(1).click()
    cy.pathname('/orders/create').then(() => {
        cy.log("Navigated to Create Page Order");
    })
    cy.get("[class='create-order-heading-text']").then(($span) => {
        const name = $span.text();
        cy.log(name);
        if (name === 'Create Delivery Order') {
            cy.log("Navigated to the Create Delivery Order")
        } else {
            cy.log("Unable to Navigate to the Create Delivery Order")
        }
        expect(name).to.eq("Create Delivery Order")
    })
    cy.fixture('orders/deliveryOrderDetails.json').then((data) => {
        cy.get("[id='0_D_los_code']").eq(0).type(data.LOS).wait(1000).click();
        // cy.get("[class='location_heading']").click();
        cy.get("[class='address_location_innerContainer table-col']").find("button").click();
        cy.get("[class='ant-row address-form-v2']").find("input").eq(0).type(data.AddressLine1);
        cy.get("[class='ant-row address-form-v2']").find("input").eq(1).type(data.AddressLine2);
        cy.get("[class='ant-row address-form-v2']").find("input").eq(2).type(data.City);
        cy.get("[class='ant-row address-form-v2']").find("input").eq(3).type(data.State);
        cy.get("[class='ant-row address-form-v2']").find("input").eq(4).type(data.Zip);
        cy.get("[class='ant-row address-form-v2']").find("input").eq(5).type(data.Country);
        cy.get("[class='ant-modal-footer']").find("button").eq(1).click();//Click on Add Address
        // cy.get("[class='ant-card-extra']").find("button").eq(2).click().wait(2000);
        // cy.get("[class='ant-table-tbody']").find("tr");
        cy.get("[name='hawb']").type(data.HAWB);
        cy.get("[class='create-order-sidebar']").find("button").eq(1).click();
        cy.get("[class='chip']").invoke("text").then(($status) => {
            const Status = $status.trim();
            cy.log(Status);
            if (Status === 'NEW') {
                cy.log("Delivery Order Created Sucessfully")
            } else {
                cy.log("Delivery Order is not created ")
            }
            expect(Status).to.eq('NEW', 'Delivery order in Fleet is Created Successfully')
        })
    })
});
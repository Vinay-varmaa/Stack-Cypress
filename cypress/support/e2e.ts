import './commands'

Cypress.Commands.add('pathname', (expectedpathname) => {
    return cy.location('pathname').should('eq', expectedpathname);
});


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


Cypress.Commands.add('navigateToOrderModule', () => {
    cy.get("[class = 'menu-container']").find("li").eq(1).click();
    cy.pathname('/orders');
    cy.log("Navigated to Orders Module Successfully");
})


Cypress.Commands.add('selectOrderType', (Index) => {
    cy.get("[class='ant-row page-header']").find("button").eq(0).click().wait(1000);
    cy.get("[class='modal-header']").find("span").invoke("text").then(($popup) => {
        let dialogBox;
        dialogBox = $popup.trim();
        cy.log(dialogBox);
    })
    cy.get("[class='ant-col ant-col-8']").eq(Index).click();  //Click on the Required Order type  0.Pickup order ,1.Delivery Order,
    cy.pathname('/orders/create').then(() => {
        cy.log("Navigated to Create Page Order");
        cy.get("[class='create-order-heading-text']").then(($span) => {
            const name = $span.text();
            cy.log(name);
        })
    })
})

Cypress.Commands.add('selectLevelOfServiceForDeliveryOrder', () => {
    cy.fixture('orders/orderDetails.json').then((data) => {
        cy.get("[id='0_D_los_code']").eq(0).type(data.LOS).wait(1000).click();
    })
})


Cypress.Commands.add('fillReferenceNumbers', () => {
    cy.fixture('orders/orderDetails.json').then((data) => {
        cy.get("[name='hawb']").type(data.HAWB);
        cy.get("[name='mawb']").type(data.MAWB);
        cy.get("[class='RefNumbersContainer']").find("i").click();
        cy.get("[name='reference_1']").type(data.Reference1);
        cy.get("[name='reference_2']").type(data.Reference2);
    })
})

Cypress.Commands.add('fillConsigneeDetails', () => {
    cy.fixture('orders/orderDetails.json').then((data) => {
        cy.get("[class='ant-row create-consignee-details-tab']").find("span").eq(0).type(data.ConsigneeAddress);
        cy.get("[id='phone-form-control']").eq(0).type(data.ConsigneeContact);
        cy.get("[name='first_name']").eq(0).type(data.ConsigneeContactName);

    })
})

Cypress.Commands.add('addItem', () => {
    cy.fixture('orders/orderDetails.json').then((data) => {
        cy.get("[class='ant-card card-container']").find("button").eq(2).click();
        cy.get("[class='ant-table-tbody']").find("td").eq(1).type(data.ItemName);
    })
})

Cypress.Commands.add('addItemForTransferOrder', () => {
    cy.fixture('orders/orderDetails.json').then((data) => {
        cy.get("[class='ant-card card-container']").find("button").eq(4).click();
        cy.get("[class='ant-table-tbody']").find("td").eq(1).type(data.ItemName);
    })
})


Cypress.Commands.add('clickOnCreateOrder', () => {
    cy.get("[class='create-order-sidebar']").find("button").eq(1).click();
    cy.wait(3000);
    cy.get("[class='chip']").invoke("text").then(($status) => {
        const Status = $status.trim();
        cy.log(Status);
        if (Status === 'NEW') {
            cy.log("Order Created Sucessfully")
        } else {
            cy.log("Order is not created ")
        }
        expect(Status).to.eq('NEW', 'order in Fleet is Created Successfully')
    })
})


Cypress.Commands.add('selectLevelOfServiceForPickupOrder', () => {
    cy.fixture('orders/orderDetails.json').then((data) => {
        cy.get("[id='0_R_los_code']").eq(0).type(data.LOS).wait(1000).click();
    })
})

Cypress.Commands.add('selectLevelOfServiceForTransferOrder', () => {
    cy.fixture('orders/orderDetails.json').then((data) => {
        cy.get("[id='1_D_los_code']").eq(0).type(data.LOS).wait(1000).click();
    })
})

Cypress.Commands.add('selectOriginLevelOfServiceForLinehaulOrder', () => {
    cy.fixture('orders/orderDetails.json').then((data) => {
        cy.get("[id='0_ORN_los_code']").eq(0).type(data.LOS).wait(1000).click();
    })
})

Cypress.Commands.add('selectDestinationLevelOfServiceForLinehaulOrder', () => {
    cy.fixture('orders/orderDetails.json').then((data) => {
        cy.get("[id='1_DST_los_code']").eq(0).type(data.LOS).wait(1000).click();
    })
})


Cypress.Commands.add('fillOrderPrimaryDetails', () => {
    cy.fixture('orders/orderDetails.json').then((data) => {
        cy.get("[class='address_location_innerContainer table-col']").find("button").eq(0).click();
        cy.get("[class='ant-row address-form-v2']").find("input").eq(0).type(data.AddressLine1);
        cy.get("[class='ant-row address-form-v2']").find("input").eq(1).type(data.AddressLine2);
        cy.get("[class='ant-row address-form-v2']").find("input").eq(2).type(data.City);
        cy.get("[class='ant-row address-form-v2']").find("input").eq(3).type(data.State);
        cy.get("[class='ant-row address-form-v2']").find("input").eq(4).type(data.Zip);
        cy.get("[class='ant-row address-form-v2']").find("input").eq(5).type(data.Country);
        cy.get("[class='ant-modal-footer']").find("button").eq(1).click();
    })
})

Cypress.Commands.add('fillOrderSecondaryDetails', () => {
    cy.fixture('orders/orderDetails.json').then((data) => {
        cy.get("[class='address_location_innerContainer table-col']").find("button").eq(0).click();
        cy.get("[class='ant-row address-form-v2']").find("input").eq(12).type(data.AddressLine1);
        cy.get("[class='ant-row address-form-v2']").find("input").eq(13).type(data.AddressLine2);
        cy.get("[class='ant-row address-form-v2']").find("input").eq(14).type(data.City);
        cy.get("[class='ant-row address-form-v2']").find("input").eq(15).type(data.State);
        cy.get("[class='ant-row address-form-v2']").find("input").eq(16).type(data.Zip);
        cy.get("[class='ant-row address-form-v2']").find("input").eq(17).type(data.Country);
        cy.get("[class='ant-modal-footer']").find("button").eq(3).click();
    })
})

Cypress.Commands.add('fillLinehaulOrderDetails', () => {
    cy.fixture('orders/lineHaulDetails.json').then((data) => {
        cy.get("[class='address_location_innerContainer table-col']").find("button").eq(0).click();
        cy.get("[class='ant-row address-form-v2']").find("input").eq(0).type(data.AddressLine1);
        cy.get("[class='ant-row address-form-v2']").find("input").eq(1).type(data.AddressLine2);
        cy.get("[class='ant-row address-form-v2']").find("input").eq(2).type(data.City);
        cy.get("[class='ant-row address-form-v2']").find("input").eq(3).type(data.State);
        cy.get("[class='ant-row address-form-v2']").find("input").eq(4).type(data.Zip);
        cy.get("[class='ant-row address-form-v2']").find("input").eq(5).type(data.Country);
        cy.get("[class='ant-modal-footer']").find("button").eq(1).click();
    })
})


// Cypress.Commands.add('')
//                 cy.get("[class='create-order-sidebar']").find("button").eq(1).click();
//                 // if(cy.get("[class='ant-modal-confirm-btns']").)
//
//                     cy.log("")
//                 })
//             })
//         } else {
//             cy.fixture('orders/orderDetails.json').then((data) => {
//                 cy.get("[id='0_D_los_code']").eq(0).type(data.LOS).wait(1000).click();
//                 // cy.get("[class='location_heading']").click();
//                 cy.get("[class='address_location_innerContainer table-col']").find("button").click();
//                 cy.get("[class='ant-row address-form-v2']").find("input").eq(0).type(data.AddressLine1);
//                 cy.get("[class='ant-row address-form-v2']").find("input").eq(1).type(data.AddressLine2);
//                 cy.get("[class='ant-row address-form-v2']").find("input").eq(2).type(data.City);
//                 cy.get("[class='ant-row address-form-v2']").find("input").eq(3).type(data.State);
//                 cy.get("[class='ant-row address-form-v2']").find("input").eq(4).type(data.Zip);
//                 cy.get("[class='ant-row address-form-v2']").find("input").eq(5).type(data.Country);
//                 cy.get("[class='ant-modal-footer']").find("button").eq(1).click();//Click on Add Address
//                 // cy.get("[class='ant-card-extra']").find("button").eq(2).click().wait(2000);
//                 // cy.get("[class='ant-table-tbody']").find("tr");
//                 cy.get("[name='hawb']").type(data.HAWB);
//                 cy.get("[class='create-order-sidebar']").find("button").eq(1).click();
//                 cy.get("[class='chip']").invoke("text").then(($status) => {
//                     const Status = $status.trim();
//                     cy.log(Status);
//                     if (Status === 'NEW') {
//                         cy.log("Delivery Order Created Sucessfully")
//                     } else {
//                         cy.log("Delivery Order is not created ")
//                     }
//                     expect(Status).to.eq('NEW', 'Delivery order in Fleet is Created Successfully')
//                 })
//             })
//         }
//     })
// });
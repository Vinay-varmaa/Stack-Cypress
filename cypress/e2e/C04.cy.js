describe('create the inbound order in stack', () => {
    beforeEach('Login into the application', () => {
        cy.login("dfw@yopmail.com", "Test@1234");
        cy.get("[class='sidebar-full']").find("app-side-nav-option").find("a[href='/orders']").click();
        cy.pathname('/orders').then(() => {
            cy.log('Test Passed : "Navigated to the orders page"');
        });
    });
    //C04
    it('Click on the Create order button ', () => {
        cy.clickOnCreateInboundOrder();
        cy.enterTheRequiredFields();
        // cy.pathname('/viewOrder').then(() => {
        //     cy.log('Test Passed : "Navigated to the orders page"');
        // });
        cy.fixture('orderDetails.json').then((data) => {
            cy.log(`order number from fixture : ${data.orderNumber}`)
            cy.SearchOrder(data.orderNumber);
            cy.get("[class='p-element p-datatable-tbody']").find("a").then(($a) => {
                const number = $a.text();
                cy.log(number);
                if (number === data.orderNumber) {
                    cy.log("C04 passed and the order created successfully")
                } else {
                    cy.log("C04 Failed")
                }
                cy.wrap($a).eq(0).click();
                cy.wait(1000);
                //C05
                cy.log("C05 Starts from here")
                cy.get("[class='card-item-value shipper-name']").eq(0).should('contain', data.shipper).invoke("text").then((shipperName) => {
                    shipperName = shipperName.trim();
                    cy.log(shipperName);
                    expect(shipperName).to.eq(data.shipper, "Shipper name is  in sync");
                })
                cy.get("[class='card-item-value']").eq(0).should('contain', data.orderNumber).invoke("text").then((orderNumber) => {
                    orderNumber = orderNumber.trim();
                    cy.log(orderNumber);
                    expect(orderNumber).to.eq(data.orderNumber, "order number is  in sync");
                })
                cy.get("[class='organization-name']").eq(0).should('contain', data.originName).invoke('text').then((originName) => {
                    originName = originName.trim();
                    cy.log(originName);
                    expect(originName).to.eq(data.originName, "origin name is in sync");
                })
                cy.get("[class='address']").should('contain', data.address1Origin).wait(1000).invoke('text').then((address1Line) => {
                    address1Line = address1Line.trim();
                    cy.log(address1Line);
                })
                //     .should('contain', data.originCity).invoke('text').then((city) => {
                //     city = city.trim();
                //     cy.log(city);
                //     if (city !== data.originCity) {
                //         cy.log("City  is not in sync")
                //     } else {
                //         cy.log("City matched successfully");
                //     }
                // })
                //     .should('contain', data.originZipcode).invoke('text').then((zipcode) => {
                //     zipcode = zipcode.trim();
                //     cy.log(zipcode);
                //     if (zipcode !== data.originZipcode) {
                //         cy.log("zipcode  is not in sync")
                //     } else {
                //         cy.log("zipcode matched successfully");
                //     }
                // })
                cy.get("[class='p-element p-datatable-tbody']").find("td").eq(3).should('contain', data.product).invoke('text').then((item) => {
                    item = item.trim("");
                    cy.log(item);
                    expect(item).to.eq(data.product, "product is in sync");
                })
                cy.get("[class='p-element p-datatable-tbody']").find("td").eq(5).should('contain', data.quantity).invoke('text').then((quantity) => {
                    quantity = quantity.trim();
                    cy.log(quantity);
                    expect(quantity).to.eq(data.quantity, "quantity is in sync");
                });
            });
        });
    });
});


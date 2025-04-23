describe('Validation of Shipper and Product Details in the Create Order', () => {
    beforeEach('Login into the application', () => {
        cy.login("dfw@yopmail.com", "Test@1234");
        cy.get("[class='sidebar-full']").find("app-side-nav-option").find("a[href='/orders']").click();
        cy.pathname('/orders').then(() => {
            cy.log('Test Passed : "Navigated to the orders page"');
        });
    });
    //C06 starts from here
    it('Get the shippers Respective Products', () => {
        cy.clickOnCreateInboundOrder();
        cy.ValidateProducts();
        cy.fixture('Products').then((data) => {
            cy.get("[class='sidebar-full']").find("app-side-nav-option").find("a[href='/products']").click();
            cy.get("[class='inputField formFields']").click();
            cy.wait(1000)
            cy.get("[class='p-dropdown-filter-container ng-star-inserted']").type(data.shipperName).wait(2000);
            cy.get("[role='listbox']").find("li").eq(0).click().wait(2000);

            let productNames = [];

            cy.get("[class='p-element p-datatable-tbody']").find("tr").each(($row) => {
                cy.wrap($row).find("td").eq(1).then(($ExactName) => {
                    cy.wrap($ExactName).find("span").eq(3).invoke("text").then((productName) => {
                        productNames.push(productName.trim());
                        cy.log(productNames)
                        cy.log("Collected Products:", JSON.stringify(productNames));
                    });
                })
            }).then(() => {
                //     cy.log(productNames);
                const sortedProducts = data.producstList.sort();
                expect(JSON.stringify(productNames.sort())).to.deep.equal(JSON.stringify(sortedProducts), 'Products matched');
                cy.log("All the Products are related to the respective shipper")
            });
        });
    });
    it('Get the Respective Shippers of the Carriers', () => {
        cy.clickOnCreateInboundOrder();
        cy.validationShippers();
        cy.fixture('Shippers').then((data) => {
            cy.get("[class='sidebar-full']").find("app-side-nav-option").find("a[href='/shipper']").click();
            let shipperNames = [];
            cy.get("[class='p-element p-datatable-tbody']").find("tr").each(($row) => {
                cy.wrap($row).find("td").eq(1).then(($ExactName) => {
                    cy.wrap($ExactName).find("span").eq(1).invoke("text").then((shipperName) => {
                        shipperNames.push(shipperName.trim());
                        cy.log(shipperNames)
                        cy.log("Collected shippers:", JSON.stringify(shipperNames));
                    })
                });
            }).then(() => {
                const sortedShippers = data.shipperName.sort();
                expect(JSON.stringify(shipperNames.sort())).to.deep.equal(JSON.stringify(sortedShippers), 'Shippers matched');
                cy.log("All the Shippers are related to the respective Carrier")

            })
        })
    });


})
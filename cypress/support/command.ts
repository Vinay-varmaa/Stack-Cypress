declare namespace Cypress {
    interface Chainable {
        pathname(): Chainable<string>;
        pathconsists(): Chainable<boolean>;
        pathinclude(substring: string): Chainable<boolean>;
        login(email: string, password: string): Chainable<void>;
        SearchOrder(orderNumber: string): Chainable<void>;
        navigateToInboundOrder(): Chainable<void>;
        navigateToOutboundOrder(): Chainable<void>;
        compareTheOrderStatus(expectedStatus: string): Chainable<void>;
        enterTheRequiredFields(): Chainable<void>;
    }
}
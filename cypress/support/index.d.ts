declare namespace Cypress {
    interface Chainable<Subject = any> {
        clickOnCreateInboundOrder(): void

        fleetlogin(email: any, password: any): void

        navigateToOutboundboundOrder(orderNumber: any): void

        order(): void

        order(): void

        ValidateProducts(): void


        validationShippers(): void

        navigateToOrderModule(): void

        selectOrderType(Index: any): void

        selectLevelOfService(): void

        fillReferenceNumbers(): void

        fillConsigneeDetails(): void

        addItem(): void

        clickOnCreateOrder(): void

        selectLevelOfServiceForDeliveryOrder(): void

        fillOrderPrimaryDetails(): void

        fillOrderSecondaryDetails(): void

        fillDeliveryOrderPrimaryDetails(): void

        selectLevelOfServiceForTransferPickupOrder(): void

        addItemForTransferOrder(): void

        selectOriginLevelOfServiceForLinehaulOrder(): void

        selectDestinationLevelOfServiceForLinehaulOrder(): void

        selectLevelOfServiceForTransferOrder(): void

        selectLevelOfServiceForPickupOrder(): void

        fillLinehaulOrderDetails(): void
    }
}
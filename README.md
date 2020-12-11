# braintreeTutorial

## How to use:
1. npm install
2. npm start
3. visit localhost:3000 on your browser
4. input card number, etc. and click `pay`
5. F12 to check the network and if succes, in the browser console will print the transaction id, then you can check it in the Braintree cli
https://sandbox.braintreegateway.com/login


if you wish to catch the requests

add below codes into ./node_modules/braintree/lib/braintree/environment.js

````
    this.Pipedream = new Environment('3af1da340a4aed83d7e75043a352b917.m.pipedream.net', '443', 'https://auth.venmo.com', true, '3af1da340a4aed83d7e75043a352b917.m.pipedream.net', '443');
````

and update checkout.js like so

````
    var gateway = braintree.connect({
      environment: braintree.Environment.Pipedream,
`````

## project introduction:
1. authorization service code is at: /routes/checkout.js
2. client code is at: /views/form.hbs

## reference
1. transaction gateway methods
````
    interface TransactionGateway {
            cancelRelease(transactionId: string): Promise<void>;
            cloneTransaction(
                transactionId: string,
                options: { amount: string; options: { submitForSettlement: boolean } },
            ): Promise<void>;
            find(transactionId: string): Promise<Transaction>;
            holdInEscrow(transactionId: string): Promise<Transaction>;
            refund(transactionId: string, amount?: string): Promise<ValidatedResponse<Transaction>>;
            releaseFromEscrow(transactionId: string): Promise<Transaction>;
            sale(request: TransactionRequest): Promise<ValidatedResponse<Transaction>>;
            search(searchFn: any): stream.Readable;
            submitForPartialSettlement(
                authorizedTransactionId: string,
                amount: string,
            ): Promise<ValidatedResponse<Transaction>>;
            submitForSettlement(transactionId: string, amount?: string): Promise<ValidatedResponse<Transaction>>;
            void(transactionId: string): Promise<ValidatedResponse<Transaction>>;
        }

````
2. sale transaction request model 

````
    export interface TransactionRequest {
        amount: string;
        billing?: {
            company?: string;
            countryName?: string;
            extendedAddress?: string;
            firstName?: string;
            lastName?: string;
            locality?: string;
            postalCode?: string;
            region?: string;
            streetAddress?: string;
            countryCodeAlpha2?: string;
            countryCodeAlpha3?: string;
            countryCodeNumeric?: string;
        };
        billingAddressId?: string;
        channel?: string;
        creditCard?: {
            cardholderName?: string;
            cvv?: string;
            expirationDate?: string;
            expirationMonth?: string;
            expirationYear?: string;
            number?: string;
            token?: string;
        };
        customer?: {
            company?: string;
            customFields?: any;
            email?: string;
            fax?: string;
            firstName?: string;
            id?: string;
            lastName?: string;
            phone?: string;
            website?: string;
        };
        customerId?: string;
        customFields?: Record<string, any>;
        descriptor?: Descriptor;
        deviceData?: string;
        deviceSessionId?: string;
        discountAmount?: string;
        externalVault?: {
            previousNetworkTransactionId?: string;
            status?: string;
        };
        lineItems?: TransactionLineItem[];
        merchantAccountId?: string;
        options?: {
            addBillingAddressToPaymentMethod?: boolean;
            holdInEscrow?: boolean;
            paypal?: {
                customField?: string;
                description?: string;
            };
            skipAdvancedFraudChecking?: boolean;
            skipAvs?: boolean;
            skipCvv?: boolean;
            storeInVault?: boolean;
            storeInVaultOnSuccess?: boolean;
            storeShippingAddressInVault?: boolean;
            submitForSettlement?: boolean;
            threeDSecure?: {
                required?: boolean;
            };
            venmo?: {
                profileId?: string;
            };
        };
        orderId?: string;
        paymentMethodNonce?: string;
        paymentMethodToken?: string;
        purchaseOrderNumber?: string;
        recurring?: boolean; // Deprecated
        riskData?: CustomerRiskData;
        serviceFeeAmount?: string;
        sharedBillingAddressId?: string;
        sharedCustomerId?: string;
        sharedPaymentMethodNonce?: string;
        sharedPaymentMethodToken?: string;
        sharedShippingAddressId?: string;
        shipping?: {
            company?: string;
            countryCodeAlpha2?: string;
            countryCodeAlpha3?: string;
            countryCodeNumeric?: string;
            countryName?: string;
            extendedAddress?: string;
            firstName?: string;
            lastName?: string;
            locality?: string;
            postalCode?: string;
            region?: string;
            streetAddress?: string;
        };
        shippingAddressId?: string;
        shippingAmount?: string;
        shipsFromPostalCode?: string;
        taxAmount?: string;
        taxExempt?: boolean;
        threeDSecurePassThru?: {
            cavv?: string;
            eciFlag: string;
            threeDSecureVision?: string;
            xid?: string;
        };
        transactionSource?: TransactionRequestSource;
    }
````

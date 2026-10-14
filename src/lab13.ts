// =====================================
// 1. typeof Type Guard
// =====================================

type ClientId = string | number;

function processClientId(id: ClientId): void {

    if (typeof id === "string") {

        console.log(`Client ID as string: ${id}`);

    } else {

        console.log(`Client ID as number: ${id}`);
    }
}

processClientId("C001");
processClientId(1001);


// =====================================
// 2. instanceof Type Guard
// =====================================

class ApiError extends Error {

    constructor(
        public statusCode: number,
        message: string
    ) {
        super(message);
    }
}

class BillingError extends Error {

    constructor(
        public invoiceNumber: string,
        message: string
    ) {
        super(message);
    }
}

function simulateBillingError(
    errorType: string
): void {

    try {

        if (errorType === "api") {

            throw new ApiError(
                404,
                "API Not Found"
            );
        }

        if (errorType === "billing") {

            throw new BillingError(
                "INV-1001",
                "Invoice Generation Failed"
            );
        }

        throw new Error(
            "Unknown Error"
        );

    }
    catch (error) {

        if (error instanceof ApiError) {

            console.log(
                `API Error: ${error.statusCode}`
            );

            console.log(error.message);
        }

        else if (
            error instanceof BillingError
        ) {

            console.log(
                `Billing Error: ${error.invoiceNumber}`
            );

            console.log(error.message);
        }

        else if (
            error instanceof Error
        ) {

            console.log(
                `Generic Error: ${error.message}`
            );
        }
    }
}

simulateBillingError("api");
simulateBillingError("billing");
simulateBillingError("other");


// =====================================
// 3. Custom Type Guard
// =====================================

interface ICompany {

    companyName: string;
}

interface IRegisteredCustomer {

    companyName: string;

    membershipTier:
        "Standard"
        | "Premium"
        | "Enterprise";
}

function isRegisteredCustomer(
    client: ICompany | IRegisteredCustomer
): client is IRegisteredCustomer {

    return "membershipTier" in client;
}

const registeredCustomer:
ICompany | IRegisteredCustomer =
{
    companyName: "Microsoft",

    membershipTier: "Enterprise"
};

if (
    isRegisteredCustomer(
        registeredCustomer
    )
) {

    console.log(
        registeredCustomer.membershipTier
    );
}


// =====================================
// 4. Success Result Type Guard
// =====================================

type BillingResult =

    | {
        success: true;
        invoice: string;
    }

    | {
        success: false;
        error: string;
    };

function isSuccessResult(
    result: BillingResult
): result is {
    success: true;
    invoice: string;
} {

    return result.success === true;
}

const result: BillingResult = {

    success: true,

    invoice: "INV-1001"
};

if (
    isSuccessResult(result)
) {

    console.log(
        result.invoice
    );
}


// =====================================
// 5. Discriminated Union
// =====================================

type OrderStatus =

    | { status: "Pending" }

    | { status: "Processing" }

    | { status: "Completed" }

    | { status: "Cancelled" };

function processOrder(
    order: OrderStatus
): void {

    switch (order.status) {

        case "Pending":

            console.log(
                "Order waiting for processing"
            );

            break;

        case "Processing":

            console.log(
                "Order currently processing"
            );

            break;

        case "Completed":

            console.log(
                "Order completed successfully"
            );

            break;

        case "Cancelled":

            console.log(
                "Order cancelled"
            );

            break;

        default:

            const exhaustiveCheck:
                never = order;

            return exhaustiveCheck;
    }
}

processOrder({
    status: "Pending"
});

processOrder({
    status: "Completed"
});
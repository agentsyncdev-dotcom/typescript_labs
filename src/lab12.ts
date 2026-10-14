process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// ==========================
// Types & Interfaces
// ==========================

type Currency = "USD" | "EUR" | "INR";

interface IExchangeRateResponse {
    base_code: string;
    rates: Record<string, number>;
    time_last_update_utc: string;
}

interface IRegisteredCustomer {
    id: number;
    companyName: string;
    preferredCurrency: Currency;
}

interface IInvoice {
    clientName: string;
    amountUSD: number;
    amountEUR: number;
    amountINR: number;
}

// ==========================
// Error Classes
// ==========================

class ApiError extends Error {

    constructor(
        public statusCode: number,
        message: string
    ) {
        super(message);
    }
}

class CurrencyNotFoundError extends Error {

    constructor(currency: string) {
        super(`Currency ${currency} not found`);
    }
}

// ==========================
// Generic Api Client
// ==========================

class ApiClient<T> {

    async get(url: string): Promise<T> {

        const response = await fetch(url);

        if (!response.ok) {

            throw new ApiError(
                response.status,
                response.statusText
            );
        }

        return await response.json() as T;
    }
}

// ==========================
// Currency Converter
// ==========================

function convertCurrency(
    amount: number,
    fromCurrency: Currency,
    toCurrency: Currency,
    rates: Record<string, number>
): number {

    const fromRate = rates[fromCurrency];
    const toRate = rates[toCurrency];

    if (fromRate === undefined) {
        throw new CurrencyNotFoundError(fromCurrency);
    }

    if (toRate === undefined) {
        throw new CurrencyNotFoundError(toCurrency);
    }

    return (amount / fromRate) * toRate;
}

// ==========================
// Invoice Generator
// ==========================

function generateMultiCurrencyInvoice(
    client: IRegisteredCustomer,
    orderTotal: number,
    rates: IExchangeRateResponse
): IInvoice {

    return {

        clientName: client.companyName,

        amountUSD: convertCurrency(
            orderTotal,
            "USD",
            "USD",
            rates.rates
        ),

        amountEUR: convertCurrency(
            orderTotal,
            "USD",
            "EUR",
            rates.rates
        ),

        amountINR: convertCurrency(
            orderTotal,
            "USD",
            "INR",
            rates.rates
        )
    };
}

// ==========================
// Main
// ==========================

const client =
    new ApiClient<IExchangeRateResponse>();

async function main(): Promise<void> {

    try {

        const rates = await client.get(
            "https://open.er-api.com/v6/latest/USD"
        );

        console.log("USD:", rates.rates["USD"]);
        console.log("EUR:", rates.rates["EUR"]);
        console.log("INR:", rates.rates["INR"]);

        console.log("--------------------");

        const convertedAmount = convertCurrency(
            5000,
            "USD",
            "INR",
            rates.rates
        );

        console.log(
            "5000 USD in INR:",
            convertedAmount
        );

        console.log("--------------------");

        const customer: IRegisteredCustomer = {
            id: 1,
            companyName: "Microsoft",
            preferredCurrency: "USD"
        };

        const invoice =
            generateMultiCurrencyInvoice(
                customer,
                5000,
                rates
            );

        console.log(invoice);
    }
    catch (error) {

        if (error instanceof ApiError) {

            console.log(
                `API Error: ${error.statusCode}`
            );

            console.log(error.message);
        }
        else if (
            error instanceof CurrencyNotFoundError
        ) {

            console.log(error.message);
        }
        else {

            console.log(error);
        }
    }
}

main();
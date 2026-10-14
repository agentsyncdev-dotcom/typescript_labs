interface IOrderItem {
    itemName: string;
    quantity: number;
    unitPrice: number;
    discount?: number;
}

interface IOrder {
    orderId: number;
    clientId: number;
    items: IOrderItem[];
    status: string;
    createdAt: string;
}

type ProductCatalog = {
    [category: string]: IOrderItem[];
};

const catalog: ProductCatalog = {
    Electronics: [
        {
            itemName: "Laptop",
            quantity: 2,
            unitPrice: 50000
        }
    ],
    Accessories: [
        {
            itemName: "Mouse",
            quantity: 5,
            unitPrice: 500
        }
    ]
};

catalog["Office"] = [
    {
        itemName: "Keyboard",
        quantity: 3,
        unitPrice: 1500
    }
];

console.log(catalog["Electronics"]);

function getProperty<T>(obj: T, key: keyof T): T[keyof T] {
    return obj[key];
}

const order: IOrder = {
    orderId: 1001,
    clientId: 101,
    items: [],
    status: "Processing",
    createdAt: "2026-10-14"
};

console.log(getProperty(order, "status"));
console.log(getProperty(order, "clientId"));

const config = {
    appName: "BillingApp",
    version: "1.0",
    isProduction: true
};

type ConfigType = typeof config;

const appConfig: ConfigType = {
    appName: "BillingApp",
    version: "1.0",
    isProduction: true
};

function hasEmail(obj: unknown): obj is { email: string } {
    return typeof obj === "object" && obj !== null && "email" in obj;
}

const company = {
    companyName: "Microsoft",
    email: "contact@microsoft.com"
};

if (hasEmail(company)) {
    console.log(company.email);
}

function calculateBill(amount: number, taxRate: number) {
    return amount + amount * taxRate;
}

type ReturnOf<T> =
    T extends (...args: any[]) => infer R
        ? R
        : never;

type BillResult = ReturnOf<typeof calculateBill>;

const result: BillResult = calculateBill(1000, 0.18);

console.log(result);
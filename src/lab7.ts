enum MembershipTier {
    Silver = "Silver",
    Gold = "Gold",
    Platinum = "Platinum"
}

type OrderStatus = "Pending" | "Processing" | "Completed" | "Cancelled";
type Currency = "USD" | "EUR" | "INR";
type ClientId = string | number;

interface IOrderItem {
    itemName: string;
    quantity: number;
    unitPrice: number;
    discount?: number;
}

interface IOrder {
    readonly orderId: number;
    clientId: number;
    items: IOrderItem[];
    status: OrderStatus;
    createdAt: string;
}

interface ICompany {
    readonly companyId: number;
    companyName: string;
    email: string;
    isActive: boolean;
}

interface IRegisteredCustomer extends ICompany {
    membershipTier: MembershipTier;
    registrationDate: string;
    totalSpend: number;
}

type PremiumClient = IRegisteredCustomer & {
    accountManager: string;
    prioritySupport: boolean;
};

type BillingResult =
    | { success: true; invoice: string }
    | { success: false; error: string };

function processClient(clientId: ClientId): string {
    if (typeof clientId === "number") {
        return `Numeric Client ID: ${clientId}`;
    }

    return `String Client ID: ${clientId}`;
}

function generateBillingResult(
    order: IOrder,
    currency: Currency
): BillingResult {
    if (order.items.length === 0) {
        return {
            success: false,
            error: "Order contains no items"
        };
    }

    const total = order.items.reduce(
        (sum, item) =>
            sum +
            item.quantity * item.unitPrice -
            (item.discount ?? 0),
        0
    );

    return {
        success: true,
        invoice: `Invoice Total: ${currency} ${total}`
    };
}

type OrderItemType = {
    itemName: string;
    quantity: number;
    unitPrice: number;
    discount?: number;
};

interface OrderItemInterface {
    itemName: string;
    quantity: number;
    unitPrice: number;
    discount?: number;
}

type PaymentMethod = "Card" | "UPI" | "Cash";

interface CustomerInfo {
    customerName: string;
}

interface CustomerInfo {
    phoneNumber: string;
}

const order: IOrder = {
    orderId: 1001,
    clientId: 101,
    items: [
        {
            itemName: "Laptop",
            quantity: 1,
            unitPrice: 50000
        },
        {
            itemName: "Mouse",
            quantity: 2,
            unitPrice: 500,
            discount: 50
        }
    ],
    status: "Completed",
    createdAt: "2026-10-14"
};

const premiumClient: PremiumClient = {
    companyId: 101,
    companyName: "NexaCore",
    email: "contact@nexacore.com",
    isActive: true,
    membershipTier: MembershipTier.Platinum,
    registrationDate: "2026-10-14",
    totalSpend: 150000,
    accountManager: "Rahul",
    prioritySupport: true
};

console.log(processClient(101));
console.log(processClient("CUST-101"));

const result = generateBillingResult(order, "INR");

if (result.success) {
    console.log(result.invoice);
} else {
    console.log(result.error);
}

console.log(premiumClient);
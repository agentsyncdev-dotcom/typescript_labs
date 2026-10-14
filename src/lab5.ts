type Company = {
    readonly companyId: number;
    companyName: string;
    email: string;
    isActive: boolean;
    registrationDate?: string;
};

type OrderItem = {
    itemName: string;
    quantity: number;
    unitPrice: number;
    discount?: number;
};

type Order = {
    readonly orderId: number;
    clientId: number;
    items: OrderItem[];
    status: string;
    createdAt: string;
};

const company: Company = {
    companyId: 101,
    companyName: "NexaCore",
    email: "info@nexacore.com",
    isActive: true,
    registrationDate: "2026-10-14"
};

const item1: OrderItem = {
    itemName: "Laptop",
    quantity: 2,
    unitPrice: 50000
};

const item2: OrderItem = {
    itemName: "Mouse",
    quantity: 5,
    unitPrice: 500,
    discount: 50
};

const order: Order = {
    orderId: 1001,
    clientId: 101,
    items: [item1, item2],
    status: "Processing",
    createdAt: "2026-10-14"
};

// company.companyId = 102;
// order.orderId = 1002;    

function getOrderSummary(order: Order): string {
    const total = order.items.reduce(
        (sum, item) =>
            sum +
            item.quantity * item.unitPrice -
            (item.discount ?? 0),
        0
    );

    const firstDiscount = order.items[0]?.discount ?? 0;

    return `Order #${order.orderId} | Status: ${order.status} | Total: ${total} | First Item Discount: ${firstDiscount}`;
}

console.log(company);
console.log(order);
console.log(getOrderSummary(order));
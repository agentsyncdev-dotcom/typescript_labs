interface IOrderItem {
    id: number;
    itemName: string;
    quantity: number;
    unitPrice: number;
    discount?: number;
}

interface IOrder {
    id: number;
    orderId: number;
    clientId: number;
    items: IOrderItem[];
    status: string;
    createdAt: string;
}

function processItems<T>(
    items: T[],
    processor: (item: T) => T
): T[] {
    return items.map(processor);
}

interface IRepository<T> {
    getById(id: number): T | undefined;
    getAll(): T[];
    save(item: T): void;
    delete(id: number): void;
}

class DataStore<T extends { id: number }>
    implements IRepository<T> {

    private data: T[] = [];

    getById(id: number): T | undefined {
        return this.data.find(item => item.id === id);
    }

    getAll(): T[] {
        return this.data;
    }

    save(item: T): void {
        this.data.push(item);
    }

    delete(id: number): void {
        this.data = this.data.filter(item => item.id !== id);
    }
}

function fetchAndTransform<T, U>(
    data: T[],
    transform: (item: T) => U
): U[] {
    return data.map(transform);
}

type ApiResponse<T = IOrder> = {
    success: boolean;
    data: T;
    message?: string;
};

const orderItems: IOrderItem[] = [
    {
        id: 1,
        itemName: "Laptop",
        quantity: 1,
        unitPrice: 50000
    },
    {
        id: 2,
        itemName: "Mouse",
        quantity: 2,
        unitPrice: 500
    }
];

const orders: IOrder[] = [
    {
        id: 1,
        orderId: 1001,
        clientId: 101,
        items: orderItems,
        status: "Processing",
        createdAt: "2026-10-14"
    },
    {
        id: 2,
        orderId: 1002,
        clientId: 102,
        items: [
            {
                id: 3,
                itemName: "Keyboard",
                quantity: 1,
                unitPrice: 2000
            }
        ],
        status: "Completed",
        createdAt: "2026-10-14"
    }
];

const processedOrders = processItems(
    orders,
    order => ({
        ...order,
        status: "Completed"
    })
);

const processedOrderItems = processItems(
    orderItems,
    item => ({
        ...item,
        unitPrice: item.unitPrice * 1.1
    })
);

console.log("Processed Orders");
console.log(processedOrders);

console.log("Processed Order Items");
console.log(processedOrderItems);

const orderStore = new DataStore<IOrder>();

orderStore.save(orders[0]!);
orderStore.save(orders[1]!);

console.log("Get All Orders");
console.log(orderStore.getAll());

console.log("Get Order By Id");
console.log(orderStore.getById(1));

orderStore.delete(1);

console.log("After Delete");
console.log(orderStore.getAll());

const invoices = fetchAndTransform(
    orders,
    order => {
        const total = order.items.reduce(
            (sum, item) =>
                sum +
                item.quantity * item.unitPrice -
                (item.discount ?? 0),
            0
        );

        return `Invoice #${order.orderId} - Total: ₹${total}`;
    }
);

console.log("Invoices");
console.log(invoices);

const orderResponse: ApiResponse = {
    success: true,
    data: orders[0]!
};

console.log("Default Generic Type Response");
console.log(orderResponse);

type Customer = {
    customerId: number;
    customerName: string;
};

const customerResponse: ApiResponse<Customer> = {
    success: true,
    data: {
        customerId: 501,
        customerName: "Microsoft"
    }
};

console.log("Custom Generic Type Response");
console.log(customerResponse);
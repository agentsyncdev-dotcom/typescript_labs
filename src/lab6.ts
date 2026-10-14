enum MembershipTier {
    Silver = "Silver",
    Gold = "Gold",
    Platinum = "Platinum"
}

interface ICompany {
    readonly companyId: number;
    companyName: string;
    email: string;
    isActive: boolean;
    registrationDate?: string;
}

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
    status: string;
    createdAt: string;
}

interface IRegisteredCustomer extends ICompany {
    membershipTier: MembershipTier;
    registrationDate: string;
    totalSpend: number;
}

interface IMembership {
    tier: MembershipTier;
    discountRate: number;
    getDiscount(total: number): number;
}

interface IBillingManager {
    addOrder(order: IOrder): void;
    getTotal(): number;
    generateInvoice(): string;
    reset(): void;
}

interface ICompany {
    auditLog?: string[];
}

const customer: IRegisteredCustomer = {
    companyId: 101,
    companyName: "NexaCore",
    email: "contact@nexacore.com",
    isActive: true,
    registrationDate: "2026-10-14",
    membershipTier: MembershipTier.Gold,
    totalSpend: 50000,
    auditLog: ["Customer Registered"]
};

const membership: IMembership = {
    tier: MembershipTier.Gold,
    discountRate: 10,
    getDiscount(total: number): number {
        return total * (this.discountRate / 100);
    }
};

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

class BillingManager implements IBillingManager {
    private orders: IOrder[] = [];

    addOrder(order: IOrder): void {
        this.orders.push(order);
    }

    getTotal(): number {
        return this.orders.reduce((grandTotal, order) => {
            const orderTotal = order.items.reduce(
                (sum, item) =>
                    sum +
                    item.quantity * item.unitPrice -
                    (item.discount ?? 0),
                0
            );

            return grandTotal + orderTotal;
        }, 0);
    }

    generateInvoice(): string {
        return `Invoice Total: ${this.getTotal()}`;
    }

    reset(): void {
        this.orders = [];
    }
}

const billingManager = new BillingManager();

billingManager.addOrder(order);

console.log(customer);
console.log(membership.getDiscount(1000));
console.log(billingManager.getTotal());
console.log(billingManager.generateInvoice());
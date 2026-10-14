enum MembershipTier {
    Standard = "Standard",
    Premium = "Premium",
    Enterprise = "Enterprise"
}

interface ICompany {
    companyId: number;
    companyName: string;
    email: string;
    registrationDate: string;
}

interface IOrderItem {
    itemName: string;
    quantity: number;
    unitPrice: number;
    discount?: number;
}

interface IOrder {
    orderId: number;
    clientId: number | null;
    items: IOrderItem[];
    status: string;
    createdAt: string;
}

const apiResponse: unknown = {
    orderId: 1001,
    clientId: 101,
    items: [],
    status: "Completed",
    createdAt: "2026-10-14"
};

const order = apiResponse as IOrder;

console.log(order.clientId!);

class Customer implements ICompany {
    public companyId: number;
    public companyName: string;
    public email: string;
    public readonly registrationDate: string;

    constructor(
        companyId: number,
        companyName: string,
        email: string,
        registrationDate: string
    ) {
        this.companyId = companyId;
        this.companyName = companyName;
        this.email = email;
        this.registrationDate = registrationDate;
    }

    public getInfo(): string {
        return `ID: ${this.companyId}, Company: ${this.companyName}, Email: ${this.email}`;
    }
}

class RegisteredCustomer extends Customer {
    private membershipTier: MembershipTier;
    private _totalSpend: number;

    constructor(
        companyId: number,
        companyName: string,
        email: string,
        registrationDate: string,
        membershipTier: MembershipTier,
        totalSpend: number
    ) {
        super(companyId, companyName, email, registrationDate);
        this.membershipTier = membershipTier;
        this._totalSpend = totalSpend;
    }

    protected getTier(): MembershipTier {
        return this.membershipTier;
    }

    public set setTier(tier: MembershipTier) {
        this.membershipTier = tier;
    }

    public get totalSpend(): number {
        return this._totalSpend;
    }

    public set totalSpend(amount: number) {
        if (amount >= 0) {
            this._totalSpend = amount;
        } else {
            throw new Error("Total spend cannot be negative");
        }
    }

    public override getInfo(): string {
        return `${super.getInfo()}, Tier: ${this.membershipTier}, Total Spend: ${this._totalSpend}`;
    }
}

abstract class Membership {
    constructor(public tier: MembershipTier) {}

    abstract getDiscount(total: number): number;
}

class StandardMembership extends Membership {
    constructor() {
        super(MembershipTier.Standard);
    }

    getDiscount(total: number): number {
        return total * 0.05;
    }
}

class PremiumMembership extends Membership {
    constructor() {
        super(MembershipTier.Premium);
    }

    getDiscount(total: number): number {
        return total * 0.1;
    }
}

class EnterpriseMembership extends Membership {
    constructor() {
        super(MembershipTier.Enterprise);
    }

    getDiscount(total: number): number {
        return total * 0.2;
    }
}

const microsoft = new RegisteredCustomer(
    1,
    "Microsoft",
    "contact@microsoft.com",
    "2026-10-14",
    MembershipTier.Enterprise,
    500000
);

const enterpriseMembership = new EnterpriseMembership();

console.log(microsoft.getInfo());
console.log(
    `Discount on 50000: ${enterpriseMembership.getDiscount(50000)}`
);


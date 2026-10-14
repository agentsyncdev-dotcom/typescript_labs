


//---------------------------- LAB 4 --------------------------------
function calculateTotal(
    quantity: number,
    unitPrice: number,
    discount: number = 0
): number {
    return (quantity * unitPrice) - discount;
}

const applyTax: (total: number, taxRate: number) => number =
    (total, taxRate) => total + (total * taxRate / 100);

type BillingFn = (amount: number, rate: number) => number;

const calculateGST: BillingFn = (amount, rate) =>
    amount + (amount * rate / 100);

const calculateDiscounts: BillingFn = (amount, rate) =>
    amount - (amount * rate / 100);

function summarizeOrders(...totals: number[]): number {
    return totals.reduce((sum, total) => sum + total, 0);
}

function formatInvoice(
    clientName: string,
    total: number,
    currency: string = "USD"
): string {
    return `Invoice for ${clientName}: ${currency} ${total.toFixed(2)}`;
}

console.log(calculateTotal(5, 100));
console.log(calculateTotal(5, 100, 50));

console.log(applyTax(500, 18));

console.log(calculateGST(1000, 18));
console.log(calculateDiscounts(1000, 10));

console.log(summarizeOrders(100, 200, 300, 400));

console.log(formatInvoice("ABC Corp", 1500));
console.log(formatInvoice("XYZ Ltd", 1500, "INR"));

// ---------------------------- LAB 2 --------------------------------

type client ={
  companyName: string,
  clientId: number,
  isActive: boolean,
  registrationDate: Date
}

type  item = [string, number, number];

enum MembershipTier{
  Standard = "STANDARD",
  Premium = "PREMIUM",
  Enterprise = "ENTERPRISE"
}

type orderTOTALS = number[];

type clientNames = Array<string>;

let client: client = {
  companyName: "Tech Solutions",
  clientId: 12345,
  isActive: true,
  registrationDate: new Date("2022-01-01")
};

let item: item = ["Laptop", 2, 1500];

let orderTotals: orderTOTALS = [1500, 3000, 4500];

let clientNames: clientNames = ["Alice", "Bob", "Charlie"];


//any, unknown, void, never
function processClientData(client: client): void {
  console.log(`Processing data for client: ${client.companyName}`);
}

function throwException(message: string): never {
  throw new Error(message);
}

function printNameUnknown(name: unknown): void {
  if (typeof name === "string") {
    console.log(`Client name is: ${name}`);
  } else {
    console.log("Invalid name");
  }
}

function printNameAny(name: any): void {
  console.log(`Client name is: ${name}`);
}
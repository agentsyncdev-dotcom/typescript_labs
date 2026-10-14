// ---------------------------- LAB 3 --------------------------------
let age = 23;
let name = "John Doe";
function inferType(num: number[], str: string){
  console.log(`The number is: ${num}`);
  console.log(`The string is: ${str}`);
  return num[0];
}

inferType([34,45,67,1], "Hello");


function calculateDiscount(price: number, discount: number) {
  return price - (price * discount);
}

const person = { firstName: "Rahul" , lastName: "Kushwaha", age: 30 };


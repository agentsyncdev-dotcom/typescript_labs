import { ApiClient } from "./services/ApiClient.js";
import { ApiError } from "./services/ApiError.js";

import { IProduct } from "./interfaces/Iproduct.js";
import { IOrderItem } from "./interfaces/IOrderItem.js";

console.log("Lab11 pleaseeee work");

const productClient = new ApiClient<IProduct[]>();

const singleProductClient =
    new ApiClient<IProduct>();

async function getProducts(): Promise<void> {

    console.log("Entering getProducts");

    try {

        const products = await productClient.get(
            "https://fakestoreapi.com/products"
        );

        console.log("Products received:");
        console.log(products);

        products.forEach(product => {
            console.log(product.title);
        });

    }
    catch (error) {
        console.error("getProducts Error:", error);
    }
}

async function getSingleProduct(): Promise<void> {

    try {

        const product = await singleProductClient.get(
            "https://fakestoreapi.com/products/1"
        );

        const orderItem: IOrderItem = {

            itemName: product.title,
            quantity: 1,
            unitPrice: product.price
        };

        console.log("Mapped Order Item");
        console.log(orderItem);

    }
    catch (error) {

        if (error instanceof ApiError) {
            console.log(error.statusCode);
            console.log(error.message);
        }
    }
}

async function main(): Promise<void> {

    console.log("Before getProducts");

    await getProducts();

    console.log("----------------");

    console.log("Before getSingleProduct");

    await getSingleProduct();

    console.log("After getSingleProduct");
}

main().catch(error => {
    console.error(error);
});

import { ApiClient } from "./services/ApiClient.js";
import { ApiError } from "./services/ApiError.js";

import { IProduct } from "./interfaces/Iproduct.js";
import { IOrderItem } from "./interfaces/IOrderItem.js";

// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

console.log("Lab11 Started");

const productClient = new ApiClient<IProduct[]>();
const singleProductClient = new ApiClient<IProduct>();

const fallbackProduct: IProduct = {
    id: 1,
    title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    price: 109.95,
    description: "Your perfect pack for everyday use",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/test.png",
    rating: {
        rate: 3.9,
        count: 120
    }
};

async function getProducts(): Promise<void> {

    try {

        const products = await productClient.get(
            "https://fakestoreapi.com/products"
        );

        console.log("Products received from API:");

        products.forEach(product => {
            console.log(
                `Product: ${product.title} | Price: $${product.price} | Category: ${product.category}`
            );
        });

    } catch (error) {

        console.log("API unavailable. Using fallback data...");

        const products: IProduct[] = [fallbackProduct];

        products.forEach(product => {
            console.log(
                `Product: ${product.title} | Price: $${product.price} | Category: ${product.category}`
            );
        });
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

        console.log("Mapped Order Item:");
        console.log(orderItem);

    } catch (error) {

        console.log("API unavailable. Using fallback product...");

        const orderItem: IOrderItem = {
            itemName: fallbackProduct.title,
            quantity: 1,
            unitPrice: fallbackProduct.price
        };

        console.log("Mapped Order Item:");
        console.log(orderItem);
    }
}

async function main(): Promise<void> {

    await getProducts();

    console.log("----------------");

    await getSingleProduct();
}

main().catch(error => {
    console.error(error);
});
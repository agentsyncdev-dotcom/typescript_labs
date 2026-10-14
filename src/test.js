// test.js

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

fetch("https://fakestoreapi.com/products/1")
    .then(r => r.json())
    .then(console.log)
    .catch(console.error);
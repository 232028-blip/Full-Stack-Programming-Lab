// Create Map (Key = ID, Value = Product Object)
let products = new Map();

// Add minimum 5 products
products.set(1, { name: "Laptop", price: 800 });
products.set(2, { name: "Phone", price: 500 });
products.set(3, { name: "Tablet", price: 300 });
products.set(4, { name: "Headphones", price: 100 });
products.set(5, { name: "Keyboard", price: 50 });

// Show initial total
updateTotal();

function updateTotal() {
    document.getElementById("totalCount").textContent = products.size;
}

function searchProduct() {

    let id = parseInt(document.getElementById("searchId").value);
    let output = document.getElementById("output");

    if (products.has(id)) {
        let product = products.get(id);
        output.textContent =
            "Product Found\n\n" +
            "ID: " + id +
            "\nName: " + product.name +
            "\nPrice: $" + product.price;
    } else {
        output.textContent = "Product not found.";
    }
}

function deleteProduct() {

    let id = parseInt(document.getElementById("searchId").value);
    let output = document.getElementById("output");

    if (products.delete(id)) {
        output.textContent = "Product deleted successfully.";
    } else {
        output.textContent = "Product not found. Cannot delete.";
    }

    updateTotal();
}
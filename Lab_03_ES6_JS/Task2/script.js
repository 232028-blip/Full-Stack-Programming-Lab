// Array to store products
let cart = [];

// Rest operator
function addToCart(...items) {
    cart.push(...items);
}

function addProducts() {

    // Add products
    addToCart("Laptop", "Mouse", "Keyboard");

    // Spread operator to clone cart
    let clonedCart = [...cart];

    // Array Destructuring
    let [firstProduct, ...remainingProducts] = clonedCart;

    // Display using innerHTML
    document.getElementById("output").innerHTML =
        "<strong>Total Items:</strong> " + clonedCart.length + "<br><br>" +
        "<strong>First Item:</strong> " + firstProduct + "<br><br>" +
        "<strong>Updated Cart:</strong> " + clonedCart.join(", ");
}
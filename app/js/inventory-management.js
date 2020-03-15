function display_menu() {
    "use strict";
    window.console.log("Welcome to the Product Inventory Management System");
    window.console.log("");
    window.console.log("COMMAND MENU");
    window.console.log("view - View all products");
    window.console.log("add - Add a product");
    window.console.log("update - Update a product");
    window.console.log("del - Delete a product");
    window.console.log("exit - Exit the program");
    window.console.log("");
}

function displayProducts() { 
    let products = JSON.parse(localStorage.getItem('products'));
    
    if (products.length === 0) {    
        console.log('There is no product in the inventory!');    
    }

    if (products.length > 0) {        
        let orderedProducts = products.sort((a, b) => (a.sku > b.sku) ? 1 : -1);

        for (const product of orderedProducts) {
            displayProduct(product)
        }
    
        console.log('');
    }

}

function displayProduct(product, message) {    
    console.log(product.sku + ' ' + product.name + ' (' +  product.quantity + ') ' + '$' + product.cost + (message ? message : ''));    
}

function add() {
    let products = JSON.parse(localStorage.getItem('products'));
    let newProduct = {};
    
    newProduct.sku = parseInt(document.getElementById("SKUInput").value); //window.prompt("Enter the product's sku");
    newProduct.name = document.getElementById("ProductNameInput").value; // window.prompt("Enter the product's name");
    newProduct.quantity = parseInt(document.getElementById("ProductQuantityInput").value); //window.prompt("Enter the product's quantity");
    newProduct.cost = parseFloat(document.getElementById("ProductPriceInput").value); //window.prompt("Enter the product's cost");
    
    products.push(newProduct);
    
    localStorage.setItem('products', JSON.stringify(products)); 
    displayProduct(newProduct, ' was added.');
    
    console.log('');
}

function remove(productId) {
    let productSKU = parseInt(productId); //parseInt(window.prompt("Product SKU to delete"));
    let products = JSON.parse(localStorage.getItem('products'));

    for (const [index, product] of products.entries()) {
        if (product.sku === productSKU) {            
            products.splice(index, 1);            
            displayProduct(product, ' was deleted.');
            localStorage.setItem('products', JSON.stringify(products)); 
            console.log('');

            location.reload();
        }
    }
}

function update(productId) {
    let productSKU = parseInt(productId); //parseInt(window.prompt("Product SKU to update"));
    let products = JSON.parse(localStorage.getItem('products'));

    var newProduct = {};
    
    newProduct.sku = productSKU; //window.prompt("Enter the product's sku");
    newProduct.name = window.prompt("Enter the product's name");
    newProduct.quantity = window.prompt("Enter the product's quantity");
    newProduct.cost = window.prompt("Enter the product's cost");

    for (const [index, product] of products.entries()) {
        if (product.sku === productSKU) {            
            products.splice(index, 1, newProduct);
            displayProduct(product, ' was updated.');
            localStorage.setItem('products', JSON.stringify(products)); 
            console.log('');

            location.reload();
        }
    }
}

function main() {    
    
    let preLoadedProducts = [
        {
          sku: 9382,
          name: "Hat",
          quantity: 10,
          cost: 2.23          
        }, 
        {
          sku: 3223,
          name: "Socks",
          quantity: 8,
          cost: 4.14
        },
        {
          sku: 4824,
          name: "Shirt",
          quantity: 6,
          cost: 8.99
        },
        {
          sku: 2233,
          name: "Jeans",
          quantity: 2,
          cost: 5.40
        },
        {
          sku: 6343,
          name: "Jacket",
          quantity: 19,
          cost: 122.40
        }
    ]
    
    if (!localStorage.getItem('products')){        
        localStorage.setItem('products', JSON.stringify(preLoadedProducts)); 
    }

    let products = JSON.parse(localStorage.getItem('products'));

    let table = document.getElementById('table');
    
    console.log(products);

    var header = table.createTHead();
    var row = header.insertRow(0);
    let sku = row.insertCell(0);
    let name = row.insertCell(1);
    let quantity = row.insertCell(2);
    let cost = row.insertCell(3);

    sku.innerHTML = "SKU";
    name.innerHTML = "NAME";
    quantity.innerHTML = "QUANTITY";
    cost.innerHTML = "COST";

    for (const [index, product] of products.entries()) {        
        let row = table.insertRow(index + 1);
        let sku = row.insertCell(0);
        let name = row.insertCell(1);
        let quantity = row.insertCell(2);
        let cost = row.insertCell(3);
        let updateIcon = row.insertCell(4);
        let deleteIcon = row.insertCell(5);
        
        sku.innerHTML = product.sku;
        name.innerHTML = product.name;
        quantity.innerHTML = product.quantity;
        cost.innerHTML = product.cost;
        updateIcon.innerHTML = '<span class="iconify" onclick="update('+ product.sku +');" data-icon="bx:bx-edit" data-inline="false"></span>';
        deleteIcon.innerHTML = '<span class="iconify" onclick="remove('+ product.sku +');" data-icon="ic:outline-delete" data-inline="false"></span>';
    }

}


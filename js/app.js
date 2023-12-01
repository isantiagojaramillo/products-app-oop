//  CLASS PRODUCT
 class Product{
    constructor(name, price, year){
        this.name = name,
        this.price = price,
        this.year = year
    }
 }


// CLASS INTERFACE
class UI {
    addProduct(product){
        const productList = document.getElementById('product-list');
        const element = document.createElement('div');
        element.innerHTML = `
            <div class="card text-center mb-4">
                <div class="card-body">
                    <strong>Product Name:</strong> ${product.name}
                    <strong>Product Price:</strong> ${product.price}
                    <strong>Product Year:</strong> ${product.year}
                    <a href="#" class="btn btn-danger" name="delete">Delete</a>
                </div>
            </div>
        `;
        productList.appendChild(element);
        // CALLING THE RESET METHOD AFTER ADDING THE PRODUCT
        this.resetForm();
    }

    // METHOD TO RESET THE FORM AFTER ADDING A PRODUCT
    resetForm(){
        document.getElementById('product-form').reset();
    }

    deleteProduct(element){
        if (element.name === "delete") {
            element.parentElement.parentElement.parentElement.remove();
            this.showMessage('Product Deleted Successfully!', 'danger');
        }
    }

    showMessage(message, cssClass){
        const div = document.createElement('div');
        div.className = `alert alert-${cssClass} mt-2`;
        div.appendChild(document.createTextNode(message));

        // SHOWING ON DOM
        const container = document.querySelector('.container');
        const app = document.querySelector('#app');
        container.insertBefore(div, app);
        setTimeout(function() {
            document.querySelector('.alert').remove();
        }, 3000);

    }
}

// DOM EVENTS
document.getElementById('product-form').addEventListener('submit', function(event) {

    const name = document.getElementById('product').value;
    const price = document.getElementById('price').value;
    const year = document.getElementById('year').value;

    // INSTANTIATING CLASS PRODUCT
    const product = new Product(name, price, year);
    // INSTANTIATING CLASS UI
    const ui = new UI();

    // VALIDATING FIELDS
    if (name === '' || price === '' || year === '') {
        return ui.showMessage('Please Complete the Fields!', 'danger');
    }

    ui.addProduct(product);
    ui.showMessage('Product Added Successfully!', 'success');
    
    // TO PREVENT REFRESHING THE PAGE
    event.preventDefault(); 
});


document.getElementById('product-list').addEventListener('click', function(event) {
    // INSTANTIATING A SECOND CLASS UI
    const ui2 = new UI();
    ui2.deleteProduct(event.target);
})

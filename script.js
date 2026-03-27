const form = document.querySelector("form");
const sellingPriceInput = document.querySelector("#price");
const nameInput = document.querySelector("#name");
const categoryInput = document.querySelector("#category");
const electronicsList = document.querySelector("#electronics");
const foodList = document.querySelector("#food");
const skinList = document.querySelector("#skin");

const API_URL = "https://crudcrud.com/api/4dfd5ad206634b12b05cd5b0eda8477a/products";

function handleFormSubmit(event) {
    event.preventDefault();

    const newProduct = {
        selling_price: sellingPriceInput.value,
        product_name: nameInput.value,
        category: categoryInput.value
    }

    axios.post(API_URL, newProduct)
    .then(()=>{ 
        form.reset();
        fetchProducts();
    })
    .catch(error => console.log(error));
   

    
}

function fetchProducts() {
    axios.get(API_URL)
    .then(function(res){
        const products = res.data;
        electronicsList.innerHTML = "";
        foodList.innerHTML = "";
        skinList.innerHTML = "";
        for(let i = 0; i < products.length; i++) {
            const product = products[i];
            if(product.category === "electronics"){
                displayProducts(product, electronicsList);
            } else if (product.category === "food") {
                displayProducts(product, foodList)
            } else if (product.category === "skin") {
                displayProducts(product, skinList);
            }
        }
    })
    .catch(error => console.log(error));
}

function displayProducts(product, list) {
    const li = document.createElement("li");
    li.innerHTML = `
        <div class="item-info">
            <p class="item-name">${product.product_name}</p>
            <p class="item-price">₹${product.selling_price}</p>
        </div>
    `;
    list.appendChild(li);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Remove";
    deleteButton.className ="delete-btn";
    li.appendChild(deleteButton);
    deleteButton.addEventListener("click", function(){
        axios.delete(`${API_URL}/${product._id}`)
        .then(()=>{
            list.removeChild(li);
        })
    })
}

document.addEventListener("DOMContentLoaded", function(){
    fetchProducts();
    form.addEventListener("submit", handleFormSubmit);
})

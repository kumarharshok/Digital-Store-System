const form = document.querySelector("form")
const itemNameInput = document.querySelector("#item-name");
const descriptionInput = document.querySelector("#description");
const priceInput = document.querySelector("#price");
const quantityInput = document.querySelector("#quantity");
const ul = document.querySelector("ul")

const API_URL = "https://crudcrud.com/api/bfc807f2b4404a18be448b696259e6c8/items"

function fetchItems() {
    axios.get(API_URL)
    .then(function(res){
        const items = res.data;
        ul.innerHTML = "";
        for (let i = 0; i < items.length; i++) {
            displayItems(items[i]);
        }
    })
}
function displayItems(item) {
    const li = document.createElement("li");
    li.textContent = `${item.item_name} - ${item.description} - ${item.price} - ${item.quantity}`
    ul.appendChild(li);
}
function handleFormSubmit(event) {
    event.preventDefault();

    const newItem = {
        item_name: itemNameInput.value,
        description: descriptionInput.value,
        price: priceInput.value,
        quantity: quantityInput.value
    }

    axios.post(API_URL, newItem)
    .then(function(res) {
        console.log(res.data);
        form.reset();
        displayItems(res.data);
        
    })
}

document.addEventListener("DOMContentLoaded", function() {
    fetchItems();
    form.addEventListener("submit", handleFormSubmit);
});

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
    databaseURL: "https://realtime-database-b2307-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings); // initalize database from app settings
const database = getDatabase(app); // get database (app)
const shoppingListInDB = ref(database, "shoppingList"); // get database named "shoppingList"

console.log(app)
    
const inputFieldEl = document.getElementById("input-field"); // get input element
const addButtonEl = document.getElementById("add-button"); // get add button element
const shoppingListEl = document.getElementById("shopping-list");

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value;

    push(shoppingListInDB, inputValue);

    clearInputFieldEl();

    appendItemToShoppingListEl(inputValue);
})

onValue(shoppingListInDB, function(snapshot) {
    let itemsArray = Object.values(snapshot.val());
    
    for (let i = 0; i < itemsArray.length; i++)
        {
            appendItemToShoppingListEl(itemsArray[i]);
        }
});

function clearInputFieldEl() {
    inputFieldEl.value = "";
}

function appendItemToShoppingListEl(itemValue) {
    shoppingListEl.innerHTML += `<li>${itemValue}</li>`;
}
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
    databaseURL: "https://realtime-database-b2307-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings); // initalize database from app settings
const database = getDatabase(app); // get database (app)
const shoppingListInDB = ref(database, "shoppingList"); // get database named "shoppingList"

    
const inputFieldEl = document.getElementById("input-field"); // get input element
const addButtonEl = document.getElementById("add-button"); // get add button element
const shoppingListEl = document.getElementById("shopping-list");

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value;

    push(shoppingListInDB, inputValue);

    clearInputFieldEl();
})

onValue(shoppingListInDB, function(snapshot) {
    if(snapshot.exists())
        {
            let itemsArray = Object.entries(snapshot.val());

            clearShoppingListEl();
    
            for (let i = 0; i < itemsArray.length; i++)
                {
                    let currentItem = itemsArray[i];
                    let currentItemID = currentItem[0];
                    let currentItemValue = currentItem[1];
             
                    appendItemToShoppingListEl(currentItem);
                }
        } else {
            shoppingListEl.innerHTML = "No items here...yet";
        }

});

function clearShoppingListEl() {
    shoppingListEl.innerHTML = "";
}

function clearInputFieldEl() {
    inputFieldEl.value = "";
}

function appendItemToShoppingListEl(item) {
    let itemID = item[0];
    let itemValue = item[1];

    let newEl = document.createElement("li");

    newEl.textContent = itemValue;

    newEl.addEventListener("click", function(){
        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`);

        remove(exactLocationOfItemInDB);
    })

    shoppingListEl.append(newEl);
}
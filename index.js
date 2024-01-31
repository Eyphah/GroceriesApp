import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-441c9-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const itemsInBD = ref(database, "items")

const addBtn = document.getElementById("add-button")
const inputEl = document.getElementById("input-field")
const listEl = document.getElementById("groceries-list")

addBtn.addEventListener("click", function(){
    if(inputEl.value!=""){ //added this so that user cannot add empty items
        let inputValue = inputEl.value 
        push(itemsInBD, inputValue)
        clearInput()
    }
})

onValue(itemsInBD, function(snapshot){ // is called anytime a value changes in the database
    if(snapshot.exists()){
        let itemsArray = Object.entries(snapshot.val())
        clearList()
        for (let i=0; i<itemsArray.length; i++){
            let currentItem = itemsArray[i]
            addItem(currentItem)
        }
    } else {
        listEl.innerHTML="<p>No items here...yet</p>"
    }
})

function clearInput(){
    inputEl.value = ""
}

function addItem(value){
    //listEl.innerHTML += `<li>${value}</li>` innerHTML is good for simple cases
    let itemId = value[0]
    let itemValue = value[1]
    let newEl = document.createElement("li")
    newEl.textContent = itemValue

    newEl.addEventListener("click", function(){
        let exactItemLocation = ref(database, `items/${itemId}`)
        remove(exactItemLocation)
    })

    listEl.append(newEl)
}

function clearList(){
    listEl.innerHTML = ""
}
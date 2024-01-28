import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

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
    let inputValue = inputEl.value 
    push(itemsInBD, inputValue)
    addItem(inputValue)
    clearInput()
})

function clearInput(){
    inputEl.value = ""
}

function addItem(value){
    listEl.innerHTML += `<li>${value}</li>`
}
import { baseurl } from "./baseurl.js";

let loginData = JSON.parse(localStorage.getItem('loginData'));
window.onload = function () {
    if (loginData.length == 0 || loginData.email != "user@empher.com") {
        alert("User Not Logged In");
        window.location.href = "index.html";
    }
}

let availableBooks = document.getElementById("available");
availableBooks.addEventListener("click",function(){
    event.preventDefault();
    getBook();
})
async function getBook() {
    try{
        let res = await fetch(`${baseurl}/books`);
        let data = await res.json();
        displayBook(data);
    }catch{}
}

function displayBook(book) {
    let container = document.getElementById("container")
    container.innerHTML = "";
    book.map((element)=>{
        let card = document.createElement("div");
        let title = document.createElement("h3");
        title.textContent = `Title: ${element.title}`;
        let author = document.createElement("h3");
        author.textContent = `Author: ${element.author}`;
        let category = document.createElement("h3");
        category.textContent = `Category: ${element.category}`;
        let isAvailable = document.createElement("h3");
        isAvailable.textContent = `Available: ${element.isAvailable}`;
        let borrowbtn = document.createElement("button");
        borrowbtn.textContent = `Borrow Book`
        borrowbtn.addEventListener("click",function(){
            prompt("Enter borrowing duration which should not exceed 10 Days");
        })
        card.append(title,author,category,isAvailable,borrowbtn);
        container.append(card);
    })
}
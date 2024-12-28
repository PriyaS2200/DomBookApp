import { baseurl } from "./baseurl.js";
let loginData = JSON.parse(localStorage.getItem('loginData'));
window.onload = function () {
    if (loginData.length == 0 || loginData.email != "admin@empher.com") {
        alert("Admin Not Logged In");
        window.location.href = "index.html";
    }
    getBook();
}

let form = document.getElementById("form");
form.addEventListener("submit", function () {
    event.preventDefault();
    let name = document.getElementById("title");
    let title = name.value;
    let writer = document.getElementById("author");
    let author = writer.value;
    let bookCategory = document.getElementById("category");
    let category = bookCategory.value;
    let bookObj = {
        title, author, category, isAvailable: true,
        isVerified: false,
        borrowedDays: null,
        imageUrl: "https://m.media-amazon.com/images/I/71ZB18P3inL._SY522_.jpg"
    };
    console.log(bookObj);
    fetch(`${baseurl}/books`, {
        method: 'POST',
        headers: {
            'content-Type': 'application/json'
        },
        body: JSON.stringify(bookObj),
    }).then(() => {
        alert("Book Added Successfully")
    }).catch((error) => {
        alert("Something went wrong try again later");
        console.log(error);
    })
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
        let verifybtn = document.createElement("button");
        verifybtn.textContent = `Verify Book`;
        verifybtn.addEventListener("click",function(){
            alert("Are you sure to Verify..?")
            verifyBook(element)
            
        })
        let deletebtn = document.createElement("button");
        deletebtn.textContent = `Delete Book`;
        deletebtn.addEventListener("click",function(){
            alert("Are you sure to Delete..?");
            deletebook(element)
        })
        card.append(title,author,category,isAvailable,verifybtn,deletebtn);
        container.append(card);
    })
}
 function deletebook(element){
    fetch(`${baseurl}/books/${element.id}`,{
        method: "DELETE",
    })
    getBook();
 }

 function verifyBook(element){
    let updatedBook = element.map((element)=> element.isVerified = true);
    fetch(`${baseurl}/books/${element.id}`,{
        method: "PATCH",
        headers: {
            "content-Type": "application/json",
        },
        body: JSON.stringify(updatedBook)
    })

 }
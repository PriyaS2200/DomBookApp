let form = document.getElementById('form');
form.addEventListener('submit', function() {
    event.preventDefault();
    let e = document.getElementById('email');
    let email = e.value;
    let p = document.getElementById('password');
    let password = p.value;
    let userObj = {email, password};
    if(email == "admin@empher.com" && password == "empher@123"){
        window.location.href = "admin.html";
        alert("Logged in as Admin");
        localStorage.setItem("loginData",JSON.stringify(userObj));
    }else if(email == "user@empher.com" && password == "user@123"){
        window.location.href = "books.html";
        localStorage.setItem("loginData",JSON.stringify(userObj));
    }else{
        alert("Invalid email or password");
    }
  
})
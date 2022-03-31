let username = document.querySelector("#username")
let password = document.querySelector("#password")
let email = document.querySelector("#email")
let btn = document.querySelector(".btn")
let age = document.querySelector("#age")

btn.onclick = async (event) => {
    event.preventDefault();

    username = username.value.trim()
    password =password.value.trim()
    email = email.value.trim()
    age = age.value.trim()
    console.log(email);

    if ( !username || !password || !email || !age) {
        return alert("Invalid input")
    }

    let response = await fetch("/register", {
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify({
            username,
            password,
            age,
            email
        })   
    })
    response = await response.json();
    if (response.status == 200) {
        window.location = "/code"
    }
    
}








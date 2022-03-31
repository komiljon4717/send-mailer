let sendBtn = document.querySelector(".btn")
let inputCode = document.querySelector("#code")

sendBtn.onclick = async (event) => {
    event.preventDefault();
    console.log(inputCode.value);
    let code = inputCode.value.trim()
    let tesponse = await fetch("/code", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            code
        })
    })
}
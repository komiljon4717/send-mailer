const otpGenerator = require('otp-generator');
const nodemailer = require('nodemailer')
const express = require('express');
const path = require('path');
const app = express();

app.use(express.json())
app.use(express.static(path.join(__dirname, "public")))


let generationCode = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false});

console.log(generationCode);

app.get('/', (req, res)=> res.sendFile(path.join(__dirname, "views", "register.html")))








let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "guestli237@gmail.com", // generated ethereal user
      pass: "ahror11113311", // generated ethereal password
    },
});


let mailer = message => {
    transporter.sendMail(message, (err, info) => {
        if (err) return console.log(err);
        console.log(info);
            
    });
}

app.post("/register", (req, res) => {
    try {
        let { username, email, password, age } = req.body

        username = username.trim()
        password =password.trim()
        email = email.trim()
        age = age.trim()

        if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/) ) {
            throw new Error("Invalid email address")
        }

        mailer({
            from: '"guestli237@gmail.com', // sender address
            to: email, // list of receivers
            subject: `Salom ${username}✔`, // Subject line
            text: `Confrim code: ${generationCode}`, // plain text body
            html: `Confrim code: ${generationCode}`, // html body
        })
        res.status(200).json({
            status: 200,
            message: "ok",
        })
    } catch (error) {
        res.status(400).json({
            status: 400,
            message: error.message,
        })
    }
})

app.get("/home", (req, res) => res.end("ok"))


app.get("/code", (req, res) => res.sendFile(path.join(__dirname, "views", "code.html")))

app.post("/code", (req, res) => {
    try {
        let { code }= req.body
        console.log(code);
        if (code == generationCode) {
            console.log("teng");
        }else{
            console.log("teng emas");
        }
        res.status(200).json({
            status: 200,
            message: "ok",
        })


    } catch (error) {
        res.status(400).json({
            status: 400,
            message: error.message,
        })
        
    }
    
})

















const start = () =>{
    try {
        app.listen(5000, () => {console.log("server is running on 5000");        })
        
    } catch (error) {
        console.log(error);
    }
}
start()
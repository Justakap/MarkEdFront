const nodemailer = require('nodemailer');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8000;
const path = require("path");

app.use('/static', express.static('static'));
app.use(express.urlencoded({ extended: true })); // Use bodyParser before defining routes

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.status(200).render('index.ejs');
});

app.post('/sendMail', (req, res) => {
    let email = req.body.email; 
    const random = Math.floor(Math.random() * 100000);
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "rockpowet@gmail.com",
            pass: "ziqnptntyhfddgtm",
        },
    });

    let details = {
        from: '"Mark Community" <MarkOfficial@gmail.com>',
        to: `${email}`, // Use the email variable declared in the / route
        subject: "Your One Time Password",
        html: `
        <body>
            <table class="table table-bordered text-center">
                <thead>
                    <tr>
                        <td scope="col">OTP</td>
                        <td scope="col">${random}</td>
                    </tr>
                </thead>
            </table>
        </body>`,
    };

    console.log("Sending mail...");

    transporter.sendMail(details, (err, info) => {
        if (err) {
            console.error("Error sending mail:", err);
            res.status(500).send("Error sending mail");
        } else {
            console.log("Mail sent successfully");
            console.log("Message ID:", info.messageId);
            console.log("Preview URL:", nodemailer.getTestMessageUrl(info));
            res.send(`Mail Sent to ${email}`);
        }
    });
});

app.listen(port, () => {
    console.log(`Server started at ${port}`);
});







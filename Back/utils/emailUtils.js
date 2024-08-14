const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "chenbrilling1@gmail.com",
        pass: "alpj daec mxnb umuq",
    },
});

const sendEmail = async function (email, code) {
    const mailOptions = {
        from: "chenbrilling1@gmail.com",
        to: email,
        subject: "Hello from Nodemailer",
        text: `Your code is: ${code}.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending email: ", error);
        } else {
            console.log("Email sent: ", info.response);
        }
    });
};


module.exports = sendEmail;
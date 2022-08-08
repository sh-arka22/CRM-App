/**
 * This file will contain the sample code for sending the email notification
 */
const nodemailer = require('nodemailer');


const tranporter = nodemailer.createTransport({
    port: 465,               // true for 465, false for other ports
    //host: "smtp.gmail.com",
    service: "gmail",
    auth: {
        user: 'vish007dev@gmail.com',
        pass: 'vpphciilrvkzgmkq',
    },
    secure: true,
});

console.log(typeof tranporter);

/**
 * Sending email
 */

const mailDataObj = {
    from : 'crm-no-reply@gmail.com',
    to : 'vish007dev@gmail.com,kankvish@gmail.com,dharmitmailer@gmail,r.srisarvesh@gmail.com,sgurvinder34@gmail.com',
    subject : "Testing the code to send email",
    text : "Sample text content",
    html : "<b> Hello World ! </b>"
}

tranporter.sendMail(mailDataObj, (err, data)=>{
    if(err){
        console.log(err.message);
    }else{
        console.log("email sent successfully");
    }
})
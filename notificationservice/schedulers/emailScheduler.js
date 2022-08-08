/**
 * Here we are going to have the logic to schedule the sending of the email
 */

const cron = require("node-cron");
const Notification = require("../models/notification.model");
const emailTransporter  = require("../notifiers/emailService");

cron.schedule("*/30 * * * * *", async ()=>{
    /**
     * Write the logic to read from the DB and send email
     */

    /**
     * Fetch all the notification requests which are in UN_SENT status
     */
    console.log("Inside the scheduler");
    const notifications = await Notification.find({status : "UN_SENT"});
    
    console.log(notifications);

    /**
     * Send the email notification corresponding to each of those requests
     */
    if(notifications){
        console.log("Number of un-sent requests are : ", notifications.length);

        /**
         * Send the email for each single notification request
         */
         notifications.forEach( n =>{

            const mailObj = {
                 to: n.recepientEmails,
                 subject : n.subject,
                 text : n.content
            }
            console.log("Sending email for ", mailObj);
            emailTransporter.sendMail(mailObj, async (err, info)=>{
                if(err){
                    console.log("Error while sending email ",err.message);
                }else{
                    console.log("Successfully sent the email ",info);

                    /**
                     *  I need to go and update the status of the notification
                     */
                     n.status = "SENT";
                     await n.save();

                    
                }
            })
         })

    }
    
});
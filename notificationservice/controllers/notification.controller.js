const Notification = require("../models/notification.model");

/**
 * Controller to create the notification
 * 
 * Validation of the notification request body, should be written at
 * : middleware
 */
exports.acceptNotificationRequest = async (req, res) => {

    try {

        /**
         * Create notificationObj to be inserted based on the req body
         */
        const notificationObj = {
            subject: req.body.subject,
            recepientEmails: req.body.recepientEmails,
            content: req.body.content,
            requester: req.body.requester,
            status: req.body.status
        };

        /**
         * Save the notification request
         */

        const notification = await Notification.create(notificationObj);

        /**
         * Send the tracking id back to the caller
         * _id of the created notification object can be used
         */
        res.status(201).send({
            message: "Request accepted",
            trackingId: notification._id
        });

    } catch (err) {
        console.log('Error while storing the notificaion request ', err.message);
        res.status(500).send({
            message: "INTERNAL Server error"
        })
    }


}



/**
 * Controller to fetch the notification details based on 
 * the notification id
 */

exports.getNotificationDetails = async (req, res) => {

    try {
        const trackingId = req.params.id;

        const notificaton = await Notification.findOne({ _id: trackingId });

        res.status(200).send(notificaton);
    } catch (err) {
        console.log("Error while retrieving the notification ", err.message);
        res.status(500).send({
            message: "Internal server error "
        });
    }
}
/**
 * This file should have the logic to connec to the Notification service
 */

const Client = require("node-rest-client").Client;

const client = new Client(); // This is the client object which will be used for calling the REST APIs


/**
 * Exposing a method which takes the request parameters for sending the
 * notification request to the notification service
 */
module.exports = (subject, content, recepients, requester) => {

    /**
     * Create the request body
     */
    const reqBody = {
        subject: subject,
        recepientEmails: recepients,
        content: content,
        requester: requester
    }

    /**
     * Prepare the headers
     */
    const reqHeader = {
        "Content-Type": "application/json"
    }
    /**
     * Combine headers and req body together
     */

    const args = {
        data: reqBody,
        headers: reqHeader
    }

    /**
     * Make a POST call and handle the response
     * 
     * URI should go in the .env file
     */
    try {
        client.post("http://localhost:8000/notiserv/api/v1/notifications", args, (data, res) => {

            console.log("Request sent");
            console.log(data);

        })
    } catch (err) {
        console.log(err.message);
    }




}

/**
 * This is going to be the starting point of the application
 */
const express = require('express');
const app = express();
const serverConfig = require('./configs/server.config');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dbConfig = require("./configs/db.config");
const User = require("./models/user.model");
const bcrypt = require("bcryptjs");
/**
 * Register the body-parser middleware
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


/**
 * Initialize the connection to the mongoDB
 */
mongoose.connect(dbConfig.DB_URL);
const db = mongoose.connection;
db.on("error", () => {
    console.log("Error while connecting to MongoDB");
});
db.once("open", () => {
    console.log("Connected to mongoDB");
    init();
});

/**
 * Create the ADMIN user at the boot time
 */
async function init() {

    /**
     * Check if the admin user is already present
     */
    try {

        /**
         * Every time the server starts the collection should be refreshed
         *
         */

        await User.collection.drop();
        
        /**let user = await User.findOne({ userId: "admin" });

        if (user) {
            console.log("ADMIN user is already present");
            return;
        }**/

        const user = await User.create({
            name: "Vishwa",
            userId: "admin",
            password: bcrypt.hashSync("Welcome1", 8),
            email: "kankvish@gmail.com",
            userType: "ADMIN"
        });

        console.log(user);
    } catch (err) {
        console.log("err in db initialization , " + err.message);
    }

}




/**
 *  We need to connect router to the server
 * 
 */
require("./routes/auth.route")(app); // this registers server with the route
require("./routes/user.route")(app);
require("./routes/ticket.route")(app);

app.listen(serverConfig.PORT, () => {
    console.log("Started the server on the PORT number : ", serverConfig.PORT);
});
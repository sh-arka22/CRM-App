const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

const mongoose = require("mongoose");
const dbConfig = require("./configs/db.config");

/**
 * Initializing the DB connection
 */
mongoose.connect(dbConfig.DB_URL, ()=>{
    console.log("Conencted to mongo db");
}, err =>{
    console.log("Some err occurred ", err.message);
})


/**
 * Stitch the router to server.js
 */
require("./routes/notification.route")(app);

/**
 * Attach the cron file also
 */
require("./schedulers/emailScheduler");


app.listen(8000, ()=>{  // TODO : Move this port num to the config fodler and .env file
    console.log("Server started");
})
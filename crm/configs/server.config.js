/**
 * Read from the .env file and export the PORT number to all other files
 * in the project
 */

if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

module.exports = {
    PORT : process.env.PORT
}



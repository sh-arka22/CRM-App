/**
 * This file will contains the logic for routing request
 * 
 * This file is dedicated to the routing logic for sign up and sign in
 */
const authController  = require("../controllers/auth.controller")
console.log(require("../middlewares"));
const { verifySignUp } = require("../middlewares");
module.exports = (app) =>{
    /**
     * POST   /crm/api/v1/auth/signup
     */
    app.post("/crm/api/v1/auth/signup" ,[ verifySignUp.validateSignUpRequestBody], authController.signup);

    /**
     * LOGIN
     * 
     * POST /crm/api/v1/auth/login
     */
    app.post("/crm/api/v1/auth/signin" , [ verifySignUp.validateSignInRequestBody],authController.signin);
}
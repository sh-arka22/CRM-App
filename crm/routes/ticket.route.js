/**
 * Route logic for the ticket resource
 */
const ticketController = require("../controllers/ticket.controller");
const {authJwt, validateTicket} = require("../middlewares");

module.exports = (app) => {

   /**
    * Create a ticket
    * 
    *   POST /crm/api/vi/tickets
    * 
    * Assignment:
    * Add the middleware for the validation of the request body
    */
    app.post("/crm/api/v1/tickets/", [authJwt.verifyToken],ticketController.createTicket);

    /**
     * GET /crm/api/vi/tickets
     */
    app.get("/crm/api/v1/tickets/", [authJwt.verifyToken], ticketController.getAllTickets);

    /**
     * PUT /crm/api/v1/tickets/:id
     */
    app.put("/crm/api/v1/tickets/:id", [authJwt.verifyToken, validateTicket.isValidOwnerOfTheTicket], ticketController.updateTicket);
}

const { Router } = require("express");

const SessionsController = require("../controllers/SessionsController");

const sessionsRouters = Router();

const sessionsController = new SessionsController();

sessionsRouters.post("/", sessionsController.create);

module.exports = sessionsRouters;

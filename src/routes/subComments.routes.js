const { Router } = require("express");

const SubCommentsController = require("../controllers/SubCommentsController");

const ensureAuthenticated = require("../middleware/userAuthentication");

const subCommentsRouters = Router();

const subCommentsController = new SubCommentsController();

subCommentsRouters.use(ensureAuthenticated);

subCommentsRouters.post("/:id", subCommentsController.create);

module.exports = subCommentsRouters;

const { Router } = require("express");

const LikesController = require("../controllers/LikesController");

const ensureAuthenticated = require("../middleware/userAuthentication");

const likesRouters = Router();

const likesController = new LikesController();

likesRouters.post("/:id", ensureAuthenticated, likesController.create);
likesRouters.get("/:id", ensureAuthenticated, likesController.index);

module.exports = likesRouters;

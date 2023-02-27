const { Router } = require("express");

const FriendsController = require("../controllers/FriendsController");

const ensureAuthenticated = require("../middleware/userAuthentication");

const friendsRouters = Router();

const friendsController = new FriendsController();

friendsRouters.use(ensureAuthenticated);

friendsRouters.post("/:id", friendsController.friendRequest);
friendsRouters.get("/", friendsController.index);

module.exports = friendsRouters;

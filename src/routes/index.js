const { Router } = require("express");

const usersRouter = require("./users.routes");
const sessionsRouter = require("./sessions.routes");
const commentsRouter = require("./comments.routes");
const likesRouter = require("./likes.routes");
const subCommentsRouter = require("./subComments.routes");
const friendsRouter = require("./friends.routes");

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/sessions", sessionsRouter);
routes.use("/comments", commentsRouter);
routes.use("/likes", likesRouter);
routes.use("/subcomments", subCommentsRouter);
routes.use("/friends", friendsRouter);

module.exports = routes;

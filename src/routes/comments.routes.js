const { Router } = require("express");
const multer = require("multer");
const uploadConfig = require("../configs/upload");

const CommentsController = require("../controllers/CommentsController");

const ensureAuthenticated = require("../middleware/userAuthentication");

const commentsRouters = Router();

const commentsController = new CommentsController();
const upload = multer(uploadConfig.MULTER);

commentsRouters.use(ensureAuthenticated);

commentsRouters.post("/", upload.single("comments"), commentsController.create);
commentsRouters.delete("/:id", commentsController.delete);
commentsRouters.get("/", commentsController.index);

module.exports = commentsRouters;

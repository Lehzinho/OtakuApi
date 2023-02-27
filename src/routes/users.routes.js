const { Router } = require("express");

const multer = require("multer");
const uploadConfig = require("../configs/upload");

const usersRouters = Router();

const UsersController = require("../controllers/UsersController");
const AvatarController = require("../controllers/AvatarController");

const usersController = new UsersController();
const avatarController = new AvatarController();
const upload = multer(uploadConfig.MULTER);

const ensureAuthenticated = require("../middleware/userAuthentication");

usersRouters.post("/", usersController.create);
usersRouters.get("/", usersController.index);
usersRouters.put("/", ensureAuthenticated, usersController.update);
usersRouters.patch(
  "/avatar",
  ensureAuthenticated,
  upload.fields([{ name: "background" }, { name: "avatar" }]),
  avatarController.update
);

module.exports = usersRouters;

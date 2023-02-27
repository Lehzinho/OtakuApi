require("dotenv/config");
require("express-async-errors");
const database = require("./database/sqlite");
const AppError = require("./utils/AppError");
const uploadConfig = require("./configs/upload");

const cors = require("cors");
const express = require("express");
const routes = require("./routes");

database();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(uploadConfig.UPLOADS_FOLDER));
app.use("/avatar", express.static(uploadConfig.AVATAR_FOLDER));
app.use("/background", express.static(uploadConfig.BACKGROUND_FOLDER));

console.log(uploadConfig.UPLOADS_FOLDER);

app.use(routes);

app.use((error, request, response, next) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message,
    });
  }

  console.log(error);

  return response.status(500).json({
    status: "error",
    message: "interna server error",
  });
});

const PORT = 3333;
app.listen(PORT, () => console.log("Server is running"));

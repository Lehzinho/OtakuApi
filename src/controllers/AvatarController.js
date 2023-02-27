const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const DiskStorage = require("../providers/DiskStorage");

class AvatarController {
  async update(request, response) {
    const user_id = request.user.id;
    const user = await knex("users").where({ id: user_id }).first();
    if (request.files) {
      const avatarName = request.files;

      const diskStorage = new DiskStorage();

      // console.log(avatarName);
      if (!user) {
        throw new AppError(
          "Somente usuarios autenticados podem mudar o avatar",
          401
        );
      }

      if (avatarName.background) {
        const fileName = await diskStorage.saveBackgroundFile(
          avatarName.background[0].filename
        );

        if (user.background) {
          await diskStorage.deleteBackground(user.background);
        }

        user.background = fileName;
      }

      if (avatarName.avatar) {
        const fileName = await diskStorage.saveFile(
          avatarName.avatar[0].filename
        );

        if (user.avatar) {
          await diskStorage.deleteFile(user.avatar);
        }

        user.avatar = fileName;
      }
    }
    await knex("users").update(user).where({ id: user_id });
    return response.json(user);
  }
}
module.exports = AvatarController;

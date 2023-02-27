const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class SubCommentsController {
  async create(request, response) {
    const { subComment } = request.body;
    const user_id = request.user.id;
    const comment_id = request.params.id;
    const comment = await knex("comments").where({ id: comment_id }).first();

    await knex("subComments").insert({
      user_id,
      comment: subComment,
      owner_id: comment.user_id,
      comment_id,
    });

    return response.status(201).json();
  }

  async delete(request, response) {
    const { id } = request.params;

    await knex("subComments").where({ id }).delete();

    return response.json();
  }
}
module.exports = SubCommentsController;

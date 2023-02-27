const { Knex } = require("knex");
const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class LikesController {
  async create(request, response) {
    const { like, sad, dislike } = request.body;
    const user_id = request.user.id;
    const comment_id = request.params.id;
    const comment = await knex("comments").where({ id: comment_id }).first();

    const checkIfcommentHasLike = await knex("likes")
      .where({
        user_id,
        comment_id,
        owner_id: comment.user_id,
      })
      .first();

    if (checkIfcommentHasLike) {
      await knex("likes")
        .where({ user_id, comment_id, owner_id: comment.user_id })
        .update({
          like,
          sad,
          dislike,
        });

      !like &&
        !sad &&
        !dislike &&
        (await knex("likes").where({ id: checkIfcommentHasLike.id }).delete());

      return response.status(201).json();
    }
    console.log(like, sad, dislike);
    console.log("chegou aqui");
    await knex("likes").insert({
      like,
      sad,
      dislike,
      comment_id: comment.id,
      owner_id: comment.user_id,
      user_id,
    });
  }
  async index(request, response) {
    const comment_id = request.params.id;

    const likes = await knex("likes").where({ comment_id });

    return response.status(201).json(likes);
  }
}
module.exports = LikesController;

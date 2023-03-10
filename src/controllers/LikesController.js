const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class LikesController {
  async create(request, response) {
    try {
      const { like, sad, dislike } = request.body;
      const user_id = request.user.id;
      const comment_id = request.params.id;
      const comment = await knex("comments").where({ id: comment_id }).first();
      const existingLike = await knex("likes")
        .where({
          user_id,
          comment_id,
          owner_id: comment.user_id,
        })
        .first();

      if (existingLike) {
        if (!like && !sad && !dislike) {
          await knex("likes").where({ id: existingLike.id }).delete();
          return response.sendStatus(200);
        }

        await knex("likes")
          .where({
            user_id,
            comment_id,
            owner_id: comment.user_id,
          })
          .update({ like, sad, dislike });

        return response.sendStatus(200);
      }

      await knex("likes").insert({
        like,
        sad,
        dislike,
        comment_id: comment.id,
        owner_id: comment.user_id,
        user_id,
      });

      return response.sendStatus(201);
    } catch (error) {
      console.error(error);
      return response.status(500).json({ message: "Internal server error" });
    }
  }

  async index(request, response) {
    try {
      const commentId = request.params.id;
      const likes = await knex("likes").where({ comment_id: commentId });

      return response.status(200).json(likes);
    } catch (error) {
      console.error(error);
      return response.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = LikesController;

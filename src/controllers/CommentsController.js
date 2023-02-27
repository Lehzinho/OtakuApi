const { response } = require("express");
const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const DiskStorage = require("../providers/DiskStorage");

class CommentsController {
  async create(request, response) {
    const { comments } = request.body;
    const user_id = request.user.id;
    console.log("request");
    if (request.file) {
      const file = request.file.filename;

      const diskStorage = new DiskStorage();
      const fileName = await diskStorage.saveCommentsFile(file);

      await knex("comments").insert({
        user_id,
        comment: comments,
        file: fileName,
      });

      return response.status(201).json();
    }

    await knex("comments").insert({
      user_id,
      comment: comments,
    });

    return response.status(201).json();
  }

  async update(request, response) {}

  async delete(request, response) {
    const { id } = request.params;

    await knex("comments").where({ id }).delete();

    return response.json();
  }

  async index(request, response) {
    const user_id = request.user.id;
    const comments = await knex("comments").orderBy("id", "desc");
    const likes = await knex("likes").where({ owner_id: user_id });
    const subComments = await knex("subComments").where({ owner_id: user_id });
    const user = await knex("users").select(["id", "name", "avatar"]);

    const commentsWithLikes = comments.map((comment) => {
      const like = likes.filter((like) => like.comment_id === comment.id);
      const commentUser = user.filter((user) => comment.user_id === user.id);
      const subComment = subComments.filter(
        (subComment) => subComment.comment_id === comment.id
      );
      return {
        ...comment,
        Likes: like,
        subComment,
        commentUser,
      };
    });

    return response.status(201).json({ commentsWithLikes });
  }
}
module.exports = CommentsController;

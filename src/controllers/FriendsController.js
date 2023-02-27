const knex = require("../database/knex");

class FriendsController {
  async friendRequest(request, response) {
    const { friendRequest, accepted, friends } = request.body;
    const user_id = request.user.id;
    const friend_id = request.params.id;
    const userName = await knex("users").where({ id: user_id }).first();

    const hasRequest = await knex("friends")
      .where({ user_id, friend_id })
      .first();

    if (!hasRequest) {
      await knex("friends").insert({
        friend_id,
        name: userName.name,
        user_id,
        request: friendRequest,
        accepted: false,
        friends: false,
      });
      return response.json();
    }

    if (accepted) {
      hasRequest.accepted = true;
      hasRequest.friends = true;

      await knex("friends").where({ id: hasRequest.id }).update(hasRequest);
    } else {
      await knex("friends").where({ id: hasRequest.id }).delete();
    }

    return response.json();
  }

  async index(request, response) {
    const id = request.user.id;

    const myFriends = await knex("friends").where({ friend_id: id });

    return response.json({ myFriends });
  }
}
module.exports = FriendsController;

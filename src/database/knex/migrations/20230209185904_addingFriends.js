exports.up = (knex) =>
  knex.schema.createTable("friends", (table) => {
    table.increments("id");
    table.text("friend_id");
    table.text("name");
    table.boolean("request");
    table.boolean("accepted");
    table.boolean("friends");
    table
      .integer("user_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");

    table.timestamp("added_at").default(knex.fn.now());
  });

exports.down = (knex) => knex.schema.dropTable("friends");

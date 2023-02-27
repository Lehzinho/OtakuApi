exports.up = (knex) =>
  knex.schema.createTable("subComments", (table) => {
    table.increments("id");
    table.text("comment");
    table.integer("user_id");
    table.integer("owner_id");
    table
      .integer("comment_id")
      .references("id")
      .inTable("comments")
      .onDelete("CASCADE");

    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("updated_at").default(knex.fn.now());
  });

exports.down = (knex) => knex.schema.dropTable("subComments");

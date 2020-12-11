exports.up = function (knex) {
  return knex.schema
    .createTable("Recipes", (table) => {
      table.increments("Recipe_ID");
      table.text("Name", 128).notNullable();
    })
    .createTable("Ingredients", (table) => {
      table.increments("Ingredient_ID");
      table.text("Name", 128).notNullable();
    })
    .createTable("Steps", (table) => {
      table.increments("Step_ID");
      table.text("Step").notNullable();
      table.text("Step_Number").notNullable();
      table
        .integer("Recipe_ID")
        .unsigned()
        .notNullable()
        .references("Recipe_ID")
        .inTable("Recipes")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })
    .createTable("Steps_Ingredients", (table) => {
      table.increments();
      table
        .integer("Step_ID")
        .unsigned()
        .notNullable()
        .references("Step_ID")
        .inTable("Steps")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .integer("Ingredient_ID")
        .unsigned()
        .notNullable()
        .references("Ingredient_ID")
        .inTable("Ingredients")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.text("Quantity").notNullable();
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("recipes");
};

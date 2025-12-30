//catches common coding errors and prevents unsafe actions.
"use strict";

//JSDoc type annotation that provides TypeScript-like type hints for better IDE autocomplete and type checking.
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn("users", "name", "users_name");
    //for this
    // npx sequelize-cli db:migrate
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn("users", "users_name", "name");
    // for this
    // npx sequelize-cli db:migrate:undo
  },
};

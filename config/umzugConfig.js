//umzug config
const { Umzug, SequelizeStorage } = require("umzug");
const sequelize = require("../models/dbConnection");
const { Sequelize } = require("sequelize");
const path = require("path");

const umzug = new Umzug({
  migrations: {
    glob: path.join(process.cwd(), "migrations", "*.js").replace(/\\/g, "/"),
    resolve: ({ name, path, context }) => {
      const migration = require(path);
      return {
        name,
        up: async () => migration.up(context, Sequelize),
        down: async () => migration.down(context, Sequelize),
      };
    },
  },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
});

module.exports = umzug;

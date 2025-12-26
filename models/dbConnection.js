const { Sequelize } = require("sequelize");
require("dotenv").config();

// Sequelize instance /obj
const sequelize = new Sequelize(
  process.env.DB,
  process.env.USER,
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    //type of sql db used
    dialect: "mysql",
    //No queries, warnings, or info messages will be printed to the console or log files.
    logging: false, // set true for SQL query logs
    // pool a set of reusable database connections. to overcome db limit
    pool: {
      max: 10, // max connections
      min: 0, // min connections
      acquire: 30000, // max time to get connection (30 sec)
      idle: 10000, // max idle time
    },
  }
);

// Test db connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to db.");
  } catch (err) {
    console.error("Unable to connect to MySQL:", err.message);
  }
})();

module.exports = sequelize;

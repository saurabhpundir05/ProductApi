const sequelize = require("../models/dbConnection");
const umzug = require("../config/umzugConfig");

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection established.");
    const migrations = await umzug.down();
    if (migrations.length === 0) {
      console.log("No pending migrations found.");
    } else {
      console.log(
        `Executed ${migrations.length} migrations:`,
        migrations.map((m) => m.name)
      );
    }
    await sequelize.close();
    process.exit(0);
  } catch (err) {
    console.error("Migration failed:", err);
    process.exit(1);
  }
})();

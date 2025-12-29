const express = require("express");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoute");
const discountRoutes = require("./routes/discountRoutes");
const discountTypesRoutes = require("./routes/discountTypesRoute");
const sequelize = require("./models/dbConnection");
require("dotenv").config();
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

//cors is a middleware function from the cors package.
//applies it to all routes in your Express app.
app.use(cors());

//registers middleware
app.use(express.json()); //is built-in middleware that Reads incoming request bodies
// Parses JSON data Makes it available as req.body(else req.body undefined) req.body.name=rohan
app.use("/", userRoutes);
app.use("/", productRoutes);
app.use("/", categoryRoutes);
app.use("/", discountRoutes);
app.use("/", discountTypesRoutes);

sequelize
  .sync()
  .then(() => {
    console.log("Tables created successfully");
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error creating tables:", err);
  });

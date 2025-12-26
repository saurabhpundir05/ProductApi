const express = require("express");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const cors = require("cors");
const app = express();
require('dotenv').config();
const PORT=process.env.PORT;

//cors is a middleware function from the cors package.
//applies it to all routes in your Express app.
app.use(cors());

//registers middleware
app.use(express.json()); //is built-in middleware that Reads incoming request bodies
// Parses JSON data Makes it available as req.body(else req.body undefined) req.body.name=rohan
app.use("/", userRoutes);
app.use("/", productRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

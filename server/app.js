//server will be spun up
//Should look like this

// import dependencies
const express = require("express");
const cors = require("cors");

// create express app
const app = express();
const roomRoutes = require("../routes/roomRoutes");
// implement middleware
app.use(express.json());
app.use(cors());
app.use("/rooms", roomRoutes); //connector between app and room routes(localhost: PORT/rooms/<endPointName>)
// declare a PORT
const PORT = process.env.PORT || 8080;

// connect to MongoDB
require("./config/database");

// serve public directory
app.use(express.static("public"));

// GET - /api/health - check if API is alive or not
app.get("/api/health", async (req, res) => {
  try {
    res.send("Server is running");
  } catch (error) {
    console.log(error);
  }
});

// import routes
app.use("/api", require("./routes/users")); // users routes
app.use("/api", require("./routes/rooms")); // rooms routes

// spin up the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

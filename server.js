const express = require("express");
const connectDB = require("./config/db");
// const path = require("path");

//initializes express
const app = express();

//Connect Database
connectDB();

// app.use(express.static(path.join(__dirname, "client/build")));
//Initialize Middleware
//should allow us to get data in req.body cause express now includes url parser
app.use(express.json({ extended: false }));

// Make public a static folder
// app.use(express.static("public"));

//Define Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/availchips", require("./routes/api/availchips"));
app.use("/api/updatedChips", require("./routes/api/updatedChips"));

// app.get("/", (req, res) => res.send("API Running"));
// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname + "/client/build/index.html"));
// });

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV === "production") {
  if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
    app.use("*", express.static("client/build")); // Added this
  }
}

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

const express = require("express");
const connectDB = require("./config/db");

//initializes express
const app = express();

//Connect Database
connectDB();

//Initialize Middleware
//should allow us to get data in req.body cause express now includes url parser
app.use(express.json({ extended: false }));

//Define Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));

app.get("/", (req, res) => res.send("API Running"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

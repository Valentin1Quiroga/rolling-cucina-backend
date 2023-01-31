const express = require("express");
const connectDB = require("./db/db");
const app = express();
const usersRoutes = require("./routes/usersRoutes")
require("dotenv").config()

connectDB()
const PORT = process.env.PORT;

app.use("/users", usersRoutes)

app.listen(4500,()=>{console.log("Server listening on port "+ PORT );})
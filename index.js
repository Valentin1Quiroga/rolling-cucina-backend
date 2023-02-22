const express = require("express");
const cors = require("cors")

const connectDB = require("./db/db");
const app = express();
const usersRoutes = require("./routes/usersRoutes")
const menuRoutes = require("./routes/menuRoutes")
const pedidosRoutes= require("./routes/pedidosRoutes")
require("dotenv").config()

connectDB()
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

app.use("/users", usersRoutes)
app.use("/menu", menuRoutes)
app.use("/pedidos", pedidosRoutes)

app.listen(4500,()=>{console.log("Server listening on port "+ PORT );})
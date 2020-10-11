/*
Rutas de usuario / Auth
host + /api/auth
*/

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { dbConnection } = require("./routes/database/config");

//aplicaciones express
const app = express();

//base de datos
dbConnection();

//cors

app.use(cors);

//rutase

//directorio publico

app.use(express.static("public"));

//lectura y parseo del body

app.use(express.json());

//Rutas

app.use("/api/auth", require("./routes/auth"));

// Escuchar peticiones

app.listen(process.env.PORT, () => {
  console.log(`Servidor vorriendo en puerto ${process.env.PORT} `);
});

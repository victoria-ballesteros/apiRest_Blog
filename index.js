const { connection } = require("./database/connection");
const express = require("express");
const cors = require("cors");
const puerto = 8080;
const routesArticle = require("./routes/article");

console.log("Starting node application");
connection();
const app = express();
app.use(cors());
//Convertir el body de una request a un objeto JS
app.use(express.json());
//Crear servidor y escuchar peticiones http
app.listen(puerto, () => {
  console.log("Server running in port " + puerto);
});
//Carga las rutas en la app (sin esto no se ejecutan las peticiones estructuradas)
app.use(express.urlencoded({ extended: true }));
app.use("/api", routesArticle);
//Llamado de las rutas

app.get("/homePageTest", (req, res) => {
  console.log("homePageTest");
  return res.status(200).json({
    nombre: "Victoria",
    apellido: "Ballesteros",
    actividad: "Programacion de APIS Rest con node.js",
  });
});

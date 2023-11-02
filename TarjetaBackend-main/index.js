const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
console.log("a", dotenv.config);

mongoose
  .connect(process.env.DB)
  .then(() => {
    console.log("conexion a la bd exitosa");
  })
  .catch((error) => {
    console.log(error);
  });

console.log("API exitosa");


console.log(__dirname)
const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const tarjetaRoutes = require('./src/routes/tarjeta')
app.use('/api/tarjeta', tarjetaRoutes)

app.listen(process.env.PORT, () => {
  console.log("Servidor de node corriendo en el puerto:", process.env.PORT);
});

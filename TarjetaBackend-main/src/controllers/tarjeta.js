const Tarjeta = require("../models/tarjeta");

async function createTarjeta(req, res) {
  try {
    const newTarjeta = new Tarjeta(req.body);
    console.log(newTarjeta);
    const tarjetaSaved = await newTarjeta.save();
    res.status(201).json(tarjetaSaved);
  } catch (error) {
    res.status(500).json({ message: "error al crear la tarjeta" });
  }
}
async function getAllTarjetas(req, res) {
  try {
    const tarjeta = await Tarjeta.find();
    if (!tarjeta) {
      res.status(404).json({ message: "error al obtener las tarjetas" });
    }
    res.status(201).json(tarjeta);
  } catch (error) {
    res.status(500).json({ message: "error" });
  }
}
async function getTarjetasById(req, res) {
  const numeroTarjeta = req.params.numero;
  try {
    const tarjeta = await Tarjeta.findOne({ number: numeroTarjeta });
    if (!tarjeta) {
      return res.status(404).json({ message: "error al obtener las tarjetas" });
    }
    //fecha actual formateada
    const fechaActual = new Date();
    const opciones = { timeZone: "America/Santiago" };

    const diaActual = fechaActual.toLocaleString("es-ES", {
      day: "numeric",
      timeZone: "America/Santiago",
    });
    const mesActual = fechaActual.toLocaleString("es-ES", {
      month: "numeric",
      timeZone: "America/Santiago",
    });
    const añoActual = fechaActual.toLocaleString("es-ES", {
      year: "numeric",
      timeZone: "America/Santiago",
    });

    const fechaActualFormateada = `${diaActual}/${mesActual}/${añoActual}`;

    console.log(fechaActualFormateada);

    const dia = tarjeta.expirationDate.getDate();
    const mes = tarjeta.expirationDate.getMonth() + 1;
    const año = tarjeta.expirationDate.getFullYear();
    const fechaFormateada = `${dia}/${mes}/${año}`;
    console.log(fechaFormateada);
    if (fechaFormateada == fechaActualFormateada) {
      console.log("la tarjeta esta caducada");
    } else if (dia < diaActual || mes < mesActual || año < añoActual) {
      console.log("la tarjeta esta caducada");
    } else {
      console.log("la tarjeta no esta caducada");
    }

    res.status(200).json(tarjeta);
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
}

async function deleteTarjeta(req, res) {
  const idTarjeta = req.params.id;
  try {
    const tarjeta = await Tarjeta.findByIdAndDelete(idTarjeta);
    if (!tarjeta) {
      res.status(404).json({ message: "error al eliminar la tarjeta" });
    }
    res.status(201).json(tarjeta);
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
}
async function updateTarjeta(req, res) {
  const idTarjeta = req.params.id;
  const updateData = req.body;
  try {
    const tarjeta = await Tarjeta.findByIdAndUpdate(idTarjeta, updateData, {
      new: true,
    });
    if (!tarjeta) {
      res.status(404).json({ message: "error al actualizar la tarjeta" });
    }
    res.status(201).json(tarjeta);
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
}
module.exports = {
    createTarjeta,
    getAllTarjetas,
    getTarjetasById,
    deleteTarjeta,
    updateTarjeta
  };
  
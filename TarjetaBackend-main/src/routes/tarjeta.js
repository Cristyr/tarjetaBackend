
const express = require('express');
const tarjeta = require('../controllers/tarjeta');
const api = express.Router();


api.post('/register', tarjeta.createTarjeta);
api.get('/getTarjetas', tarjeta.getAllTarjetas);
api.get('/getTarjeta/:numero', tarjeta.getTarjetasById);
api.delete('/deleteTarjeta/:id', tarjeta.deleteTarjeta);
api.put('/updateTarjeta/:id', tarjeta.updateTarjeta);

module.exports = api;
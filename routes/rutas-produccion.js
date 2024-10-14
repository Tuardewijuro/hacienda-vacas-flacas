const express = require('express');
const router = express.Router();

// Ruta para obtener la producción total por día
router.get('/produccion-total', (req, res) => {
  // Aquí implementaremos la lógica más adelante
  res.send('Producción total de leche por día.');
});

// Ruta para obtener el día de mayor y menor producción
router.get('/max-min-produccion', (req, res) => {
  // Aquí implementaremos la lógica más adelante
  res.send('Día de mayor y menor producción.');
});

// Ruta para obtener la vaca que más produjo por día
router.get('/vaca-top', (req, res) => {
  // Aquí implementaremos la lógica más adelante
  res.send('Vaca con mayor producción de leche por día.');
});

module.exports = router;
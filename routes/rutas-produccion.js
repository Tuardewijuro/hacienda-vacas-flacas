const express = require('express');
const router = express.Router();

// Datos de ejemplo: producción de leche de 5 vacas durante 7 días
let produccionLeche = [
  [3, 4, 2, 3, 4],
  [2, 3, 4, 5, 5], 
  [3, 2, 2, 1, 2], 
  [1, 1, 1, 1, 1], 
  [2, 3, 5, 2, 2], 
  [4, 3, 4, 5, 1], 
  [2, 2, 2, 2, 2], 
];

// Ruta para obtener la producción total por día
router.get('/produccion-total', (req, res) => {
  let produccionTotalPorDia = produccionLeche.map(dia => dia.reduce((a, b) => a + b, 0));
  res.json({
      produccionTotalPorDia: produccionTotalPorDia
  });
});

// Ruta para obtener el día de mayor y menor producción
router.get('/max-min-produccion', (req, res) => {
  let produccionTotalPorDia = produccionLeche.map(dia => dia.reduce((a, b) => a + b, 0));

    // Obtener los índices de mayor y menor producción
    let diaMaximaProduccion = produccionTotalPorDia.indexOf(Math.max(...produccionTotalPorDia)) + 1;
    let diaMinimaProduccion = produccionTotalPorDia.indexOf(Math.min(...produccionTotalPorDia)) + 1;

    res.json({
        diaMaximaProduccion: `Día ${diaMaximaProduccion}`,
        diaMinimaProduccion: `Día ${diaMinimaProduccion}`
    });
});
// Ruta para obtener la vaca que más produjo por día
router.get('/vaca-top-dia', (req, res) => {
  let vacaTopPorDia = produccionLeche.map(dia => {
      let maxProduccion = Math.max(...dia);
      let vacasTop = dia
          .map((produccion, index) => (produccion === maxProduccion ? `Vaca ${index + 1}` : null))
          .filter(vaca => vaca !== null);
      return vacasTop;
  });

  res.json({
      vacaTopPorDia: vacaTopPorDia
  });
});

module.exports = router;
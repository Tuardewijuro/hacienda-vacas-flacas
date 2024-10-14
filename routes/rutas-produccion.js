const express = require('express');
const router = express.Router();
const produccionController = require('../controllers/produccion-controller');

// Endpoints GET
router.get('/produccion-total', produccionController.getProduccionTotal);
router.get('/max-min-produccion', produccionController.getMaxMinProduccion);
router.get('/vaca-top-dia', produccionController.getVacaTopDia);

// Endpoints POST
router.post('/crear-matriz', produccionController.crearMatriz);
router.post('/ingresar-produccion', produccionController.ingresarProduccion);

module.exports = router;
const express = require('express');
const router = express.Router();
const produccionController = require('../controllers/produccion-controller');

// Endpoints GET
/**
 * @swagger
 * /api/produccion/produccion-total:
 *   get:
 *     summary: Obtiene la producción total por día
 *     description: Devuelve la producción total de todas las vacas por cada uno de los 7 días.
 *     responses:
 *       200:
 *         description: Producción total por día
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 produccionTotalPorDia:
 *                   type: array
 *                   items:
 *                     type: number
 *       400:
 *         description: No se ha registrado producción aún
 *       500:
 *         description: Error al leer los datos de producción
 */
router.get('/produccion-total', produccionController.getProduccionTotal);
/**
 * @swagger
 * /api/produccion/max-min-produccion:
 *   get:
 *     summary: Obtiene el día con mayor y menor producción
 *     description: Devuelve el día de la semana con la mayor producción y el día con la menor producción.
 *     responses:
 *       200:
 *         description: Días de mayor y menor producción
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 diaMaximaProduccion:
 *                   type: string
 *                   example: "Día 2"
 *                   description: Día con la mayor producción
 *                 diaMinimaProduccion:
 *                   type: string
 *                   example: "Día 4"
 *                   description: Día con la menor producción
 *       400:
 *         description: No se ha registrado producción aún
 *       500:
 *         description: Error al leer los datos de producción
 */
router.get('/max-min-produccion', produccionController.getMaxMinProduccion);
/**
 * @swagger
 * /api/produccion/vaca-top-dia:
 *   get:
 *     summary: Obtiene la vaca con mayor producción por día
 *     description: Devuelve la vaca o las vacas que tuvieron la mayor producción por día.
 *     responses:
 *       200:
 *         description: Vacas con mayor producción por día
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 vacaTopPorDia:
 *                   type: array
 *                   items:
 *                     type: array
 *                     items:
 *                       type: string
 *                       description: Nombre de la vaca con mayor producción
 *       400:
 *         description: No se ha registrado producción aún
 *       500:
 *         description: Error al leer los datos de producción
 */
router.get('/vaca-top-dia', produccionController.getVacaTopDia);

// Endpoints POST
/**
 * @swagger
 * /api/produccion/crear-matriz:
 *   post:
 *     summary: Crea una nueva matriz de producción para las vacas
 *     description: Crea una matriz de producción para N vacas durante 7 días. La producción se inicializa en 0.0 litros para cada vaca.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               N:
 *                 type: integer
 *                 description: Número de vacas (mínimo 3, máximo 50)
 *                 example: 5
 *     responses:
 *       201:
 *         description: Matriz creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Matriz creada exitosamente con 5 vacas."
 *                 matriz:
 *                   type: array
 *                   items:
 *                     type: array
 *                     items:
 *                       type: number
 *       400:
 *         description: El número de vacas debe ser entre 3 y 50
 */
router.post('/crear-matriz', produccionController.crearMatriz);
/**
 * @swagger
 * /api/produccion/ingresar-produccion:
 *   post:
 *     summary: Ingresar la producción diaria de las vacas
 *     description: Registra la producción de cada vaca para un día específico. Se debe ingresar la producción para todas las vacas de un día.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               dia:
 *                 type: integer
 *                 description: Día de la semana (1-7)
 *                 example: 1
 *               produccion:
 *                 type: array
 *                 items:
 *                   type: number
 *                 description: Producción en litros de cada vaca
 *                 example: [5.0, 6.5, 7.2, 4.0, 5.5]
 *     responses:
 *       200:
 *         description: Producción registrada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Producción registrada con éxito para el día 1."
 *       400:
 *         description: Error en los datos ingresados (día fuera de rango o producción inválida)
 */
router.post('/ingresar-produccion', produccionController.ingresarProduccion);

module.exports = router;
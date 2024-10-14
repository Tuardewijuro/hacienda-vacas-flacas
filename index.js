const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const productionRoutes = require('./routes/rutas-produccion');
const swaggerSetup = require('./swagger');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger');

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/produccion', productionRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.static('frontend'));

swaggerSetup(app);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
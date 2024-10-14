const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Producción de Leche',
            version: '1.0.0',
            description: 'Documentación de la API para la producción de leche en la hacienda',
        },
        servers: [
            {
                url: 'http://localhost:3000', 
                description: 'Servidor de Desarrollo'
            }
        ],
    },
    apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

module.exports = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};
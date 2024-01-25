const express = require("express");
const mongoose = require("mongoose")
const logger = require("morgan")
const productRoutes = require("./app/routes/product.routes")
const categoryRoutes = require("./app/routes/category.routes")
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// ________________________________________________________________________

const app = express();

// ________________________________________________________________________

const PORT = 5000;

// ________________________________________________________________________

// Middlewares:
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));

// ________________________________________________________________________

// Connecting with database:
const uri = "mongodb+srv://admin:admin123@briefrecipeapi.zhnrskq.mongodb.net/Products?retryWrites=true&w=majority";

mongoose.connect(uri)
    .then(() => console.log("Connected to the database!"))
    .catch((err) => {
        console.log("Cannot connect to the database!", err)
        //   process.exit();
    });
// ________________________________________________________________________
// Swagger:
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Products API',
            version: '1.0.0',
            description: 'API documentation with Swagger',
        },
    },
    apis: ['./app/routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

// Endpoint:
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// ________________________________________________________________________

// Routes:
app.use('/api/v1/product', productRoutes);
app.use('/api/v1/category', categoryRoutes);

// ________________________________________________________________________

app.listen(PORT, () => console.log(`App is running on Port: ${PORT}`))
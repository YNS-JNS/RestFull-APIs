/**
 * @module productRoutes
 * @description Express routes for handling products.
 * @version 1.0.0
*/

/* ____________________________________________________________________ */
/*                            Importing section                         */
/* ____________________________________________________________________ */

const express = require("express");
const productCtrl = require("../controllers/product.controllers");
const {
    isIdValidator,
    isIdCatValidator,
    productValidator,
    updateValidator
} = require("../middlewares/validations/productValidator");

const router = express.Router(); // Router func

/* ____________________________________________________________________ */
/*                            Routes section                            */
/* ____________________________________________________________________ */

/**
 * @function createProduct
 * @description Create a new product.
 * @route {POST} /api/v1/product
 * @param {string} req.body.name - The name of the product.
 * @param {number} req.body.price - The price of the product.
 * @returns {Object} - The created product.
 * @throws {Error} - If there is an issue creating the product.
 * @example
 * {
 *   name: "Sample Product",
 *   price: 19.99
 * }
*/
/**
 * @desc POST | Create Product
 * @params No param
*/
router.post('/', productValidator, productCtrl.createProduct);

// ______________________________________________________________________

/**
 * @function getProductList
 * @description Get a list of all products.
 * @route {GET} /api/v1/product
 * @returns {Object[]} - List of products.
 * @throws {Error} - If there is an issue retrieving the product list.
 * @example
 * [
 *   {
 *     name: "Product 1",
 *     price: 29.99
 *   },
 *   {
 *     name: "Product 2",
 *     price: 39.99
 *   }
 * ]
*/
/**
 * @desc GET | GET ALL Products
 * @params No param
*/
router.get('/', isIdCatValidator, productCtrl.getProductList);

// ______________________________________________________________________

/**
 * @desc PUT | Update a Product
 * @params {id}
*/
router.put('/:id', isIdValidator, updateValidator, productCtrl.updateProduct);

// ______________________________________________________________________

/**
 * @desc DELETE | Delete a Product
 * @params {id}
*/
router.delete('/:id', isIdValidator, updateValidator, productCtrl.updateProduct);

// ______________________________________________________________________

// Importing router:
module.exports = router;
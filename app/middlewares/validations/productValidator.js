const Joi = require("joi");

/* ____________________________________________________________________ */
/*                     Validation ID (_id is valid)                     */
/* ____________________________________________________________________ */

// Todo: Check if Id of Product is valid or not
const checkingId = (id) => {

    const idSchema = Joi.string().pattern(new RegExp('^[0-9a-fA-F]{24}$'));

    return idSchema.validate(id);
};

// Checking Category Id
exports.isIdCatValidator = (req, res, next) => {
    
    const { error: idError } = checkingId(req.query.category);

    if (idError) {
        console.log(idError.details[0].message);
        return res.status(400).json({
            status: 400,
            message: `Category Id = ${req.query.category} is invalid !`
        });
    }

    next();
};

// Checking Product Id
exports.isIdValidator = (req, res, next) => {

    const { error: idError } = checkingId(req.params.id);

    if (idError) {
        console.log(idError.details[0].message);
        return res.status(400).json({
            status: 400,
            message: `Product Id = ${req.params.id} is invalid !`
        });
    }

    next();
};

/* ____________________________________________________________________ */
/*                      Validation Creating Product                     */
/* ____________________________________________________________________ */

// Todo: Validation for creating a new Product
const createNewProduct = (data) => {

    const productSchema = Joi.object({

        name: Joi.string().required().min(2).max(45),
        price: Joi.number().required(),
        category: Joi.string().required().min(2).max(24),
    });

    return productSchema.validate(data);
};

// * Custom middleware:
exports.productValidator = (req, res, next) => {

    const { error } = createNewProduct(req.body);

    if (error) {
        console.log(error)
        return res.status(400).json({
            status: 400,
            message: error.details[0].message
        });
    }

    next();
};

/* ____________________________________________________________________ */
/*                      Validation Updating Product                     */
/* ____________________________________________________________________ */

// Todo: Validation Schema for updating a new Product
const updateProduct = (data) => {

    const updateSchema = Joi.object({

        name: Joi.string().min(2).max(45),
        price: Joi.number(),
        category: Joi.string().min(2).max(24),
    }).min(1) // * At least one field must be present

    return updateSchema.validate(data);
};

exports.updateValidator = (req, res, next) => {

    const { error: dataError } = updateProduct(req.body, { abortEarly: false });

    if (dataError) {
        const errorMessage = dataError.details.map(detail => detail.message);
        return res.status(400).json({
            status: 400,
            message: errorMessage
        })
    }

    next();
};
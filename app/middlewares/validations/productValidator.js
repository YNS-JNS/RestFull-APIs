const Joi = require("joi");

// Todo: Check if Id of Product is valid or not
exports.productId = Joi.string().pattern(new RegExp('^[0-9a-fA-F]{24}$'));

// Todo: Validation for creating a new Product
exports.createNewProduct = Joi.object({

    name: Joi.string().required().trim().min(2).max(45),
    price: Joi.number().required().trim(),
    category: Joi.string().required().trim().min(2).max(24),
});

// Todo: Validation for updating a new Product
exports.updateProduct = Joi.object({

    name: Joi.string().trim().min(2).max(45),
    price: Joi.number().trim(),
    category: Joi.string().trim().min(2).max(24),
}).min(1) // Todo: 
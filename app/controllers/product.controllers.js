const ProductModel = require("../models/product.model");
const CategoryModel = require("../models/category.model");

/* ____________________________________________________________________ */
/*                             POST section                             */
/* ____________________________________________________________________ */
/* Nb: I want to create a product that has a category and the category  */
/* must belong to the category in the database.                         */
/* ____________________________________________________________________ */

exports.createProduct = (req, res) => {

    // Check if ID exists
    CategoryModel.findById(req.body.category)
        .then(
            (categoryObject) => {
                // If Category is not exists
                if (!categoryObject) {
                    return res.status(404).json({ message: "Category not found. Cannot create product." });
                }

                // Then, if exists create the Product
                const newProduct = new ProductModel({
                    ...req.body
                });

                newProduct.save()
                    .then(product => {
                        res.status(201).json({
                            status_code: 201,
                            message: "Created successfully",
                            data: product
                        })
                    })
                    .catch((err) => {
                        res.status(500).json({
                            status_code: 500,
                            message: "Some error occurred while creating the Product.",
                            error: err.message
                        })
                    });

            }
        )
        .catch((err) => {
            res.status(500).json({
                status_code: 500,
                message: `Some error occurred while searching for the category, Maybe the ID = ${req.body.category} is not valid !`,
                error: err.message
            })
        });
}

// Using Async & await:
/*
exports.createProduct =  async (req, res) => {
    try {
      const { name, price, category } = req.body;
  
      Check if the category ID exists
      const existingCategory = await CategoryModel.findById(category);
      
      if (!existingCategory) {
        return res.status(404).json({ message: 'Category not found. Cannot create product.' });
      }
  
      Category exists, proceed to create the product
      const newProduct = new ProductModel({
        name,
        price,
        category,
      });
  
      const savedProduct = await newProduct.save();
  
      res.status(201).json({
        message: 'Product saved successfully.',
        data: savedProduct,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
*/

/* ____________________________________________________________________ */
/*                           GET ALL section                            */
/* ____________________________________________________________________ */
/* Mongoose Hide: _id & __v in result.                                  */
/* Src:                                                                 */
/* https://www.bezkoder.com/mongoose-one-to-one-relationship-example/   */
/* ____________________________________________________________________ */

exports.getProductList = (req, res) => {

    // * Query:
    // Example of Endpoint : 
    // http://localhost:8080/api/products?name=example&minPrice=10&maxPrice=50category=example
    const { name, minPrice, maxPrice, category } = req.query;

    // Validate input parameters
    if ( minPrice && maxPrice && isNaN(parseFloat(minPrice)) && isNaN(parseFloat(maxPrice)) ) {
        return res.status(400).json({
            message: "Invalid price range !"
        })
    }

    const condition = {};

    // * Nb: $options: "i" makes the search case-insensitive.

    // * Filter by name
    if (name) {
        condition.name = { $regex: new RegExp(name), $options: "i" };
    }

    // * Filter by price range
    if (minPrice && maxPrice) {
        condition.price = { $gte: parseFloat(minPrice), $lte: parseFloat(maxPrice) };
    }

    // * Filter by category
    if (category) {
        condition.category = category;
    }

    // * Use condition object to query products
    ProductModel.find(condition).populate("category", "-_id -__v")
        .then(products => {
            // Checking
            if (!products || products.length === 0) {

                return res.status(404).json({
                    status_code: 404,
                    message: "No products found.",
                })
            }

            // If good
            res.status(200).json({
                status_code: 200,
                message: "Successfully retrieved products.",
                totalItems: products.length,
                data: products,
            })
        })
        .catch((err) => {
            res.status(500).json({
                status_code: 500,
                message: "Some error occurred while fetching the products.",
                error: err.message,
            })
        });
};

/* ____________________________________________________________________ */
/*                            UPDATE section                            */
/* ____________________________________________________________________ */

exports.updateProduct = (req, res) => {

    const { id } = req.params;

    ProductModel.findByIdAndUpdate(id, req.body, { new: true })
        .then(product => {

            if (!product) {
                return res.status(404).json({
                    status_code: 404,
                    message: `Cannot update Product with id=${id}. Maybe Product was not found!`
                })
            }

            res.status(200).json({
                status_code: 200,
                message: "Successfully updated product.",
                data: product,
            })
        }
        )
        .catch(
            err => {
                res.status(500).json({
                    status_code: 500,
                    message: "Some error occured while updating the product",
                    error: err.message,
                })
            }
        );
}

/* ____________________________________________________________________ */
/*                            DELETE section                            */
/* ____________________________________________________________________ */

exports.deleteOneProduct = (req, res) => {

    const { id } = req.params;

    ProductModel.findByIdAndDelete(id)
        .then(product => {

            if (!product) {
                return res.status(404).json({
                    status_code: 404,
                    message: `Cannot remove Product with id=${id}. Maybe Product was not found!`
                })
            }

            res.status(200).json({
                status_code: 200,
                message: `Product ${product.name} was removed successfully.`,
            })
        }
        )
        .catch(
            err => {
                res.status(500).json({
                    status_code: 500,
                    message: "Some error occured while removing the product",
                    error: err.message,
                })
            }
        );
}

/* ____________________________________________________________________ */
/*                             QUERY section                            */
/* ____________________________________________________________________ */
/* Find products by Category using Query                                */
/* ____________________________________________________________________ */
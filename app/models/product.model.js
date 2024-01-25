const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required !"]
        },
        price: {
            type: Number,
            required: [true, "Price must be a number and required !"]
        },
        /* 
            One-To-Many: un produit peut appartenir à une seule catégorie, 
            mais une catégorie peut avoir plusieurs produits.           
        */
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'CategoryModel',
            required: [true, "Product must be belong to category"]
        }
    }
);

productSchema.method("toJSON", function(){
    const { _id, __v, ...object } = this.toObject();

    object.id = _id;
    
    return object;
});

module.exports = mongoose.model("ProductModel", productSchema); 
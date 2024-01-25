const CategoryModel = require('../models/category.model');

// POST
exports.createCategory = async (req, res) => {
  try {
    const category = await CategoryModel.create(req.body);
    res.status(201).json({category});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET ALL
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await CategoryModel.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET BY ID
exports.getCategoryById = async (req, res) => {
  try {
    const category = await CategoryModel.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PUT
exports.updateCategoryById = async (req, res) => {
  try {
    const category = await CategoryModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE BY ID
exports.deleteCategoryById = async (req, res) => {
  try {
    const category = await CategoryModel.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

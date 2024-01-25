/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: API endpoints for managing categories
*/

const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controllers');

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Category name
 *       required:
 *         - name
*/

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Create a new category
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       '201':
 *         description: Successfully created a new category
 *         content:
 *           application/json:
 *             example:
 *               category:
 *                 _id: category_id
 *                 name: category_name
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             example:
 *               message: 'Validation error: Name is required.'
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               message: 'Error creating category.'
*/
router.post('/', categoryController.createCategory);

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Retrieve all categories
 *     tags: [Categories]
 *     responses:
 *       '200':
 *         description: Successfully retrieved categories
 *         content:
 *           application/json:
 *             example:
 *               - _id: category_id1
 *                 name: category_name1
 *               - _id: category_id2
 *                 name: category_name2
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               message: 'Error retrieving categories.'
*/
router.get('/', categoryController.getAllCategories);

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Retrieve a category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Category ID
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully retrieved the category
 *         content:
 *           application/json:
 *             example:
 *               _id: category_id
 *               name: category_name
 *       '404':
 *         description: Category not found
 *         content:
 *           application/json:
 *             example:
 *               message: 'Category not found.'
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               message: 'Error retrieving category.'
*/
router.get('/:id', categoryController.getCategoryById);

/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     summary: Update a category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Category ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       '200':
 *         description: Successfully updated the category
 *         content:
 *           application/json:
 *             example:
 *               _id: category_id
 *               name: updated_category_name
 *       '404':
 *         description: Category not found
 *         content:
 *           application/json:
 *             example:
 *               message: 'Category not found.'
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               message: 'Error updating category.'
*/
router.put('/:id', categoryController.updateCategoryById);

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Delete a category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Category ID
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully deleted the category
 *         content:
 *           application/json:
 *             example:
 *               message: 'Category deleted successfully.'
 *       '404':
 *         description: Category not found
 *         content:
 *           application/json:
 *             example:
 *               message: 'Category not found.'
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               message: 'Error deleting category.'
*/
router.delete('/:id', categoryController.deleteCategoryById);

module.exports = router;

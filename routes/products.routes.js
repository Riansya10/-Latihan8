const express = require('express');
const router = express.Router();
const productController = require('../controllers/products.controller');
const { authBearer } = require('../middlewares/auth.middleware.js');

// Routing standar REST API
router.get('/', productController.getAllProducts);      //get all
router.get('/:id', productController.getProductById);    //search by id
router.post('/', authBearer, productController.createProduct);       //New data
router.put('/:id', authBearer, productController.updateProduct);     //update by id
router.delete('/:id', authBearer, productController.deleteProduct);  //delete

module.exports = router;

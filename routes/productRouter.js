const express = require('express');
const router = express.Router();
const productController = require('../controller/products')

router.route('/')
    .get(productController.getAllProducts)
    .post(productController.postProduct);

router.route('/:productId')
    .get(productController.getProduct)
    .put(productController.updateProduct)
    .delete(productController.deleteProduct);

module.exports = router; 
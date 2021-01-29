const Product = require('../model/productModel');
const Multer = require('multer')
const Upload = Multer({ dest: 'uploads/' })

exports.getAllProducts = async (req, res, next) => {
    const products = await Product.find({ createdBy: req.user.id })
    res.status(200).json(products)
}

exports.postProduct = async (req, res, next) => {
    const newProduct = new Product(req.body);
    newProduct.createdBy = req.user.id;

    try {
        const product = await newProduct.save();
        res.status(201).json(product);
    } catch (error) {
        error.status = 400;
        next(error);
    }
};

exports.getProduct = async (req, res, next) => {
    const { productId } = req.params;
    try {
        const product = await Product.findById(productId);
        res.status(200).json(product);
    } catch (error) {
        error.status = 400;
        next(error)
    }
}


exports.updateProduct = async (req, res, next) => {
    const { productId } = req.params
    try {
        await Product.findByIdAndUpdate(productId, req.body);
        res.status(200).json({ success: true })
    } catch (error) {
        error.status = 400;
        next(error)
    }
}


exports.deleteProduct = async (req, res, next) => {
    const { productId } = req.params
    try {
        await Product.findByIdAndRemove(productId);
        res.status(200).json({ success: true })
    } catch (error) {
        error.status = 400;
        next(error);
    }
};

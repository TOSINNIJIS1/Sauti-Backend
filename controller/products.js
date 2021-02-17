const Product = require('../model/productModel');

exports.getAllProducts = async (req, res, next) => {
    try {
        const products = await Product.find()
        if (products) {
            res.status(200).json({products, message: "Products found"})
        } else if (!products) {
            res.status(200).json({message: 'No Product Found'})
        }

    } catch (error) {
        error.status = 400; 
        next(error)
    }
    
}


// Starts here


exports.getProduct = async (req, res, next) => {
    const {id}  = req.params;
    try {
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        error.status = 400;
        next(error)
    }
}

exports.updateProduct = async (req, res, next) => {
    
    
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

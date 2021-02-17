const express = require('express');
const router = express.Router();
const multer = require('multer');
const { v4: uuidv4 } = require('uuid')
const Product = require('../model/productModel');
const productController = require('../controller/products')
const path = require('path')
const DIR = '../public';
// const auth = require('../fmiddleware/auth')
require('dotenv').config()
require('../config/cloudinary')
const cloudinary = require('cloudinary');
// Storage

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
    cb(null, path.join(__dirname, DIR));
    },
    filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, uuidv4() + new Date().toISOString().replace(/:/g, '-'))
    }
    });

// Storage ends here


// Multer Starts Here
var upload = multer({
    storage: storage,
    limits:{fileSize: 1000000},
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});
// Multer Ends Here
router.route('/').get(productController.getAllProducts);

router.post('/', upload.single("image"), async (req, res, next) => {
    // const url = req.protocol + '://' + req.get('host')
    if (req.file) {
        const storeImage = await cloudinary.uploader.upload(req.file.path)

        let newProduct = new Product(req.body);
        newProduct.image = storeImage.secure_url

        newProduct.createdBy = req.user.id;


        try {
            const product = await newProduct.save()
            res.status(201).json({data: product, message: 'Product Created Successfully'})
        } catch (error) {
            error.status = 400;
            next(error)
        }
    } else {
        try {

            let products = await new Product(req.body)
            // products.createdBy = req.user.id 

            const newProduct = await products.save()

            res.status(201).json({data: newProduct, message: 'Product Created Successfully'})

        } catch(error) {
            error.status = 400;
            next(error)
        }
    }
    

})

router.route('/:id')
    .get(productController.getProduct)
    // .put(productController.updateProduct)
    .delete(productController.deleteProduct);

router.put('/:id', upload.single('image'), async (req, res, next) => {

    if (req.file) {
        const productImage = await cloudinary.uploader.upload(req.file.path)

        Product.findById(req.params.id)
        .then((product) => {
            console.log(product)
            product.location = req.body.location
            product.price = req.body.price
            product.item = req.body.item
            product.description = req.body.description
            product.category = req.body.category
            product.image = productImage.secure_url

            
            product.save()
            .then(() => res.json('Product Updated'))
            .catch(error => res.status(404).json(error))
        })

    } else {
        Product.findById(req.params.id)
        .then((product) => {
            console.log(product)
            product.location = req.body.location
            product.price = req.body.price
            product.item = req.body.item
            product.description = req.body.description
            product.category = req.body.category

            product.save()
            .then((data) => res.json('Product Updated'))
            .catch(error => res.status(404).json(error))
        })
    }  

})


module.exports = router; 

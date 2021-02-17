const express = require('express');
const router = express.Router();
const userController = require('../controller/user')
const auth = require('../middleware/auth')
const User = require('../model/userModel');


const multer = require('multer');
const { v4: uuidv4 } = require('uuid')
const path = require('path')
const DIR = '../public';


require('dotenv').config()
require('../config/cloudinary')


require('dotenv').config()
require('../config/cloudinary')
const cloudinary = require('cloudinary');
// Storage
// 
// uuidv4() + new Date().toISOString().replace(/:/g, '-')
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
    cb(null, path.join(__dirname, DIR) );
    },
    filename: (req, file, cb) => {
    // const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, Date.now() + file.originalname)
    }
});
// Storage ends here


const fileFilter = (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/gif" || file.mimetype == "image/tiff") {
        cb(null, true);
    } else {
        cb(null, false);
        return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
}
// Multer Starts Here
var upload = multer({
    storage: storage,
    limits:{fileSize: 1024 * 1024 * 5},
    fileFilter: fileFilter
});
// Multer Ends Here

router.get('/info/:id', userController.info)


router.get('/allUser',  userController.allUser)

router.post('/register', upload.single('image'), async (req, res, next) => {
    const { fname, password, confirmPassword, phone, email, location,} = req.body;

    const userEmail = await User.findOne({ email }); 
        const userPhone = await User.findOne({ phone });

        if (userEmail) {
            return res.json({
                message: "Email Already In Use!" 
            });
        }  else
        
        if (userPhone) {
            return res.json({
                message: "Phone Number Already Exist"
            })
        } else
        
        if (fname.length === 0) {
            return res.json({
                message: "Full Name cannot be empty"
            })
        } else

        if (password.length === 0 || confirmPassword === 0) {
            res.json({
                message: 'Password cannot be empty'
            })

        } else
        
        if (password !== confirmPassword) {

            res.json({
                message: `Password Does Not Match!!`
            })

        }  else
        
        
        if (password.length < 5 && confirmPassword.length < 5) {
            res.json({
                message: "Password too low"
            })
            
        }else
        
        if (req.file) {
            const profileImage = await cloudinary.uploader.upload(req.file.path)
        
            const registration = await new User({
                fname: req.body.fname,
                password: req.body.password,
                confirmPassword: req.body.confirmPassword,
                phone: req.body.phone,
                email: req.body.email,
                location: req.body.location,
                image: profileImage.secure_url
            })
            registration.save()
            .then(() => res.json({message: "All good and ready to go"}))
            .catch((err) => res.status(400).json({message: err}))
        } else {
            const registration = await new User({
                fname: req.body.fname,
                password: req.body.password,
                confirmPassword: req.body.confirmPassword,
                phone: req.body.phone,
                email: req.body.email,
                location: req.body.location,
                image: null
                // image: profileImage.secure_url
            })
            


            registration.save()
            .then(() => res.json({message: "All good and ready to go"}))
            .catch((err) => res.status(400).json({message: err}))
    }
    
})

router.put('/update-profile/:id', upload.single('image'), async (req, res, next) => {

    if (req.file) {
        const profileImage = await cloudinary.uploader.upload(req.file.path)

        User.findById(req.params.id)
        .then((user) => {
            user.fname = req.body.fname
            user.phone = req.body.phone
            user.email = req.body.email
            user.password = req.body.password
            user.location = req.body.location
            user.image = profileImage.secure_url

            user.save()
            .then(() => res.json('Profile Updated'))
            .catch((err) => res.status(404).json(err))
        })

        
    } else {
        User.findById(req.params.id)
        .then((user) => {
            user.fname = req.body.fname
            user.phone = req.body.phone
            user.email = req.body.email
            user.password = req.body.password
            user.location = req.body.location

            user.save()
            .then(() => res.json('Profile Updated'))
            .catch((err) => res.status(404).json(err))
        })
    }

    
})

router.post('/login', userController.login)

    
router.get('/', (req, res) => {
    res.send('Welcome to Sauti Africa Market')
})

module.exports = router
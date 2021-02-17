const User = require('../model/userModel');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config/config')
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose');
// const Profile = require('../model/profileModel');

// GetAll user start here
exports.allUser = async (req, res, next) => {
    const user = await User.find()

    try {
        if (user) {
            res.status(200).json(user)
        } else if (!user) {
            res.status(200).json({message})
        }
        

    } catch (error) {
        error.status = 400; 
        next(error)
    }
}
// GetAll ends here

// GetUser by id start here
exports.info = async (req, res, next) => {
    const id = req.params.id;
    console.log(id)

    try {
        const user = await User.findById(id)
        res.status(200).json({ message: "Done", data : user })
    } catch(error) {
        error.status = 400
        next(error)
    }
}

// GetUser ends here


exports.login = async (req, res, next) => {
    const { email, password} = req.body

    const user = await User.findOne({ email, password });

    if (!user)
        return res.status(200).json({ message: 'Invalid email/password' })

    // const isValid = await user.isPasswordValid(password)

    // if (!isValid)
    //     return res.status(200).json({ message: "Invalid email/password" })
    
    
    try {
        const token = getSignedToken(user);
        res.status(200).json({ token, user, message: "User Found" })
    } catch(error) {
        error.status = 400
        next(error)
    }

    

}

getSignedToken = user => {
    console.log(user)
    return jwt.sign({
        id: user.id,
        fname: user.fname
    }, SECRET_KEY, { expiresIn: "99999h" })
}


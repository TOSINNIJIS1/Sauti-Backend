const User = require('../model/userModel');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config/config')

exports.register = async (req, res, next) => {
    const { fname, phone, email, password, location } = req.body;

    const user = await User.findOne({ email }); 
    if (user) 
        return res.status(403).json({error: { message: "Email already in use!" }});
    
    const newUser = new User({ fname, phone, email, password, location});

    try {
        await newUser.save();
        const token = getSignedToken(newUser)
        res.status(200).json({ token, newUser })
    } catch(error) {
        error.status = 400
        next(error);
    }
};


exports.login = async (req, res, next) => {
    const { email, password } = req.body

    const user = await User.findOne({ email });

    if (!user)
        return res.status(403).json({error: { message: 'Invalid email/password' }})

    const isValid = await user.isPasswordValid(password)

    if (!isValid)
        return res.status(403).json({error: { message: "Invalid email/password" }})

    const token = getSignedToken(user);
    res.status(200).json({ token, user })

};




getSignedToken = user => {
    return jwt.sign({
        id: user._id,
        fname: user.fname,
        phone: user.phone,
        email: user.email,
        location: user.location
    }, SECRET_KEY, { expiresIn: "1h" })
}
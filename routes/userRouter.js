const express = require('express');
const router = express.Router();
const userController = require('../controller/user')

router.post('/register', userController.register)

router.post('/login', userController.login)

router.get('/', (req, res) => {
    res.send('Welcome to Sauti Africa Market')
})

module.exports = router
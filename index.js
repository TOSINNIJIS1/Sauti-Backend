const express = require('express');
const app  = express()
const mongoose = require('mongoose');
const Cors = require('Cors');
const bodyParser = require('body-parser');
const { MONGODB } = require('./config/config');
const userRoute = require('./routes/userRouter');
const auth = require('./middleware/auth');
const productRoute = require('./routes/productRouter');

app.use(bodyParser.json());
app.use(Cors());

// Token 
app.use('/api/protected', auth, (req, res) => {
    res.end(`Hi ${req.user.fname}, you are authenticated!`)
});

app.use('/api/products', auth, productRoute);

app.use('/api/users', userRoute);

// When no route match

app.use((req, res, next) => {
    const err = new Error('not found');
    err.status = 404;
    next(err)
});

app.use((err, req, res, next) => {
    const status = err.status || 500;
    res.status(status).json({error: { message: err.message }})
});

mongoose.connect(MONGODB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true, 
})
.then(() => {
    console.log('Database Connected');
    return app.listen(1000)
})
.then(() => console.log('Server running on port 1000'))
.catch((err) => console.log(err))
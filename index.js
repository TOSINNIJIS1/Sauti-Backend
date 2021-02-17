const express = require('express');
const app  = express()
const mongoose = require('mongoose');
const Cors = require('cors');
const bodyParser = require('body-parser');
const { MONGODB } = require('./config/config');
const userRoute = require('./routes/userRouter');
const auth = require('./middleware/auth');
const productRoute = require('./routes/productRouter');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// app.use(bodyParser.json())
app.use(express.json())
app.use(Cors());


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
})

// Token 
app.use('/api/protected', auth, (req, res) => {
    res.end(`Hi ${req.user.fname}, you are authenticated!`)
});

app.use('/api/products', productRoute);

app.use('/api/users', userRoute);

app.use('/', userRoute)
//Image start here
app.use(express.static(__dirname));
// image ends here

// When no route match

app.use(express.static('api/product'))
app.use((req, res, next) => {
    const err = new Error('not found');
    err.status = 404;
    next(err)
});

app.use((err, req, res, next) => {
    const status = err.status || 500;
    res.status(status).json({error: { message: err.message }})
});

const PORT = process.env.PORT || '1000'
mongoose.connect(MONGODB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true, 
    useFindAndModify: false
})
.then(() => {
    console.log('Database Connected')
    return app.listen(PORT)
})
.then(() => console.log('Server running on port 1000'))
.catch((err) => console.log(err))

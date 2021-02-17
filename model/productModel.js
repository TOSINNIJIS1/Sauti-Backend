const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const productSchema = new Schema({

    image: {
        type: String,
        // required: false
    },
    
    category: { 
        type: String, 
        // required: true,
        // enum: ['Animal Products', 'Beans', 'Fruits', 'Vegetables', 'Seeds & Nuts', 'Other', 'Peas', 'Roots & Tubers', 'Cereals', 'Clothes', 'Shoes', 'Jewelries', 'Shirt']
    },
    item: {
        type: String,
        // required: true
    },

    price: {
        type: String,
        // required: true,
    },
    location: {
        type: String,
        // required: true,
    },
    
    description: {
        type: String,
        // required: true,
    },

    createdBy: { type: Schema.Types.ObjectId, ref: 'User'},
    createdOn: { type: Date, default: Date.now }
    
})



module.exports = mongoose.model('Product', productSchema)
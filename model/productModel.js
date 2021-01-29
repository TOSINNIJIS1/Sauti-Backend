const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const productSchema = new Schema({

    image: {
        type: { type: String }
    },

    category: { 
        type: String, 
        required: true,
        enum: ['Animal Products', 'Beans', 'Cereal', 'Fruits', 'Vegetables', 'Seeds & Nuts', 'Other', 'Peas', 'Roots & Tubers', 'Cereals']
    },

    item: {
        type: String,
        requred: true,
    },
    price: {
        type: String,
        requred: true,
    },
    location: {
        type: String,
        requred: true,
    },
    description: {
        type: String,
        requred: true,
    },

    createdBy: { type: Schema.Types.ObjectId, ref: 'User'},
    createdOn: { type: Date, default: Date.now }
    
})

module.exports = mongoose.model('Product', productSchema)
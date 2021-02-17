const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs')

const userSchema = new Schema({
    // _id: mongoose.Schema.Types.ObjectId,

    fname: { 
        type: String, 
        // required: true 
    },

    phone: { 
        type: Number, 
        // required: true
    },
    email: {
        type: String, 
        // required: true,
        // validate: [emailValidator, 'incorrect email format']
    },
    password: { 
        type: String,
        // required: true
    },
    
    location: {
        type: String,
    },

    image: {
        type: String,
    }
})

// function emailValidator (value) {
//     const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     return re.test(String(value).toLowerCase());
// }

// userSchema.pre('save', async function(next) {
//     try {
//         const salt = await bcrypt.genSalt(10);
//         const passwordHash = await bcrypt.hash(this.password, salt)
//         this.password = await passwordHash
//         next();

//     } catch (error) {
//         next (error);
//     }
// }) 

// userSchema.methods.isPasswordValid = async function (value) {
//     if (value) {
//         console.log(value,'this is value')
//         try {
//             return await bcrypt.compare(value, this.password)
    
//         } catch (error) {
//             throw new Error(error)
//         }
//     } else {
//         console.log('noooooo')
//     }
// }


const User = mongoose.model("User", userSchema)

module.exports = User

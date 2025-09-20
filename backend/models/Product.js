 const { default: mongoose } = require('mongoose');
const mangoose = require('mongoose');

const ProductSchema = new mangoose.Schema({
    image : {
        type : String    
    }, 
    title : {
        type : String
    }, 
    description : {
        type : String,
    },
    category : {
        type : String
    },
    brand : {
        type : String
    },
    price : {
        type : Number
    },
    salePrice : {
        type : Number
    },
    totalStock : {
        type : Number
    }
},{timestamps:true})

const Product = mongoose.model('Product',ProductSchema);
module.exports = Product;
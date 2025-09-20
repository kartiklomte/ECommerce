const Cart = require('../../models/Cart');
const Product = require('../../models/Product');


const addToCart = async (req,res)=>{
    try {
        // take userid, productid and quantity from the user
        const {userId, productId, quantity} = req.body;

        // check if all the parameters are present in the request or not 
        if(!userId || !productId || quantity <= 0){
            return res.status(400).json({
                success : false,
                message : 'valid data not provided'
            });
        }

        // find the product in the db
        const product = await Product.findById(productId);

        // check if the product is present in the db
        if(!product){
            return res.status(404).json({
                success : false,
                message : 'product not found'
            });
        }

        // check if the cart of the user is already present or not 
        let cart = await Cart.findOne({userId});

        if(!cart){
            //if the cart is not present then create new cart
            cart = new Cart({userId, items : []});
        }

        //check the index of the current product. 
        const findCurrentProductIndex = cart.items.findIndex(item => item.productId.toString()===productId);

        //if it is -1 then directly push the item in the card or if it is not then increase the quantity of that product
        if(findCurrentProductIndex === -1){
            cart.items.push({productId,quantity});
        }else{
            cart.items[findCurrentProductIndex].quantity += quantity ;
        }

        //save the product details in the db
        await cart.save();

        res.status(200).json({
            success : true,
            data : cart
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success : false,
            message : 'error happened while adding the product to the cart'
        });
    }
};

const fetchCartItems = async (req,res)=>{
    try {
        const {userId} = req.params;

        // take data from the user's card
        const cart = await Cart.findOne({userId}).populate({
            path : 'items.productId',
            select : "image title price salePrice"
        })

        // if data from that card is not their then return error
        if(!cart){
             return res.status(404).json({
                success : false,
                message : 'cart not found'
            });
        }

        //if the user had added a product in his cart but the admin has deleted the product from the website then the product should also delete from the user's cart
        const validItem = cart.items.filter(productItem => productItem.productId);
        if(validItem.length < cart.items.length){
            cart.items = validItem;
            await cart.save();
        }

        //take the valid data and store it in populatecarditem which will be send as a response
        const populateCartItems = validItem.map(item => ({
            productId: item.productId._id,
            image: item.productId.image,
            title: item.productId.title,
            price: item.productId.price,
            salePrice: item.productId.salePrice,
            quantity: item.quantity
        }));

        res.status(200).json({
            success: true,
            data: {
                ...cart._doc,
                items: populateCartItems
            }
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success : false,
            message : 'error happened while fetching the product data'
        });
    }
};

const updateCartItemQty = async (req,res)=>{
    try {
        // take userid, productid and quantity from the user
        const {userId, productId, quantity} = req.body;

        // check if all the parameters are present in the request or not 
        if(!userId || !productId || quantity < 0 ){
            return res.status(400).json({
                success : false,
                message : 'valid data not provided'
            });
        }

        // check if the cart of the user is already present or not 
        let cart = await Cart.findOne({userId});

        //if not then the cart can not be updated as it is not present. so sent the error msg
        if(!cart){
            return res.status(404).json({
                success : false,
                message : 'cart not found'
            });
        }

        //check the index no of the current item
        const findCurrentProductIndex = cart.items.findIndex(item => item.productId.toString()===productId);

        //if index not found the it will give index as -1. so return error for this
        if(findCurrentProductIndex === -1){
            return res.status(404).json({
                success : false,
                message : 'item not present in the cart'
            });
        }

        cart.items[findCurrentProductIndex].quantity = quantity;

        await cart.save();

        await cart.populate({
            path : 'items.productId',
            select : "image title price salePrice"
        });

        const populateCartItems = cart.items.map(item => ({
            productId: item.productId ? item.productId._id : null,
            image: item.productId ? item.productId.image : null,
            title: item.productId ? item.productId.title: 'product not found' ,
            price: item.productId ? item.productId.price : null,
            salePrice: item.productId ? item.productId.salePrice : null,
            quantity: item.quantity
        }));

        res.status(200).json({
            success: true,
            data: {
                ...cart._doc,
                items: populateCartItems
            }
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success : false,
            message : 'error happened while updating quentity of the product'
        });
    }
}

const deleteFromCart = async (req,res)=>{
    try {
        // take userid, productid and quantity from the user
        const {userId, productId} = req.params;

        // check if all the parameters are present in the request or not 
        if(!userId || !productId ){
            return res.status(400).json({
                success : false,
                message : 'valid data not provided'
            });
        }

        const cart = await Cart.findOne({userId}).populate({
            path : 'items.productId',
            select : "image title price salePrice"
        }) 

         // if data from that card is not their then return error
        if(!cart){
            return res.status(404).json({
                success : false,
                message : 'cart not found'
            });
        }

        cart.items = cart.items.filter(item => item.productId._id.toString() !== productId);

        await cart.save();

        await cart.populate({
            path : 'items.productId',
            select : "image title price salePrice"
        });

        const populateCartItems = cart.items.map(item => ({
            productId: item.productId ? item.productId._id : null,
            image: item.productId ? item.productId.image : null,
            title: item.productId ? item.productId.title: 'product not found' ,
            price: item.productId ? item.productId.price : null,
            salePrice: item.productId ? item.productId.salePrice : null,
            quantity: item.quantity
        }));

        res.status(200).json({
            success: true,
            data: {
                ...cart._doc,
                items: populateCartItems
            }
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success : false,
            message : 'error happened while deleting the product from the cart'
        });
    }
}

module.exports = {addToCart, updateCartItemQty, fetchCartItems, deleteFromCart}
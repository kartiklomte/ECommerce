const express = require('express');
const router = express.Router();
const {addToCart, fetchCartItems, updateCartItemQty, deleteFromCart} = require('../../controllers/user/cart-controller')

router.post('/add',addToCart);
router.get('/get/:userId',fetchCartItems);
router.put('/update-cart',updateCartItemQty);
router.delete('/:userId/:productId',deleteFromCart);

module.exports = router;
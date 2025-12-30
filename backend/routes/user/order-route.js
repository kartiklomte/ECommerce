const express = require('express');
const router = express.Router();
const orderCtrl = require('../../controllers/user/order-controller');

router.post('/order', orderCtrl.createRazorpayOrder);
router.post('/verify', orderCtrl.verifyRazorpayPayment);
router.post('/create-razorpay', orderCtrl.createRazorpayCheckoutOrder);
module.exports = router;
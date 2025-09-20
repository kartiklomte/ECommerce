const express = require('express');
const { getFilterProducts, getProductDetails } = require('../../controllers/user/product-controller');
const router = express.Router();

router.get('/viewProducts',getFilterProducts);
router.get('/viewProducts/:id',getProductDetails);

module.exports = router;
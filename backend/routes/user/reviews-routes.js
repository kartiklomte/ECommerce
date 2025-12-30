const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../../controllers/auth/auth-controller');
const reviewCtrl = require('../../controllers/user/review-controller');

router.get('/product/:productId', reviewCtrl.getProductReviews);
router.post('/add', authMiddleware, reviewCtrl.addOrUpdateReview);
router.put('/:id', authMiddleware, reviewCtrl.updateReview);

module.exports = router;
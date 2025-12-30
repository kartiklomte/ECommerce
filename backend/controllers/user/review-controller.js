const Review = require('../../models/Review');
const Product = require('../../models/Product');

exports.getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;

    const productExists = await Product.findById(productId);
    if (!productExists) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    const reviews = await Review.find({ productId })
      .sort({ createdAt: -1 })
      .select('rating comment userId userName createdAt updatedAt');

    return res.status(200).json({ success: true, data: reviews });
  } catch (err) {
    console.error('getProductReviews error', err);
    return res.status(500).json({ success: false, message: 'Failed to load reviews' });
  }
};

exports.addOrUpdateReview = async (req, res) => {
  try {
    const { id: authUserId, userName } = req.user || {};
    const { productId, rating, comment } = req.body;

    if (!authUserId) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }
    if (!productId || !rating || !comment) {
      return res.status(400).json({ success: false, message: 'Missing fields' });
    }
    if (Number(rating) < 1 || Number(rating) > 5) {
      return res.status(400).json({ success: false, message: 'Rating must be 1-5' });
    }

    const productExists = await Product.findById(productId);
    if (!productExists) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    const updated = await Review.findOneAndUpdate(
      { productId, userId: authUserId },
      { productId, userId: authUserId, userName, rating, comment },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    return res.status(200).json({ success: true, data: updated });
  } catch (err) {
    // handle unique index conflict gracefully
    if (err && err.code === 11000) {
      return res.status(400).json({ success: false, message: 'Duplicate review' });
    }
    console.error('addOrUpdateReview error', err);
    return res.status(500).json({ success: false, message: 'Failed to submit review' });
  }
};

exports.updateReview = async (req, res) => {
  try {
    const { id: authUserId } = req.user || {};
    const { id } = req.params;
    const { rating, comment } = req.body;

    const review = await Review.findById(id);
    if (!review) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }
    if (String(review.userId) !== String(authUserId)) {
      return res.status(403).json({ success: false, message: 'You can edit only your review' });
    }
    if (rating) {
      if (Number(rating) < 1 || Number(rating) > 5) {
        return res.status(400).json({ success: false, message: 'Rating must be 1-5' });
      }
      review.rating = rating;
    }
    if (comment) review.comment = comment;

    await review.save();
    return res.status(200).json({ success: true, data: review });
  } catch (err) {
    console.error('updateReview error', err);
    return res.status(500).json({ success: false, message: 'Failed to update review' });
  }
};
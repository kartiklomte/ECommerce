const Order = require('../../models/Order');
const Review = require('../../models/Review');

exports.overview = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();

    const revenueAgg = await Order.aggregate([
      { $match: { paymentStatus: 'paid' } },
      { $group: { _id: null, totalRevenue: { $sum: '$totalAmount' } } },
    ]);
    const totalRevenue = revenueAgg[0]?.totalRevenue || 0;

    const unitsAgg = await Order.aggregate([
      { $match: { paymentStatus: 'paid' } },
      { $unwind: '$cartItems' },
      { $group: { _id: null, totalUnits: { $sum: '$cartItems.quantity' } } },
    ]);
    const totalProductsSold = unitsAgg[0]?.totalUnits || 0;

    const topProducts = await Order.aggregate([
      { $match: { paymentStatus: 'paid' } },
      { $unwind: '$cartItems' },
      {
        $addFields: {
          priceNum: {
            $convert: {
              input: '$cartItems.price',
              to: 'double',
              onError: 0,
              onNull: 0,
            },
          },
        },
      },
      {
        $group: {
          _id: { productId: '$cartItems.productId', title: '$cartItems.title' },
          unitsSold: { $sum: '$cartItems.quantity' },
          revenue: { $sum: { $multiply: ['$cartItems.quantity', '$priceNum'] } },
        },
      },
      { $sort: { unitsSold: -1 } },
      { $limit: 5 },
    ]);

    const recentReviews = await Review.find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('productId', 'title')
      .select('rating comment userName createdAt');

    return res.status(200).json({
      success: true,
      data: {
        totalOrders,
        totalRevenue,
        totalProductsSold,
        topProducts: topProducts.map((t) => ({
          productId: t._id.productId,
          title: t._id.title,
          unitsSold: t.unitsSold,
          revenue: t.revenue,
        })),
        recentReviews: recentReviews.map((r) => ({
          productTitle: r.productId?.title || 'Unknown',
          rating: r.rating,
          comment: r.comment,
          userName: r.userName,
          createdAt: r.createdAt,
        })),
      },
    });
  } catch (err) {
    console.error('metrics overview error', err);
    return res.status(500).json({ success: false, message: 'Failed to load metrics' });
  }
};
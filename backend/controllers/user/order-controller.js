const crypto = require('crypto');
const razorpay = require('../../config/razorpay');
const Order = require('../../models/Order'); // adjust if your Order model path differs

// create razorpay order
exports.createRazorpayOrder = async (req, res) => {
  try {
    const { amount, currency = 'INR', receiptId } = req.body;
    if (!amount) return res.status(400).json({ message: 'Amount required' });

    const options = {
      amount: Math.round(Number(amount) * 100), // paise
      currency,
      receipt: receiptId || `rcpt_${Date.now()}`,
      payment_capture: 1,
    };

    const rOrder = await razorpay.orders.create(options);
    return res.json({ order: rOrder });
  } catch (err) {
    console.error('createRazorpayOrder', err);
    return res.status(500).json({ message: 'Razorpay order creation failed' });
  }
};

// Create DB order and Razorpay order in one step (frontend calls this)
exports.createRazorpayCheckoutOrder = async (req, res) => {
  try {
    const {
      userId,
      cartItems,
      addressInfo,
      totalAmount,
    } = req.body;

    if (!userId || !Array.isArray(cartItems) || !addressInfo || !totalAmount) {
      return res.status(400).json({ message: 'Invalid order data' });
    }

    const newOrder = await Order.create({
      userId,
      cartItems,
      addressInfo,
      orderStatus: 'pending',
      paymentMethod: 'razorpay',
      paymentStatus: 'pending',
      totalAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: '',
      playerId: '',
    });

    const options = {
      amount: Math.round(Number(totalAmount) * 100),
      currency: 'INR',
      receipt: `rcpt_${newOrder._id}`,
      payment_capture: 1,
    };
    const rOrder = await razorpay.orders.create(options);

    await Order.findByIdAndUpdate(newOrder._id, {
      paymentId: rOrder.id,
      orderUpdateDate: new Date(),
    });

    return res.json({ order: rOrder, dbOrderId: newOrder._id });
  } catch (err) {
    console.error('createRazorpayCheckoutOrder', err);
    return res.status(500).json({ message: 'Failed to create checkout order' });
  }
};

// verify payment coming from frontend
exports.verifyRazorpayPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ message: 'Missing payment fields' });
    }

    const generated_signature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || '')
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (generated_signature !== razorpay_signature) {
      return res.status(400).json({ valid: false, message: 'Invalid signature' });
    }

    if (orderId) {
      await Order.findByIdAndUpdate(orderId, {
        paymentStatus: 'paid',
        orderStatus: 'confirmed',
        paymentId: razorpay_payment_id,
        orderUpdateDate: new Date(),
      });
    }

    return res.json({ valid: true });
  } catch (err) {
    console.error('verifyRazorpayPayment', err);
    return res.status(500).json({ message: 'Verification failed' });
  }
}
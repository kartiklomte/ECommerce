const paypal = require('../../config/paypal');
const Order = require('../../models/Order');

const createOrder = async (req, res) => {
  try {
    const {userId,cartItems,addressInfo,orderStatus,paymentMethod,paymentStatus,totalAmount,orderDate,orderUpdateDate,paymentId,playerId,} = req.body;
    

    const create_payment_json = {
        intent: 'sale',
        payer: {
            payment_method: 'paypal'
        },
        redirect_urls: {
            return_url:"http://localhost:5173/user/paypal-return",
            cancel_url: "http://localhost:5173/user/paypal-cancel"
        },
        transactions: [{
            item_list: {
              items: cartItems.map((item) => ({
                name: item.title,
                sku: item.productId,
                price: item.price.toFixed(2),
                currency: "USD",
                quantity: item.quantity,
              })),
          },
            amount: {
            currency: "USD",
            total: totalAmount.toFixed(2),
          },
            description: "This is the payment description.",
        }]
    };
    
    
    paypal.payment.create(create_payment_json, async(error, paymentInfo)=>{
      if (error) {
        return res.status(500).json({
          success: false,
          message: "Error while creating paypal payment",
        });
      } else {
           // 2. Save in Database
        const newlyCreatedOrder = new Order({userId,cartItems,addressInfo,orderStatus,paymentMethod,paymentStatus,totalAmount,orderDate,orderUpdateDate,paymentId,playerId,});

        await newlyCreatedOrder.save();

        // 3. Get approval link for client
        const approvalURL = paymentInfo.links.find((link) => link.rel === "approval_url").href;

        res.status(201).json({
          success: true,
          approvalURL,
          orderId: newlyCreatedOrder._id,
        });
        }
    });

    
    
  } catch (error) {
    console.error("PayPal createOrder error:", error);
    res.status(500).json({
      success: false,
      message: "create order failed",
    });
  }
};

const capturePayment = async(req,res)=>{
    try {
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "order detail not got"
        });
        
    }
}

module.exports = { createOrder };
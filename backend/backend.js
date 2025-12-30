const express = require('express');
const dotenv = require('dotenv');
const dbconn = require('./config/db');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRouter = require('./routes/auth/auth-routes');
const productRouter = require('./routes/admin/products-routes');
const userProductRouter = require('./routes/user/products-routes');
const userCartRouter = require('./routes/user/cart-routes');
const userAddressRouter = require('./routes/user/address-routes');
const userOrderRouter = require('./routes/user/order-route');
const razorpayRoutes = require('./routes/user/order-route');
const userReviewRouter = require('./routes/user/reviews-routes');
const adminMetricsRouter = require('./routes/admin/metrics-routes');

//initialization of the app 
const app = express();

//integreting the env file
dotenv.config();

// taking port form the .env file
const port = process.env.PORT;

//connecting the database
dbconn();

// implementation of the cords,cookieParser and json
app.use(
    cors({
        origin : process.env.FRONTEND_URL || '*',
        credentials: true  ,
        methods : ['GET','POST','DELETE','PUT','OPTIONS'],
        allowedHeaders : [
            'Content-Type',
            'Authorization',
            'cache-control',
            'Expires',
            'Pragma'
        ],
    })
);

// Fix Express 5 wildcard: match all paths with a regex for preflight
app.options(/.*/, cors());

app.use(cookieParser())
app.use(express.json());
app.use('/api/auth',authRouter);
app.use('/api/admin/products',productRouter);
app.use('/api/user/products',userProductRouter);
app.use('/api/user/cart',userCartRouter);
app.use('/api/user/address',userAddressRouter);
// mount user order routes (if needed elsewhere)
app.use('/api/user/order',userOrderRouter);

// add raw body middleware for webhook path
app.use('/api/payments/razorpay/webhook', express.raw({ type: 'application/json' }), (req, res, next) => {
  req.rawBody = req.body && Buffer.isBuffer(req.body) ? req.body.toString('utf8') : req.rawBody;
  next();
});

// ensure JSON middleware is still used for other routes
app.use(express.json());

// mount razorpay routes with clean paths
app.use('/api/payments/razorpay', razorpayRoutes);

// mount user reviews routes
app.use('/api/user/reviews', userReviewRouter);
// mount admin metrics routes
app.use('/api/admin/metrics', adminMetricsRouter);

app.get('/', (req, res) => {
  res.send('Backend is running!');
});

//implenting app listener port
app.listen(port,()=>{
    console.log(`app is running on port ${port}`);
})

module.exports = app;


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

//initialization of the app
const app = express();

//integreting the env file
dotenv.config();

// taking port form the .env file
const port = process.env.port;

//connecting the database
dbconn();

// implementation of the cords,cookieParser and json
app.use(
    cors({
        origin : 'http://localhost:5173',
        credentials: true  ,
        methods : ['GET','POST','DELETE','PUT'],
        allowedHeaders : [
            'Content-Type',
            'Authorization',
            'cache-control',
            'Expires',
            'Pragma'
        ],
    })
)

app.use(cookieParser());
app.use(express.json());
app.use('/api/auth',authRouter);
app.use('/api/admin/products',productRouter);
app.use('/api/user/products',userProductRouter);
app.use('/api/user/cart',userCartRouter);
app.use('/api/user/address',userAddressRouter);
app.use('/api/user/order',userOrderRouter);

//implenting app listner port
app.listen(port,()=>{
    console.log(`app is running on port ${port}`);
})


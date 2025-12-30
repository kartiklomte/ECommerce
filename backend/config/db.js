const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connDB = async ()=>{
    try {
        const uri = process.env.DBATLAST_URL;
        if (!uri) {
            console.error('MongoDB URI missing. Set `DBATLAS_URL` or `MONGODB_URI` in .env');
            process.exit(1);
        }
        await mongoose.connect(uri);
        console.log('mongoDB connected successfully');
    } catch (error) {
        console.log(`${error}`);
        process.exit(1);
    }
}

module.exports = connDB;
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connDB = async ()=>{
    try {
        const conn = await mongoose.connect(process.env.DBATLAST_URL);
        console.log('mongoDB connected successfully');
    } catch (error) {
        console.log(`${error}`);
        process.exit(1);
    }
}

module.exports = connDB;
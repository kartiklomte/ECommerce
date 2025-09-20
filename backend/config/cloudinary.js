const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const dotenv = require('dotenv');

dotenv.config();

// for connecting the cloudinary. 
cloudinary.config({
    cloud_name: process.env.cloudName, 
    api_key: process.env.apiKey, 
    api_secret: process.env.apiSecret
});

const storage = new multer.memoryStorage();

//function for uploading the image to the cloud 
async function ImageUploadUtil(file) {
    const result = await cloudinary.uploader.upload(file,{
        resource_type : 'auto'
    });

    return result;
}

const upload = multer({storage});

module.exports = {upload, ImageUploadUtil}
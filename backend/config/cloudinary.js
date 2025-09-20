const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const dotenv = require('dotenv');

dotenv.config();

// for connecting the cloudinary. 
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET
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
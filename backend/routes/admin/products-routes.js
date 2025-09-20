const express = require('express');
const { handleImageUpload, addProduct, viewProducts, editProduct, deleteProduct } = require('../../controllers/admin/products-controller');
const { upload } = require('../../config/cloudinary');
const router = express.Router();

router.post('/upload-img',upload.single("my_file"),handleImageUpload);
router.post('/addProduct',addProduct);
router.get('/viewProducts',viewProducts);
router.put('/editProduct/:id',editProduct);
router.delete('/deleteProduct/:id',deleteProduct);

module.exports = router;
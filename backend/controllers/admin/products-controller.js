const { ImageUploadUtil } = require("../../config/cloudinary");
const Product = require("../../models/Product");

// this function will handle the image upload proccess and getting url of it
const handleImageUpload = async (req,res)=>{
    try {
        const b64 = Buffer.from(req.file.buffer).toString('base64');
        const url = `data:${req.file.mimetype};base64,${b64}`;
        const result = await ImageUploadUtil(url);
        
        res.status(200).json({
            success : true,
            result 
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success : false,
            message : 'error while uploading the image'
        });
    }
}

//add product function controller
const addProduct = async (req,res)=>{
    try {
        const { image, title, description, category, brand, price, salePrice,totalStock} = req.body;
        const newProduct = new Product({image, title, description, category, brand, price, salePrice,totalStock});

        await newProduct.save();

        res.status(201).json({
            success : true,
            message : "prduct added successsfully",
            data : newProduct
        });

    } catch (error) {
        res.status(500).json({
            success : false,
            message : "error occure while adding product"
        });
    }
}

//view products function controller
const viewProducts = async (req,res)=>{
    try {
        const allProducts = await Product.find({});
        res.status(200).json({
            success : true,
            data : allProducts
        });
    } catch (error) {
        res.status(500).json({
            success : false,
            message : "error occure while loading list of products"
        });
    }
}

//edit product function controller
const editProduct = async (req,res)=>{
    try {
        const {id} = req.params;
        const { image, title, description, category, brand, price, salePrice,totalStock} = req.body;

        const findProduct = await Product.findById(id);
        if(!findProduct){
            return res.status(404).json({
                success : false,
                message : "product not found"
            });
        }

        findProduct.title = title || findProduct.title;
        findProduct.description = description || findProduct.description;
        findProduct.category = category || findProduct.category;
        findProduct.brand = brand || findProduct.brand;
        findProduct.price = price || findProduct.price;
        findProduct.salePrice = salePrice || findProduct.salePrice;
        findProduct.totalStock = totalStock || findProduct.totalStock;
        findProduct.image = image || findProduct.image;

        await findProduct.save();

        res.status(200).json({
            success : true,
            message : "product updated successfull",
            data : findProduct
        });
        
    } catch (error) {
        res.status(500).json({
            success : false,
            message : "error occure while adding product"
        });
    }
}

//delete product function controller 
const deleteProduct = async (req,res)=>{
    try {
        const {id} = req.params;
        const findProduct = await Product.findById(id);
        if(!findProduct){
            return res.status(404).json({
                success : false,
                message : "product not found"
            });
        }

        await Product.findByIdAndDelete(id);

        res.status(200).json({
            success : true,
            message : "product deleted successfull"
        });

    } catch (error) {
        res.status(500).json({
            success : false,
            message : "error occure while adding product"
        });
    }
}

module.exports = {handleImageUpload , addProduct, viewProducts, editProduct, deleteProduct};
const Product = require('../../models/Product')

// for getting data of the products based on selected filters
const getFilterProducts = async (req,res) => {
    try {

        const {category='',brand='',sortBy="price-lowtohigh"} = req.query;

        let filters = {}; //object to store the array of catagory and brand to store the filters

        // take out the catagory from the URL
        if(category && category.trim().length>0 && category!==','){
            filters.category = {$in: category.split(',')}
        }

        // take out the brand from the URL
        if(brand && brand.trim().length>0){
            filters.brand = {$in: brand.split(',')}
        }

        let sort = {}

        switch (sortBy) {
            case "price-lowtohigh":
                sort.price = 1;
                break;

            case "price-hightolow":
                sort.price = -1;
                break;

            case "title-atoz":
                sort.title = 1;
                break;

            case "title-ztoa":
                sort.title = -1;
                break;
        
            default: 
                sort.price = 1;
                break;
        }

        const products = await Product.find(filters).sort(sort);
        res.status(200).json({
            success : true,
            data : products
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success : false,
            message : "error occur while geting data of filter products"
        });
    }
}

// for getting data of product(one) based on id
const getProductDetails = async (req,res) => {
    try {
        const id = req.params.id;
        const product = await Product.findById(id);

        if(!product){
            return res.status(404).json({
                success : false,
                message : "Product not found"
            });
        }

        res.status(200).json({
            success : true,
            data : product
        })
        
    } catch (error) {
        console.log(error);
        
        res.status(500).json({
            success : false,
            message : "error happen while loading product details"
        });
    }
}

module.exports = { getFilterProducts , getProductDetails };
const Address = require("../../models/Address");

// for adding address
const addAddress = async(req,res)=>{
    try {
        const {userId, address, city, pincode, phone, notes} = req.body;

         //check if all the parameter are present in the requset body.
        if(!userId || !address || !city || !pincode || !phone || !notes){
            console.log("error occur while loading the user address info");
            return res.status(500).json({
                success : false,
                message : "error not all info of address is given"
            })
        }

        // create new entry for the model
        const newAddress = new Address({
            userId, address, city, pincode, phone, notes
        })

        // save the created entry
        await newAddress.save();

        res.status(201).json({
            success : true,
            data : newAddress  
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success : false,
            message : "error occur while adding address"
        })
    }
}

// for getting all the address store
const fetchAllAddress = async(req,res)=>{
    try {
        const {userId} = req.params;

        //check if userId is present in the requset body.
        if(!userId){
            console.log("error occur while loading the userid");
            return res.status(500).json({
                success : false,
                message : "userId is missing"
            })
        }

        //fetch all the address
        const addressList = await Address.find({userId})

        if(!addressList){
            console.log("no data found");
            
        }

        res.status(200).json({
            success : true,
            data : addressList
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success : false,
            message : "error occur while fetching addresses"
        })
    }
}

// for editing the selected address
const editAddress = async(req,res)=>{
    try {
        const {userId,addressId} = req.params;
        const formData = req.body;

        //check if all the parameter are present in the requset body.
        if(!userId || !addressId ){
            console.log("error occur while editing the user address info");
            return res.status(500).json({
                success : false,
                message : "error userid or address id not got"
            })
        }

        const address = await Address.findOneAndUpdate({
            _id : addressId, userId
        }, formData ,{new : true});

        if(!address){
            return res.status(404).json({
                success : false,
                message : "address not found"
            })
        }

        res.status(200).json({
            success : true,  
            data : address
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success : false,
            message : "error occur while adding address"
        })
    }
}

// for deleting address
const deleteAddress = async(req,res)=>{
    try {
        const {userId,addressId} = req.params;

        //check if all the parameter are present in the requset body.
        if(!userId || !addressId ){
            console.log("error occur while editing the user address info");
            return res.status(500).json({
                success : false,
                message : "error userid or address id not got"
            })
        }

        const address = await Address.findOneAndDelete({ _id : addressId, userId});

        res.status(200).json({
            success : true,  
            data : address
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success : false,
            message : "error occur while adding address"
        })
    }
}

module.exports = {addAddress , fetchAllAddress , editAddress , deleteAddress}
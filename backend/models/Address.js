const mongoos = require('mongoose');

const AddressSchema = new mongoos.Schema({
    userId : String,
    address : String,
    city : String,
    pincode : String,
    phone : String,
    notes : String
},{timestamps : true});

module.exports = mongoos.model("Address",AddressSchema);
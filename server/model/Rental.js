
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// * RENTAL SCHEMA

// userID
// Name
// Description
// Address
// Image
// Price

const rentalSchema = new mongoose.Schema({
    userId:{
        type:String,
        required: true
    },
    propertyIdOnBlockChain: {
        type: Number,
        required: true,
    },
    transactionHash: {
        type: String,
        required: true,
    },
    propertyOwnershipHash: {
        type: String,
        required: true,
    },
    name:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    address:{
        type: String,
        required: true,
        max: 255,
        min: 6,
    },
    rentalImage:{
        type: String,
        required:true
    },
    ownerShip:{
        type: String,
        required:true
    },
    available:{
        type: Boolean,
        default:true
    },
    price:{
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    tenant: {
        type: Schema.Types.ObjectId,
        ref : "User"

    }
});



module.exports = mongoose.model('Rental', rentalSchema);
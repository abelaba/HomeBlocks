const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rentalSchema = new mongoose.Schema({
    userId: {
        type: String,
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
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
        max: 255,
        min: 6,
    },
    coordinates: {
        type: {
            lat: Number,
            lng: Number,
        },
        required: true,
    },
    rentalImage: {
        type: String,
        required: true
    },
    ownerShip: {
        type: String,
        required: true
    },
    available: {
        type: Boolean,
        default: true
    },
    propertyType: {
        type: String,
        required: true,
    },
    numBedrooms: {
        type: Number,
        required: true,
    },
    numBathrooms: {
        type: Number,
        required: true,
    },
    totalArea: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    tenant: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

module.exports = mongoose.model('Rental', rentalSchema);
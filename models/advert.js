const mongoose = require('mongoose');
const BaseAuditableEntity = require('./BaseAuditableEntity');
const DataFileSchema = require('./DataFile');
const CategorySchema = require('./Category');

const AdvertSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    advertReference: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    location: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true,
        required: false
    },
    imageUrls: [String],
    createdAt: {
        type: Date,
        default: Date.now
    },
    modifiedAt: {
        type: Date,
        default: Date.now
    },

    //base properties
    id: {
        type: String,
        required: false,
        //unique: true,
        //autoIncrement: true
    },
    creationTime: {
        type: Date,
        default: Date.now
    },
    creatorUserId: {
        type: String,
        default: null,
        required: false
    },
    deleterUserId: {
        type: String,
        default: null,
        required: false
    },
    deletionTime: {
        type: Date,
        default: null,
        required: false
    },
    isDeleted: {
        type: Boolean,
        default: false,
        required: false
    },
    lastModificationTime: {
        type: Date,
        default: null,
        required: false
    },
    lastModifierUserId: {
        type: String,
        default: null,
        required: false
    },

    //commented out
    // Images: [DataFileSchema],
    // Category: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Category',
    //     required: true
    // },

    //to be tested later
    //...BaseAuditableEntity.schema.obj
});

module.exports = mongoose.model("Advert", AdvertSchema);
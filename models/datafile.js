const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DataFileSchema = new Schema({
    name: { type: String, required: true },
    size: { type: Number },
    mimeType: { type: String },
    //createdAt: { type: Date, default: Date.now },
    //modifiedAt: { type: Date, default: Date.now },
    path: { type: String },
    isReadOnly: { type: Boolean },
    extension: { type: String },
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
});

const DataFile = mongoose.model('DataFile', DataFileSchema);

module.exports = DataFile;
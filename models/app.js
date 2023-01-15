const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AppSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    //createdAt: { type: Date, default: Date.now },
    //modifiedAt: { type: Date, default: Date.now },
    // creator: { type: Schema.Types.ObjectId, ref: 'ApplicationUser' },
    price: { type: Number },
    rating: { type: Number },
    //category: { type: Schema.Types.ObjectId, ref: 'Category' },
    version: { type: String },
    screenshots: [{ type: Schema.Types.ObjectId, ref: 'DataFile' }],
    releaseNotes: { type: String },
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

module.exports = mongoose.model('App', AppSchema)
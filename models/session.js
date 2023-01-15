const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SessionSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    //createdAt: { type: Date, default: Date.now },
    //modifiedAt: { type: Date, default: Date.now },
    // creator: { type: Schema.Types.ObjectId, ref: 'ApplicationUser' },
    participants: [{ type: Schema.Types.ObjectId, ref: 'ApplicationUser' }],
    status: { type: String },
    //ideas: [{ type: Schema.Types.ObjectId, ref: 'Idea' }],
    type: { type: String },
    duration: { type: Number },
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

const Session = mongoose.model('Session', SessionSchema);

module.exports = Session
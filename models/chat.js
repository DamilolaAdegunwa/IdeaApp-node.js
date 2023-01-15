const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatSchema = new Schema({
    name: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    modifiedAt: { type: Date, default: Date.now },
    members: [{ type: Schema.Types.ObjectId, ref: 'ApplicationUser' }],
    messages: [{ type: Schema.Types.ObjectId, ref: 'ChatMessage' }],
    type: { type: String },
    status: { type: String },
    picture: { type: Schema.Types.ObjectId, ref: 'DataFile' },
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

const Chat = mongoose.model('Chat', ChatSchema);

module.exports = Chat;
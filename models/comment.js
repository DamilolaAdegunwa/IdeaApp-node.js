const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    text: { type: String, required: true },
    //createdAt: { type: Date, default: Date.now },
    // creator: { type: Schema.Types.ObjectId, ref: 'ApplicationUser' },
    rating: { type: Number },
    status: { type: String },
    // comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    content: { type: String },
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
const Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;
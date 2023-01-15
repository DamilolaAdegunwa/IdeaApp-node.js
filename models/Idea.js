const mongoose = require('mongoose')
const IdeaSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'must provide title'],
        trim: true,
        maxlength: [100, 'name can not be more than 100 characters']
    },
    description: {
        type: String,
        required: [true, 'must provide description'],
        trim: true,
        maxlength: [1_000_000, 'description can not be more than 1,000,000 characters']
    },
    content: {
        type: String,
        required: [true, 'must provide content'],
        trim: true,
        maxlength: [1_000_000, 'content can not be more than 1,000,000 characters']
    },
    status: {
        type: String,
        required: [true, 'must provide status'],
        enum: ['pending', 'approved']
    },
    rating: {
        type: Number,
        default: 0
    },
    // category: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Category'
    // },
    category: {
        type: Number,
        required: [true, 'must provide category'],
    },
    // tags: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Tag'
    // }],
    tags: [{
        type: Number,
        required: false,
    }],
    // comments: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Comment'
    // }],
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    },
    id: {
        type: Number,
    },
    creatorId: {
      type: Number,
      required: [true, 'must provide a userId'],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
});
module.exports = mongoose.model('Idea', IdeaSchema)
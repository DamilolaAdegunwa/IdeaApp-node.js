const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserGroupSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    //createdAt: { type: Date, default: Date.now },
    //modifiedAt: { type: Date, default: Date.now },
    // creator: { type: Schema.Types.ObjectId, ref: 'ApplicationUser' },
    members: [{ type: Schema.Types.ObjectId, ref: 'ApplicationUser' }],
    //picture: { type: Schema.Types.ObjectId, ref: 'DataFile' },
    picturePath: { type: String },
    policy: { type: String },
    type: { type: String },
    //tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
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

const UserGroup = mongoose.model('UserGroup', UserGroupSchema);

module.exports = UserGroup;
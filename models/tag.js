const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tagSchema = new Schema({
name: { type: String, required: true },
count: { type: Number, default: 0 },
lastUsed: { type: Date },
//Users: [{ type: Schema.Types.ObjectId, ref: 'ApplicationUser' }],
description: { type: String },
//RelatedTags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
relatedTags: [String],
isActive: { type: Boolean, default: true }
});

const Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;
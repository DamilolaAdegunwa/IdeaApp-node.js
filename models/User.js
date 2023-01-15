const mongoose = require('mongoose')
const { Schema } = mongoose;

const UserSchema = new Schema({
id: {
type: String,
// type: mongoose.Types.ObjectId,
//required: true,
required: false,
},
isActive: {
    type: Boolean,
    default: false,
  },
userName: {
    type: String,
    required: [true, 'must provide UserName'],
    trim: true,
    maxlength: [100, 'UserName can not be more than 100 characters'],
    unique: true,
},
normalizedUserName: {
type: String,
required: false,
},
email: {
    type: String,
    required: [true, 'must provide an email address'],
    trim: true,
    maxlength: [200, 'name can not be more than 200 characters'],
unique: true,
},
normalizedEmail: {
type: String,
required: false,
},
emailConfirmed: {
type: Boolean,
//required: true,
default: false,
},
passwordHash: {
type: String,
required: false,
},
securityStamp: {
type: String,
required: false,
},
concurrencyStamp: {
type: String,
required: false,
},
phoneNumber: {
// type: String,
// required: false,
type: String,
    required: [true, 'must provide an email address'],
    trim: true,
    maxlength: [20, 'name can not be more than 20 characters'],
},
phoneNumberConfirmed: {
type: Boolean,
//required: true,
required: false,
default: false,
},
twoFactorEnabled: {
type: Boolean,
required: true,
required: false,
default:false
},
lockoutEnd: {
type: Date,
required: false,
},
lockoutEnabled: {
type: Boolean,
required: false,
default:false
},
accessFailedCount: {
type: Number,
//required: true,
required: false,
},
refreshToken: {
type: String,
required: false,
},
accountConfirmationCode: {
type: String,
required: false,
},
userType: {
    type: String,
    required: [true, 'must provide status'],
    enum: ['Customer', 'Administrator'],
    default: 'Customer'
},
});

module.exports = mongoose.model('User', UserSchema);
const BaseSchema = new mongoose.Schema({
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
    }
});

module.exports = mongoose.model("Base", BaseSchema);
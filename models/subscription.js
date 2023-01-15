const SubscriptionSchema = new mongoose.Schema({
    Id: { type: Number, required: true },
    StartDate: { type: Date, required: true },
    ExpirationDate: { type: Date, required: true },
    Status: { type: SubscriptionStatus, required: true },
    PaymentMethod: { type: PaymentMethod, required: true },
    User: { type: mongoose.Schema.Types.ObjectId, ref: "ApplicationUser", required: true },
    Product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    Price: { type: Number, required: true },
    RenewalInterval: { type: Number, required: true },
    AutoRenew: { type: Boolean, required: true },
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
    
    const Subscription = mongoose.model("Subscription", SubscriptionSchema);
    
    module.exports = Subscription;
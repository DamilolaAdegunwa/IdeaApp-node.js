const mongoose = require("mongoose");

const RoleSchema = new mongoose.Schema({
    Id: {
        type: String,
        required: true
    },
    Name: {
        type: String
    },
    NormalizedName: {
        type: String
    },
    ConcurrencyStamp: {
        type: String
    }
});

const Role = mongoose.model("Role", RoleSchema);

module.exports = Role;
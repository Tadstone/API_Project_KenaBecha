const mongoose = require('mongoose')

const userBankSchema = new mongoose.Schema({
        userName: {
            type: String,
            required: true,
            unique: true
        },
        accountId: {
            type: String,
            required: true,
            unique: true
        },
        secretkey: {
            type: String,
            required: true,
            unique: true
        },
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("UserBankInfo", userBankSchema);

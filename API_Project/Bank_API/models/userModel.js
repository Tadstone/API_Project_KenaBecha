const mongoose = require('mongoose');

const userBankInfo = new mongoose.Schema({
    fullName: {
        type: String,
    },
    // gender:{
    //     type: String
    // },
    // email:{
    //     type: String
    // },
    // profession:{
    //     type: String
    // }, 
    accountId: {
        type: String,
        // required: true,
        // unique: true
    },
    secretkey: {
        type: String,
    }, 
    amount:{
        type: Number,
    }
},
{
    timestamps: true
}
)


module.exports = mongoose.model("bankAccDetail", userBankInfo);
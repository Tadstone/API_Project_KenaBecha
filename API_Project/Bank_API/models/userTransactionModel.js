const mongoose = require('mongoose')

const UserTransactionInfo = new mongoose.Schema({
    accountId:{
        type: String
    },
    transactionId:{
        type: String
    },
    amount:{
        type: Number
    },
    orderID:{
        type: String
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('transactionInfo', UserTransactionInfo)
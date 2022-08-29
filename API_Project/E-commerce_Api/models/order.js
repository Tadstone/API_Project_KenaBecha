const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    userID: {
        type: String,
        required: true,
    },
    product:[
        {
            productID: { type: Number },
            quantity :{ type: Number, default: 1},   
        }
    ],
    amount: {  type: Number, require: true } ,
    address: { type: Object, required: true },
    status: {  type: String, default: "pending"}
},
{
    timestamps: true
}
);

module.exports = mongoose.model("OrderModel", orderSchema)
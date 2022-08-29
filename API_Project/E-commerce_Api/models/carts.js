const mongoose = require('mongoose')

const cartSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true
    }
},
{
    timestamps: true
}
);

module.exports = mongoose.model("CartModel", cartSchema)
const Cart = require("../models/carts");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyTokden");
const router = require("express").Router();
const express = require("express");


// NEW CART......................

router.post('/add', verifyToken, async(req, res)=>{
    const newCart = new Cart(req.body)
    console.log(newCart);
    try {
        const cart = await newCart.save();
        res.send(cart);
    } catch (err) {
        res.send(err);
    }
})


// UPDATE cart
router.put('/update/:id', verifyTokenAndAuthorization, async (req, res)=>{
    try {
        const searchCart = await Cart.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, 
        { new: true});
        res.send(searchCart);

    } catch (err) {
        res.send(err);
    }

})

// DELETE CART, cart section theke
router.delete('/delete/:id', verifyTokenAndAuthorization, async (req, res)=>{
    try {
        const deleteCart = await Cart.findByIdAndDelete(req.params.id)
        console.log(deleteCart);
        res.send("Cart deleted...!")
    } catch (error) {
        req.send(error);
    }
})

//user cart e ki ki add korche ........
router.get('/find/:id', verifyTokenAndAuthorization, async (req, res)=>{
    try {
        console.log("Ashce...")
        const searchCart = await Cart.findOne({ userID: req.params.id })
        console.log("---->". searchCart);
        res.send(searchCart);
    } catch (err) {
        res.send(err);
    }    
})

// GET ALL CARTS
router.get('/', verifyTokenAndAdmin, async (req, res)=>{
    try {
        const carts = await Cart.find();
        res.send(carts);
    }catch (err) {
        res.send(err)
    }
})



module.exports = router;
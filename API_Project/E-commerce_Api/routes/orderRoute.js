const Order = require("../models/order");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyTokden");
const router = require("express").Router();
const express = require("express");


// CREATE NEW ORDER
router.post('/.add', verifyToken, async(req, res)=>{
    const new_order = new Order(req.body)
    // console.log(new_order);
    try {
        const order = await new_order.save();
        res.send(order);
    } catch (err) {
        res.send(err);
    }
})


// UPDATE ORDER (halka ektu problem ase)
router.put('/update/:id', verifyTokenAndAdmin, async (req, res)=>{
    try {
        // console.log("ashci")
        console.log(req.params.id)
        const order = await Order.findOne({ userID: req.params.id })
        const search_cart = await Order.updateOne(order, {
            $set: req.body
        }, 
        { new: true});
        // console.log("->", order)
        // console.log("--->", srchedProduct);
        res.send(search_cart);
        console.log("done...");
    } catch (err) {
        res.send(err);
    }

})

// DELETE ORDER
router.delete('/delete/:id', verifyTokenAndAdmin, async (req, res)=>{
    try {

        const order = await Order.findOne({ userID: req.params.id });
        const deletedOrder = await Order.remove(order);
        console.log("--->", order);
        res.send("Order deleted...!")


    } catch (error) {

        req.send(error);
    }
})

//GET USER ORDER
router.get('/find/:id', verifyTokenAndAuthorization, async (req, res)=>{
    try {

        console.log("Ashce...")
        const search_cart = await Order.find({ userID: req.params.id })
        // console.log("---->". search_cart);
        res.send(search_cart);
    } catch (err) {
        res.send(err);
    }    
})

// GET ALL ORDERS
router.get('/', verifyTokenAndAdmin, async (req, res)=>{
    try {
        const orders = await Order.find();
        res.send(orders);
    }catch (err) {
        res.send(err)
    }
})

// GET MONTHLY INCOME
router.get('/income', verifyTokenAndAdmin, async (req, res)=>{


    const date = new Date();
    const prevMonth =new Date(date.setMonth(date.getMonth() -1))
    const prev2ndMonth = new Date(new Date().setMonth(prevMonth.getMonth()-1))

    
    // console.log(date,'\n', prevMonth,'\n', prev2ndMonth);

    try {
        const income = await Order.aggregate([
            { $match: {createdAt: {$gte: prev2ndMonth }}},
            {
                $project:{
                    month: { $month: "$createdAt"},
                    sales: "$amount"
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: "$sales" }
                }
            }
        ])
        res.send(income);
    } catch (err) {
        res.send(err);
    }
})



module.exports = router;
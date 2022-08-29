const Product = require("../models/product");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyTokden");
const router = require("express").Router();
const CryptoJS = require('crypto-js');
const express = require("express");


/// new porduct create......
router.post('/add', async(req, res)=>{
    const new_product = new Product(req.body)
    // console.log(new_product);
    try {
        const createdProduct = await new_product.save();
        res.send(createdProduct);
    } catch (err) {
        res.send(err);
    }
})


// UPDATE
router.put('/update/:id', verifyTokenAndAdmin, async (req, res)=>{
    try {
        const search_product = await Product.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, 
        { new: true});
        // console.log("--->", search_product);
        res.send(search_product);

    } catch (err) {
        res.send(err);
    }

})

// DELETE
router.delete('/delete/:id', verifyTokenAndAdmin, async (req, res)=>{
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id)
        // console.log(deletedProduct);
        res.send("Product deleted...!")
    } catch (error) {
        req.send(error);
    }
})

//GET PRODUCT
router.get('/find/:id', async (req, res)=>{
    try {
        // console.log("Ashce...")
        const search_product = await Product.findById(req.params.id);
        console.log("---->". search_product);
        res.send(search_product);
    } catch (err) {
        res.send(err);
    }    
})

// GET ALL PRODUCTS
router.get('/', async (req, res)=>{

    const qNew = req.query.new;
    const qCategory = req.query.category;
    console.log(qNew, qCategory);
    
    try {

        let products;
        if(qNew){
            console.log("Ashce..")
            products = await Product.find().sort({ createdAt: -1 }).limit(1);
            // res.send(recentProducts)
        }
        else if(qCategory){
            // If the category query is inside of that array that we defined 
            // in PRODUCT model, we're gonna fetch all product of that category.
            products = await Product.find({
                categories: {
                    $in: [qCategory]
                }
            })
            // res.send(categorizedProducts);
        }
        else{
            // console.log("ASHCE.")
            products = await Product.find();
            // res.send(products);
        }
        res.send(products)
    }catch (err) {
        res.send(err)
    }

})



module.exports = router;
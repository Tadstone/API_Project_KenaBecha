const User = require("../models/user");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyTokden");
const router = require("express").Router();
const CryptoJS = require('crypto-js');
// const user = require("../models/user");


// UPDATE
router.put('/update/:id', verifyTokenAndAuthorization, async (req, res)=>{
    if(req.body.password){
        req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC_KEY).toString()
    }
    try {
        const update_user = await User.findByIdAndUpdate(req.params.id, {
            // userName: req.body.userName,
            // email: req.body.email,
            // password: req.body.password,
            $set: req.body
        }, {new: true })
        
        console.log(update_user);
        res.send(update_user);

    } catch (error) {
        res.send(error);
    }

})

// DELETE
router.delete('/delete/:id', verifyTokenAndAuthorization, async (req, res)=>{
    try {
        const delete_user = await User.findById(req.params.id)
        console.log(delete_user);

        await User.findByIdAndDelete(req.params.id)
        res.send("User has been deleted!")
    } catch (error) {
        res.send(error);
    }
})

//GET USER
router.get('/find/:id', verifyTokenAndAdmin, async (req, res)=>{
    try {
        const srchedUser = await User.findById(req.params.id)
        // console.log(srchedUser);

        // sending the info without password
        // console.log("Hey...", srchedUser)
        const {password, ...others} = srchedUser._doc;
        console.log("-->", others)
        res.send(others);

    } catch (error) {
        res.send(error);
    }
})

// GET ALL USER
router.get('/', verifyTokenAndAdmin, async (req, res)=>{
    const query = req.query.new;
    try {
        const allUser = query 
        ? await User.find().sort({ _id: -1 }).limit(5) 
        : await User.find()
        // console.log(srchedUser);
        res.send(allUser);
//errror message
    } catch (error) {
        res.send(error);
    }
})

// GET USER STATS
router.get('/stats', verifyTokenAndAdmin, async (req, res)=>{
    const date = new Date();
    // console.log(date);
    const prevYear = new Date(date.setFullYear(date.getFullYear() - 1))
    // console.log(prevYear)

    try {
        // console.log("Ashci");
        const data = await User.aggregate([
            {
                $match: { 
                    createdAt: { $gte: prevYear } 
                }  
            },
            {
                $project: {  
                    month: { $month: "$createdAt" },
                },  
            },
            {
                $group:{
                    _id: "$month",
                    total: { $sum: 1 },
                },
            },
        ])
        // console.log("--->", data);
        res.send(data);

    } catch (err){
        res.send(err)
    }
})



module.exports = router;
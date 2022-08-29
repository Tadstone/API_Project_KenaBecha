const router = require('express').Router();
const User = require('../models/userModel')
const CryptoJS = require('crypto-js')

let accNo = 19982022000;

router.post('/register', async (req, res)=>{

    const lastUser = await User.find().sort({ _id:-1 }).limit(1);
    // console.log(lastUser[0]);
    if(lastUser[0]) {
         accNo = Number(lastUser[0].accountId);
    }

    const newUser = new User({
        fullName: req.body.fullName,
        // gender: req.body.gender,
        // email:req.body.email,
        // profession: req.body.profession,

        accountId: accNo+1,
        secretkey: CryptoJS.AES.encrypt(req.body.secretkey, process.env.PASS_SEC_KEY), 
        amount: req.body.amount
    })

    try {
        const createdUser = await newUser.save();
        // console.log(savedUser);
        res.send(createdUser);
    } catch (err) {
        res.send(err);
    }
})

module.exports = router;

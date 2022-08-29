const User = require('../models/user');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
const router = require('express').Router();


/// Ekhane new user er data niye database e save korechi.........
router.post('/register', async (req, res)=>{

    /// kono data null kina check korsi.........
    
    
    const newUser = new User({

        userName : req.body.userName,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC_KEY).toString()

    })


     ///console.log(newUser)
    try {
        ///console.log("Ashce...")
        const savedUser = await newUser.save();
        console.log(newUser);
        res.send(savedUser);
    }catch (err) {
        res.send(err);
    }
});




///LOGIN part ta ekhane korechi.......
router.post('/login', async (req, res)=>{
    try {
        const user = await User.findOne({ userName: req.body.userName })
        if(!user) res.send("Wrong Identity...!")

        const decrypted_password = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC_KEY);
        const original_password = decrypted_password.toString(CryptoJS.enc.Utf8);
        
        if(original_password != req.body.password) res.send("Your username or password is incorrect!")

        const token = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin
        }, process.env.JWT_SEC_KEY, {
            expiresIn: "3d"
        })
        /// Here retrieving other fileds except the password
        const {password, ...others} = user._doc;
        // console.log(others)
        res.send({...others, token});
    } catch (error) {   
        res.send(error);
    }
})

module.exports = router;
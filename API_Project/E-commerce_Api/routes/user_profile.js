const User = require('../models/user');
const router = require('express').Router();


router.get('/home/:username', async (req, res)=>{
    try {
        console.log("Here it is...")
        const user = await User.findOne({ username: req.params.username })
        console.log("---->". user);
       // res.send();
         res.render('user_home',{details: user});
    } catch (err) {
        res.send(err);
    }    
})


module.exports = router;
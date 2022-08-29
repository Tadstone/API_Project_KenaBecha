const UserBank = require('../models/userbankinfo');

const router = require('express').Router();


/// REGISTER
router.post('/bankinfo', async (req, res)=>{

    /// Validate the user for null userName, email, password   
    const new_user = new UserBank({

        accountId : req.body.accountId,
        secretkey: req.body.secretkey,

    })

    try {

        const savedUser = await new_user.save();
        console.log(new_user);
        res.send(savedUser);
        
    }catch (err) {
        res.send(err);
    }
});


module.exports = router;
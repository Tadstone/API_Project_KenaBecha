const express = require('express');
const router = express.Router();
const User = require('../../models/user')
const CryptoJS = require('crypto-js')
const jwt = require('jsonwebtoken')
const UserBank = require('../../models/userbankinfo');



// TransactionInfo
const TransactionInfo = require('../../models/transactioninfo');

//////////////////////////////////

// CartProducts
const CartProducts = require('../../models/carts');

///////////////////////////////////

// Products
const shopProduct = require('../../models/product');

router.get('/', (req, res)=>{
    res.render('index')
    // c
})

router.get('/register', (req, res)=>{
    res.render('register');
})

router.get('/login', (req,res)=>{
    res.render('login');
})

router.post('/register', async (req, res)=>{
    const newUser = new User({
        userName : req.body.userName,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC_KEY).toString()
    })

    try {
        const savedUser = await newUser.save();
        // console.log(savedUser);
        res.redirect('/');
    }catch (err) {
        res.send(err);
    }
});

router.post('/home', async (req, res)=>{
    try {
        const user = await User.findOne({ userName: req.body.userName })
        const bankinfo = await UserBank.findOne({ userName: req.body.userName })
        console.log(user,bankinfo)
        const newUser = new TransactionInfo({
            userName : 'dummy',
            accountId : 'accdummy',
            secretkey : 'seckey',
            amount : 12
        })
        const blazer1 = await shopProduct.findOne({ title: "BLAZER1"})
        const blazer2 = await shopProduct.findOne({ title: "BLAZER2"})
        const blazer3 = await shopProduct.findOne({ title: "BLAZER3"})
        const pant1 = await shopProduct.findOne({ title: "PANT1"})
        const pant2 = await shopProduct.findOne({ title: "PANT2"})
        const pant3 = await shopProduct.findOne({ title: "PANT3"})
        const shoe1 = await shopProduct.findOne({ title: "SHOE1"})
        const shoe2 = await shopProduct.findOne({ title: "SHOE2"})
        const shoe3 = await shopProduct.findOne({ title: "SHOE3"})
        if(!user) res.send("Wrong Identity...!")

        const decrpted_Hash_Password = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC_KEY);
        const originalPassword = decrpted_Hash_Password.toString(CryptoJS.enc.Utf8);
        
        if(originalPassword != req.body.password) res.send("Your username or password is incorrect !")

        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin
        }, process.env.JWT_SEC_KEY, {
            expiresIn: "3d"
        }
        )

        /// Here retrieving other fileds except the password
        const {password, ...others} = user._doc;
       // console.log(blazer1);
        // console.log(others)

       // res.send({...others, accessToken});
      //  res.redirect('/');
    //   console.log(user);
   // console.log(bankinfo);
    if(!bankinfo)  res.render('user_home',{details: user,bankdetails: newUser,blazerData1: blazer1,blazerData2: blazer2,blazerData3: blazer3,
                            pantData1: pant1,pantData2: pant2,pantData3: pant3,shoeData1: shoe1,shoeData2: shoe2,shoeData3: shoe3});
    res.render('user_home',{details: user,bankdetails: bankinfo,blazerData1: blazer1,blazerData2: blazer2,blazerData3: blazer3,
                          pantData1: pant1,pantData2: pant2,pantData3: pant3,shoeData1: shoe1,shoeData2: shoe2,shoeData3: shoe3});
    } catch (error) {   
        res.send(error);
    }

});

router.post('/bankinfo', async (req, res)=>{

    /// Validate the user for null userName, email, password   
    const user = await User.findOne({ userName: req.body.userName })
    const updatepopup = await User.updateOne(user, {
        $set: {popup : req.body.popup}
    },
    { new: true});
    const newUser = new UserBank({
        userName : req.body.userName,
        accountId : req.body.accountId,
        secretkey : req.body.secretKey
    })
    updatedUser = await User.findOne({ userName: req.body.userName })
    const blazer1 = await shopProduct.findOne({ title: "BLAZER1"})
    const blazer2 = await shopProduct.findOne({ title: "BLAZER2"})
    const blazer3 = await shopProduct.findOne({ title: "BLAZER3"})
    const pant1 = await shopProduct.findOne({ title: "PANT1"})
    const pant2 = await shopProduct.findOne({ title: "PANT2"})
    const pant3 = await shopProduct.findOne({ title: "PANT3"})
    const shoe1 = await shopProduct.findOne({ title: "SHOE1"})
    const shoe2 = await shopProduct.findOne({ title: "SHOE2"})
    const shoe3 = await shopProduct.findOne({ title: "SHOE3"})
   // console.log(newUser);
    try {
        const savedUser = await newUser.save();
        res.render('user_home',{details: updatedUser,bankdetails: savedUser,blazerData1: blazer1,blazerData2: blazer2,blazerData3: blazer3,
            pantData1: pant1,pantData2: pant2,pantData3: pant3,shoeData1: shoe1,shoeData2: shoe2,shoeData3: shoe3});
    }catch (err) {
        res.send(err);
    }
});


router.post('/transactioninfo', async (req, res)=>{
    console.log

    console.log(req.body.userName);
    /// Validate the user for null userName, email, password   
    const user = await User.findOne({ userName: req.body.userName })
    console.log(user);
    const newUser = new TransactionInfo({
        userName : req.body.userName,
        accountId : req.body.accountId,
        secretkey : req.body.secretKey,
        amount : req.body.cost
    })
    if(Array.isArray(req.body.title))
    {
        for(var i = 0;i<req.body.title.length;i++)
        {

            const cartProduct = new CartProducts({
                title : req.body.title[i],
                quantity : req.body.quantity[i]
            })
            
        // console.log(cartProduct);
            const savedCartProduct= await cartProduct.save();
        //  console.log(savedCartProduct);
            const quantityVal=req.body.quantity[i];
        //   console.log("----",quantityVal);
            const  productUpdate= await shopProduct.updateOne({title: req.body.title[i]}, {
            $inc: { quantity : -quantityVal}
         },
         { new: true});
        }
    }
    
    else{
        const cartProduct = new CartProducts({
            title : req.body.title,
            quantity : req.body.quantity
        })

        // console.log(cartProduct);
        const savedCartProduct= await cartProduct.save();
      //  console.log(savedCartProduct);
      const quantityVal=req.body.quantity;
    //   console.log("----",quantityVal);
        const  productUpdate= await shopProduct.updateOne({title: req.body.title}, {
            $inc: { quantity : -quantityVal}
         },
         { new: true});

    }

    const blazer1 = await shopProduct.findOne({ title: "BLAZER1"})
    const blazer2 = await shopProduct.findOne({ title: "BLAZER2"})
    const blazer3 = await shopProduct.findOne({ title: "BLAZER3"})
    const pant1 = await shopProduct.findOne({ title: "PANT1"})
    const pant2 = await shopProduct.findOne({ title: "PANT2"})
    const pant3 = await shopProduct.findOne({ title: "PANT3"})
    const shoe1 = await shopProduct.findOne({ title: "SHOE1"})
    const shoe2 = await shopProduct.findOne({ title: "SHOE2"})
    const shoe3 = await shopProduct.findOne({ title: "SHOE3"})
    try {
        const savedUser = await newUser.save();
        res.render('user_home',{details: user,bankdetails: savedUser,blazerData1: blazer1,blazerData2: blazer2,blazerData3: blazer3,
            pantData1: pant1,pantData2: pant2,pantData3: pant3,shoeData1: shoe1,shoeData2: shoe2,shoeData3: shoe3});
    }catch (err) {
        res.send(err);
    }
});

module.exports = router;
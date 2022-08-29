const jwt = require('jsonwebtoken')


const verifyToken = (req, res, next)=>{
    const authHeader = req.headers.token;
    // console.log("authHeader = "+ authHeader);
    if(authHeader){
        const token = authHeader;
        jwt.verify(token, process.env.JWT_SEC_KEY, (err, userData)=>{
            if(err) res.send("Token is invalid");
            // console.log(userData)
            req.user = userData;    
            next();
        })
    }
    else{
        return res.send("You are not verified !")
    }
}

const verifyTokenAndAuthorization = (req, res, next)=>{
    verifyToken(req, res, ()=>{
        if(req.user.id == req.params.id || req.user.isAdmin){
            /// Have permission to edit user
            next();
        }
        else{
            res.send("You are not allowed to do that!")
        } 
    })
}

const verifyTokenAndAdmin = (req, res, next)=>{
    verifyToken(req, res, ()=>{
        if(req.user.isAdmin){
            // console.log("I am Admin...")
            /// Have permission to edit user
            next();
        }
        else{
            res.send("You are not allowed to do that!")
        } 
    })
}
//here we export the module

module.exports = { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin }
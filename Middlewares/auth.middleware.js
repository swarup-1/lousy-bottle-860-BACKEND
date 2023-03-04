const jwt = require('jsonwebtoken')

const authFun = (req,res,next) =>{
    const token = req.headers.authorization
    if(token){
        jwt.verify(token, 'evaluation', function(err, decoded) {
            if(decoded){
                req.body.userid = decoded.userid
                next()
            }else{
                res.send({"msg":"Please Login First"})
            }
        });
    }else{
        res.send({"msg":"Please Login First"})
    }
}

module.exports={
    authFun
}
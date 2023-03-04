const express = require("express");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { UserModel } = require("../Model/UserModel");

const users = express.Router()


users.get("/single/:email",async(req,res)=>{
    let email = req.params.email
    try {
        const user = await UserModel.findOne({email})
        res.send(user)
    } catch (error) {
        console.log("error",error)
        res.send({"error":error.message})
    }
})

users.post("/", async(req,res)=>{
    const {name,email,password,} = req.body
    let alreadyExist = await UserModel.find({email})

    if(alreadyExist.length>0){
        let token = jwt.sign({userid:alreadyExist[0]._id}, 'evaluation');
        bcrypt.compare(password, alreadyExist[0].password, function(err, result) {
            if(result){
                res.send({"msg":"Login Success", "token": token})
            }else{
                console.log(`{msg: , err:${err}}`)
            }
        });
    }
    else{
        try{
            let token = jwt.sign({userid:email}, 'evaluation');
            bcrypt.hash(password, 5, async(err, hash)=>{
                if(err){
                    res.send({"msg":"Error occured" , "err":err.message})
                }else{
                    let user = new UserModel({name, email, password:hash})
                    await user.save()
                    res.send({"msg":"New User Registered", "token": token})
                }
            });
        }catch(err){
            console.log(`{msg:Error occured while Registering , err:${err.message}}`)
        }
    }
})

users.patch("/wins",async(req,res)=>{
    let {id} = req.body
    try {
        let user = await UserModel.findOne({_id:id})
        user.numberOfWins = (user.numberOfWins || 0)+1
        await user.save()
        res.send(user)
    } catch (error) {
        console.log("error",error)
        res.send({"error":error.message})
    }
})

users.get("/leader",async(req,res)=>{
    try {
        const users = await UserModel.find().sort({numberOfWins : -1}).limit(5)
        res.send(users)
    } catch (error) {
        console.log("error",error)
        res.send({"error":error.message})
    }
})

module.exports={
    users
}

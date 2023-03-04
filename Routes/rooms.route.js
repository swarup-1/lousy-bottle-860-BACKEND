const express = require("express");
const { RoomModel } = require("../Model/RoomsModel");
const uid = require('uniqid')

const roomRouter = express.Router();



roomRouter.get("/",async(req,res)=>{
    try {
        const rooms = await RoomModel.find()
        res.send(rooms)
    } catch (error) {
        console.log("error",error)
        res.send({"error":error.message})
    }
})

const gameIDGenerator = ()=>{
    let id_generate =uid()
    return id_generate
}
// roomID:String,
// username1: String,
// userID1: String,
// username2: String,
// userID2: String,
// winner:String,

roomRouter.post("/newroom",async(req,res)=>{
    let {roomID,username1,userID1} = req.body
    let ID = roomID || gameIDGenerator()
    try {
        const game = new RoomModel({
            roomID:ID,
            username1: username1,
            userID1: userID1,
        })
        await game.save()
        res.send({"message": `Game ID is ${ID}`, "ID":ID})
    } catch (error) {
        console.log("error",error)
        res.send({"error":error.message})
    }
})
roomRouter.patch("/joinroom",async(req,res)=>{
    let {roomID,username2,userID2} = req.body
    let ID =roomID
    try {
        const ExistingGame = await RoomModel.findOne({roomID:ID})
        console.log("ExistingGame",ExistingGame)
        ExistingGame.username2 = username2
        ExistingGame.userID2 = userID2
        await ExistingGame.save()
        console.log("ExistingGame",ExistingGame)
        res.send({"message": `Game started with ID : ${ID}`, "ID":ID})
    } catch (error) {
        console.log("error",error)
        res.send({"error":error.message})
    }
})
roomRouter.patch("/scorechange",async(req,res)=>{
    let {} = req.body
    let ID =roomID
    try {
        const ExistingGame = await RoomModel.findOne({roomID:ID})
        console.log("ExistingGame",ExistingGame)
        ExistingGame.username2 = username2
        ExistingGame.userID2 = userID2
        await ExistingGame.save()
        console.log("ExistingGame",ExistingGame)
        res.send({"message": `Game started with ID : ${ID}`, "ID":ID})
    } catch (error) {
        console.log("error",error)
        res.send({"error":error.message})
    }
})
roomRouter.patch("/winner",async(req,res)=>{
    let {roomID,winnerID} = req.body
    let ID =roomID
    try {
        let ExistingGame = await RoomModel.findOne({roomID:ID})
        ExistingGame.winner = winnerID
        await ExistingGame.save()
        res.send({"message": `Winner found in game ID : ${ID}`, "gameDetails":ExistingGame})
    } catch (error) {
        console.log("error",error)
        res.send({"error":error.message})
    }
})

module.exports={
    roomRouter
}
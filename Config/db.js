const mongoose = require("mongoose")
require('dotenv').config()

const connect = mongoose.connect("mongodb+srv://hackathon:hackathon@cluster0.zj9abc1.mongodb.net/hackathon101?retryWrites=true&w=majority")

module.exports={
    connect
}
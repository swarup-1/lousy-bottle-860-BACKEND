const express=require("express")
const cors=require("cors")
const { connect } = require("./Config/db")
require("dotenv").config()
const {users} = require("./Routes/user.route")
const {roomRouter} = require("./Routes/rooms.route")

const app=express()
app.use(cors())
app.use(express.json())
app.use("/user",users)
app.use("/room",roomRouter)

app.get("/",(req,res)=>{
    console.log("Welcome to Backend")
    res.send("Welcome to Backend")
})

app.listen(process.env.port, async()=>{
    try{
        await connect
        console.log("Connected to DB")
    }catch(err){
        console.log('err:', err)
    }
    console.log(`Server is running at PORT ${process.env.port}`)
})

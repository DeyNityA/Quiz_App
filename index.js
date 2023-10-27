require('dotenv').config()
const express=require('express')
const cors=require('cors')
const http=require('http')
const path=require('path')
require('./db/connection')
const userRoutes = require("./routes/userroute");


const app=express()
const server=http.createServer(app)

app.use(express.json())
app.use(express.urlencoded({ extended : false }))
app.use(cors())
app.use(express.static(path.join(__dirname,'client','build')))

app.get('*',function(_,res){
res.sendFile(path.join(__dirname,'client','build','index.html'),function(err){
    res.status(500).send(err)
})
})
const PORT= process.env.PORT || 5000
app.use("/api/auth", userRoutes);
server.listen(PORT,(err)=>{
    if(!err) console.log('listening on port....',PORT)
})
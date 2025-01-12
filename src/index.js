const express = require('express')
const {PicGo} = require('picgo')
const path = require('node:path')
const multer = require('multer') 

const upload = multer({dest: "../img"})
const picgo = new PicGo('../pic-github.json')
const app=express()

const port=3000
const ip='0.0.0.0'

app.get('/upload',(req,res)=>{
    res.send("hello picgo!")
})

app.post('/upload',upload.any(),(req,res)=>{
    console.log(req.files,req.body)
    res.send("great") 
})

app.listen(port,ip,()=>{
    console.log("listen to http://localhost:"+port)
})
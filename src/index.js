const express = require('express')
const {PicGo} = require('picgo')
const path = require('node:path')
const fs = require('node:fs')
const multer = require('multer')
const cors = require('cors')

//配置加载环境变量
require('dotenv').config()

//配置storage规则
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        //自动创建临时文件目录
        const picDir = 'images'
        const uploadTmpDir = path.join(__dirname,picDir)
        if(!fs.existsSync(uploadTmpDir)){
            fs.mkdirSync(uploadTmpDir,{recursive: false})
        }
        cb(null, uploadTmpDir)
    },
    filename: function (req, file, cb) {
        //定义上传的文件名
        cb(null, `${Date.now()}_${file.originalname}`)
    }
  })

const upload = multer({ storage: storage })
const picgo = new PicGo(process.env.PIC_CONFIG)
const app=express()

//全局中间件
app.use(cors())

//选择主页
app.get('/',(req,res)=>{
    const filePath = path.join(__dirname,'public','index.html')
    res.sendFile(filePath,(err)=>{
        if(err){
            console.log(err)
            res.status(500).send("500 Server Wrong!")
        }
    })
})

//上传文件页面
app.get('/upload',(req,res)=>{
    const filePath = path.join(__dirname,'public','upload.html')
    res.sendFile(filePath,(err)=>{
        if(err){
            console.log(err)
            res.status(500).send("500 Server Wrong!")
        }
    })
})

//上传图片
app.post('/upload',upload.any(),(req,res)=>{
    try {
        //本地图片路径
        const files = req.files
        const localImages = files.map(image => image.path)

        //上传图片
        const picUpload = async ()=>{
            const result = await picgo.upload(localImages)
            return result
        }
        //获取图片实际url
        const getImages = async ()=>{
            const remoteImages = await picUpload()
            const images = remoteImages.map(image => image.imgUrl)
            return images
        }
        //异步映射 TODO: 映射到数据库
        (async ()=>{
            const images = await getImages()
            const picInfo = {
            ...req.body,
            images: images
            }
            console.log(picInfo)
        })()
        res.json({
            success: true,
            message: 'File upload success!'
        })
    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: 'File upload failed!'
        })
    }
})

app.listen(process.env.PORT,process.env.IP,()=>{
    console.log("listen to http://localhost:"+process.env.PORT)
})
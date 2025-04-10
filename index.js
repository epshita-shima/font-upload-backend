const express=require('express');
const cors=require('cors');
const multer=require('multer');
const path=require('path');
const port=5000
const app=express();
app.use(cors());


const storage= multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads/')
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now() + "-" + file.originalname,)
    }
})

const uploadFile= multer({storage})

app.post('/upload',uploadFile.single('font'),(req,res)=>{
    const file=req.file;
    if(!file) return res.status(400).send('No file uploaded');

    const fileUrl = `http://localhost:5000/uploads/${file.filename}`;
  res.json({ name: file.originalname, url: fileUrl });
})

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(port,()=>{
console.log(`Server is runing in port ${port}`)
})

import express from 'express'
import mongoose from 'mongoose'
import helmet from 'helmet'
import dotenv from 'dotenv'
import morgan from 'morgan'
import { dbConnection } from './utils/config.js'
import { router } from './routes/users.js'
import { userAuth } from './routes/auth.js'
import { postRoute } from './routes/posts.js'
import multer from 'multer'
import path, { dirname } from 'path' 
import { join } from 'path'
import { fileURLToPath } from 'url'
import cors from "cors"

const app = express()
const PORT = 8000
dotenv.config();
dbConnection();

app.use(cors({
    origin: ["https://zamsocial-backend.vercel.app", "https://zamsocial-frontend.vercel.app"],
    methods:["POST","GET","PUT","DELETE"],
    credentials: true,
  }));

const __dirname = path.resolve();
app.use("/images", express.static(path.join(__dirname, "public/images")));

//middleware
app.use(express.json())
app.use(helmet())
app.use(morgan("common"))

const storage = multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null,"public/images")
    },
    filename:(req,file,cb) => {
        cb(null,req.body.name)
    },
})
const upload = multer({storage})

app.get("/", (req, res) => {
    res.json({
      message: "Hello Backend",
    });
  });

app.post("/api/upload",upload.single("file"),(req,res) => {
    try {
        return res.status(200).json("File Uploaded SuccessFully!!")
    } catch (error) {
        console.log(error)
    }
})

app.use("/api/users",router)
app.use("/api/auth",userAuth)
app.use("/api/posts",postRoute)
app.listen(PORT,() => {
    console.log(`Backend Server is running at PORT ${PORT}`)
})
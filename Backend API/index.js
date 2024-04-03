import express from 'express'
import mongoose from 'mongoose'
import helmet from 'helmet'
import dotenv from 'dotenv'
import morgan from 'morgan'
import { dbConnection } from './utils/config.js'
import { router } from './routes/users.js'
import { userAuth } from './routes/auth.js'
import { postRoute } from './routes/posts.js'

const app = express()
const PORT = 8000
dotenv.config();
dbConnection();

//middleware
app.use(express.json())
app.use(helmet())
app.use(morgan("common"))

app.use("/api/users",router)
app.use("/api/auth",userAuth)
app.use("/api/posts",postRoute)
app.listen(PORT,() => {
    console.log(`Backend Server is running at PORT ${PORT}`)
})
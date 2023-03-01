import express from 'express'
import mongoose from 'mongoose'
import config from 'config'
import authRouter from './routes/User.js'
const app = express()
const PORT = config.get("server")
const URL = config.get("dbURL")


app.use(express.json())
app.use('/api/auth', authRouter)

const start = async ()=>{
 try {
   await mongoose.connect(URL, {
   
  })
  app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`))
 }
 catch (e) {
  
 }
}

start()
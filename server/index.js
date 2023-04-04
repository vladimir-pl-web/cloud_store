import express from 'express'
import mongoose from 'mongoose'
import config from 'config'
import authRouter from './routes/User.js'
import cors from 'cors'
import { corsMiddleware } from './middlwares/middlwares.js'
const PORT = config.get("server")
const URL = config.get("dbURL")
const app = express()

app.use(express.json())
app.use('/api/auth', authRouter)
app.use(cors())

const start = async () => {
  try {
    await mongoose.connect(URL, {

    })
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
  }
  catch (e) {

  }
}

start()
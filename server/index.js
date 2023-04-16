import express from 'express'
import mongoose from 'mongoose'
import config from 'config'
import authRouter from './routes/User.js'
import fileRouter from './routes/File.js'
import cors from 'cors'
import fileUpload from 'express-fileupload'
const PORT = config.get("server")
const URL = config.get("dbURL")
const app = express()

app.use(express.json())
app.use(fileUpload({ }))
app.use('/api/auth', authRouter)
app.use('/api/files', fileRouter)
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
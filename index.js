import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import mongoose from 'mongoose'
import router from './router/index.js'
import cors from 'cors'

import errorMiddleware from './middlewares/errorMiddleware.js'


const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json())
app.use(cors())
app.use('/', router)

app.use('/uploads', express.static('uploads'))
app.use(errorMiddleware)

const start = async () => {

  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    app.listen(PORT, () => console.log(`Server started on port = ${PORT}`))
  } catch(e) {
    console.log(e)
  }

}

start()

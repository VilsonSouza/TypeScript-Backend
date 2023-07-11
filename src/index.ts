
import dotenv from 'dotenv'
import express from 'express'
dotenv.config()

import './connection'

const PORT = process.env.PORT || 8080

const app = express()
app.get('/', (request,response)=>{
  response.send("Server Up")
})
app.listen(PORT, () =>{
  console.log(`Server Running in port ${PORT}`)
})

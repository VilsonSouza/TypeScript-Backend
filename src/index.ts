
import dotenv from 'dotenv'
import express from 'express'
import bodyParser from 'body-parser'
dotenv.config()

import './connection'
import productController from './controllers/product.controller'

const PORT = process.env.PORT || 8080

const app = express()
app.use(bodyParser.json())

app.get('/api/products', productController.findAll)
app.post('/api/products', productController.create)
app.get('/', (request,response)=>{
  response.send("Server Up")
})
app.listen(PORT, () =>{
  console.log(`Server Running in port ${PORT}`)
})

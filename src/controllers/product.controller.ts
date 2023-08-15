import {Request,Response} from 'express'
import { validate } from 'class-validator'
import { ProductRepository} from '@/repositories/product.repository'
import {CreateProductDTO, UpdateProductDTO} from '@/dtos/product.dto'

class ProductController{
  private productRepository: ProductRepository
  constructor(){
    this.productRepository = new ProductRepository
  }
   findAll =async (request: Request,response:Response): Promise<Response> =>{

    const products = await this.productRepository.getAll()
    return response.status(200).send({data:products})
  }
  create = async (request: Request,response:Response): Promise<Response> =>{
    const {name,description,weight} = request.body
    const dto = new CreateProductDTO
    dto.name = name
    dto.description = description
    dto.weight = weight

    const errors =validate(dto)

    if((await errors).length>0){
      return response.status(422).send({error:errors})
    }

    const productDb = await this.productRepository.create(dto)

    return response.status(201).send({data: productDb})
  }
  findOne =async(request: Request,response:Response): Promise<Response>=>{
    const id: string = request.params.id

    const product = await this.productRepository.find(id)

    if(!product){
      return response.status(404).send({error:"Product not Found"})
    }

    return response.status(200).send({data:product})

  }
  update = async (request: Request,response:Response): Promise<Response>=>{

    const id: string = request.params.id
    const {name,description,weight} = request.body
    let product =await this.productRepository.find(id)
    if(!product){
      return response.status(404).send({error:'Product not Found'})
    }

    const updateDto = new UpdateProductDTO
    updateDto.id = id
    updateDto.name = name
    updateDto.description = description
    updateDto.weight = weight

    const errors = await validate(updateDto)
    if(errors.length>0){
      return response.status(422).send({errors:errors})
    }
    try{
      const productDb = await this.productRepository.update(updateDto)
      if(!productDb){
        return response.status(404).send({error:'Product Not Found'})
      }
      return response.status(200).send({data:productDb})
    }catch(error){
      return response.status(500).send({error:'Internal Error'})
    }


  }
  delete = async(request: Request,response:Response): Promise<Response>=>{
    const id: string = request.params.id


    try{
      await this.productRepository.delete(id)
      return response.status(204).send({})
    }catch(error){
      return response.status(400).send({error:"Error Deleting"})
    }
  }

}

export default new ProductController

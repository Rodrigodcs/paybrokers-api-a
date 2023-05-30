import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './schemas/product.schema';
import { CreateProductDto } from './dtos/createProduct.dto';


@Injectable()
export class ProductsService {

    constructor(@InjectModel(Product.name) private productModel: Model<Product>) {}

    async create(createProductDto: CreateProductDto) {

        const alreadyExists = await this.productModel.find({name:createProductDto.name}).exec()
        console.log("teste",alreadyExists)
        if(alreadyExists.length) return "Already exists"

        const newProduct = new this.productModel(createProductDto);
        const savedProduct = await newProduct.save();
        console.log(savedProduct)
        return "New product added";
    }

    async findAll() {
        return this.productModel.find().exec();
    }
}
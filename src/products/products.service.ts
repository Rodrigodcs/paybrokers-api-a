import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './schemas/product.schema';
import { CreateProductDto } from './dtos/createProduct.dto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ProductsService {
    constructor(
        @Inject('PRODUCTS_SERVICE') private client: ClientProxy,
        @InjectModel(Product.name) private productModel: Model<Product>
    ) {}

    async create(createProductDto: CreateProductDto) {
        const alreadyExists = await this.productModel.find({name:createProductDto.name}).exec()
        if(alreadyExists.length) throw new HttpException('Product already exists', HttpStatus.CONFLICT);

        const newProduct = new this.productModel(createProductDto);
        const product = await newProduct.save();
        
        this.client.emit("newProduct", createProductDto)
        
        const productObject = product.toObject({versionKey: false})
        return productObject;
    }
}
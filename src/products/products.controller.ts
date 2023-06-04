import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dtos/createProduct.dto';


@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService) {}

    @Post()
    async create(@Body() createProductDto:CreateProductDto) {
        return this.productsService.create(createProductDto);
    }
}
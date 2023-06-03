import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose"
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Product, ProductSchema } from './schemas/product.schema';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';


@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forFeature([{name: Product.name, schema: ProductSchema}]),
        ClientsModule.register([
            {
                name: 'PRODUCTS_SERVICE',
                transport: Transport.RMQ,
                options: {
                  urls: [process.env.RABBITMQ_URL],
                  queue: 'products_queue',
                  noAck: false,
                  queueOptions: {
                    durable: false,
                  },
                },
            },
        ])
    ],
    controllers: [ProductsController],
    providers: [ProductsService],
})
export class ProductsModule {}

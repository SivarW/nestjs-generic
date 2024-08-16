import { Module } from '@nestjs/common';
import { AhProductService } from '@api/product/ah-product.service';
import { HttpModule } from '@nestjs/axios';
import { ProductController } from '@api/product/product.controller';

@Module({
  imports: [HttpModule],
  controllers: [ProductController],
  providers: [AhProductService],
  exports: [AhProductService],
})
export class ProductModule {}

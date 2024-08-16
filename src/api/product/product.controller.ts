import { Controller, Get } from '@nestjs/common';
import { AhProductService } from '@api/product/ah-product.service';

@Controller()
export class ProductController {
  constructor(private readonly ahProductService: AhProductService) {}

  @Get('/products')
  public async findProducts() {
    const accessToken = await this.ahProductService.getAccessToken();
    return await this.ahProductService.searchProducts('', accessToken);
  }
}

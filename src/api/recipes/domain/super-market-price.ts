import { ApiProperty } from '@nestjs/swagger';
import { SuperMarketType } from '@api/recipes/domain/super-market-type.enum';

export class SuperMarketPrice {
  @ApiProperty({ enum: SuperMarketType, enumName: 'SuperMarketType' })
  type: SuperMarketType;

  @ApiProperty({ example: 1200, description: 'Price in cents' })
  price: number;
}

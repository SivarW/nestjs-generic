import { ApiProperty } from '@nestjs/swagger';
import { SuperMarketType } from '@api/recipes/domain/super-market-type.enum';

class SuperMarketPrice {
  @ApiProperty({ enum: SuperMarketType, enumName: 'SuperMarketType' })
  type: SuperMarketType;

  @ApiProperty({ example: 1200, description: 'Price in cents' })
  price: number;
}

class Recipe {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  imageUrl: string;

  @ApiProperty({ type: SuperMarketPrice, isArray: true })
  prices: SuperMarketPrice[];
}

export class RecipesResponseDto {
  @ApiProperty({ type: Recipe, isArray: true })
  items: Recipe[];
}

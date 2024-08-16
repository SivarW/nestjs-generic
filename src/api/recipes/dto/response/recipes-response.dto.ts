import { ApiProperty } from '@nestjs/swagger';
import { SuperMarketPrice } from '@api/recipes/domain/super-market-price';

export class Recipe {
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

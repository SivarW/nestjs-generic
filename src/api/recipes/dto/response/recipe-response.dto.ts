import { ApiProperty } from '@nestjs/swagger';
import { UnitType } from '@api/recipes/domain/recipe.interface';
import { SuperMarketPrice } from '@api/recipes/domain/super-market-price';

class Ingredient {
  @ApiProperty({
    example: 1,
    description: 'Unique identifier for the ingredient',
  })
  id: number;

  @ApiProperty({ example: 'halloumi', description: 'Name of the ingredient' })
  name: string;

  @ApiProperty({ example: 250, description: 'Amount of the ingredient' })
  amount: number;

  @ApiProperty({
    enum: UnitType,
    enumName: 'UnitType',
    description: 'Unit type of the ingredient',
  })
  unitType: UnitType;

  @ApiProperty({
    example: false,
    description: 'Indicates if the ingredient is excluded from the price',
    required: false,
  })
  excludedFromPrice?: boolean;
}

export class RecipeResponseDto {
  @ApiProperty({ example: 1, description: 'Unique identifier for the recipe' })
  id: number;

  @ApiProperty({
    example: 'Wraps met halloumi',
    description: 'Title of the recipe',
  })
  title: string;

  @ApiProperty({
    example:
      'https://www.lekkerensimpel.com/wp-content/uploads/2022/08/588A2138.jpg.webp',
    description: 'URL to the recipe image',
  })
  imageUrl: string;

  @ApiProperty({
    type: Ingredient,
    isArray: true,
    description: 'List of ingredients required for the recipe',
  })
  ingredients: Ingredient[];

  @ApiProperty({
    example: [
      'Snijd de halloumi in plakjes...',
      'Giet een scheutje olie in een pan...',
    ],
    description: 'Step-by-step instructions for the recipe',
  })
  instructions: string[];

  @ApiProperty({ type: SuperMarketPrice, isArray: true })
  prices: SuperMarketPrice[];
}

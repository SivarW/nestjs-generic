import { Controller, Get } from '@nestjs/common';
import { RecipesResponseDto } from '@api/recipes/dto/response/recipes-response.dto';
import { RecipeService } from '@api/recipes/recipe.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SuperMarketType } from '@api/recipes/domain/super-market-type.enum';

@ApiTags('recipe')
@Controller()
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Get('/recipes')
  @ApiOkResponse({ type: RecipesResponseDto })
  public async getRecipes(): Promise<RecipesResponseDto> {
    return {
      items: [
        {
          id: 1,
          name: 'Wraps met halloumi',
          imageUrl:
            'https://www.lekkerensimpel.com/wp-content/uploads/2022/08/588A2138.jpg.webp',
          prices: [
            {
              type: SuperMarketType.AlbertHeijn,
              price: 1265,
            },
            {
              type: SuperMarketType.Jumbo,
              price: 920,
            },
          ],
        },
      ],
    };
  }
}

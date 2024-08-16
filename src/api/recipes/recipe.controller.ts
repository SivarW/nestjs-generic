import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { RecipesResponseDto } from '@api/recipes/dto/response/recipes-response.dto';
import { RecipeService } from '@api/recipes/recipe.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { IdParamDto } from '@api/recipes/dto/request/param/id-param.dto';
import { RecipeResponseDto } from '@api/recipes/dto/response/recipe-response.dto';
import { PriceService } from '@api/recipes/price.service';

@ApiTags('recipe')
@Controller()
export class RecipeController {
  constructor(
    private readonly recipeService: RecipeService,
    private readonly priceService: PriceService,
  ) {}

  @Get('/recipes')
  @ApiOkResponse({ type: RecipesResponseDto })
  public async getRecipes(): Promise<RecipesResponseDto> {
    const id = 1;

    const recipe = await this.recipeService.findRecipeById(id);
    const prices = await this.priceService.findPricesByRecipeId(recipe);
    return {
      items: [
        {
          id,
          name: 'Wraps met halloumi',
          imageUrl:
            'https://www.lekkerensimpel.com/wp-content/uploads/2022/08/588A2138.jpg.webp',
          prices,
        },
      ],
    };
  }

  @Get('/recipes/:id')
  @ApiOkResponse({ type: RecipeResponseDto })
  public async getRecipe(
    @Param() { id }: IdParamDto,
  ): Promise<RecipeResponseDto> {
    const recipe = await this.recipeService.findRecipeById(id);
    if (!recipe) {
      throw new NotFoundException(`Recipe with id ${id} does not exist`);
    }
    const prices = await this.priceService.findPricesByRecipeId(recipe);
    return {
      ...recipe,
      prices,
    };
  }
}

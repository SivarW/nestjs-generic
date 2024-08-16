import { Injectable } from '@nestjs/common';
import { SuperMarketPrice } from '@api/recipes/domain/super-market-price';
import { SuperMarketType } from '@api/recipes/domain/super-market-type.enum';
import { Recipe } from '@api/recipes/domain/recipe.interface';

@Injectable()
export class PriceService {
  public async findPricesByRecipeId(
    recipe: Recipe,
  ): Promise<SuperMarketPrice[]> {
    if (recipe.id !== 1) {
      return [];
    }

    return [
      {
        type: SuperMarketType.AlbertHeijn,
        price: 1265,
      },
      {
        type: SuperMarketType.Jumbo,
        price: 920,
      },
    ];
  }
}

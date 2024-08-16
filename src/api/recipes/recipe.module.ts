import { forwardRef, Module } from '@nestjs/common';
import { RecipeService } from '@api/recipes/recipe.service';
import { ProductModule } from '@api/product/product.module';
import { RecipeController } from '@api/recipes/recipe.controller';
import { PriceService } from '@api/recipes/price.service';

@Module({
  imports: [forwardRef(() => ProductModule)],
  controllers: [RecipeController],
  providers: [RecipeService, PriceService],
  exports: [RecipeService],
})
export class RecipeModule {}

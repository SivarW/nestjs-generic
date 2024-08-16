import { forwardRef, Module } from '@nestjs/common';
import { RecipeService } from '@api/recipes/recipe.service';
import { ProductModule } from '@api/product/product.module';
import { RecipeController } from '@api/recipes/recipe.controller';

@Module({
  imports: [forwardRef(() => ProductModule)],
  controllers: [RecipeController],
  providers: [RecipeService],
  exports: [RecipeService],
})
export class RecipeModule {}

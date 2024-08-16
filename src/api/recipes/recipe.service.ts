import { Injectable } from '@nestjs/common';
import { Recipe, UnitType } from '@api/recipes/domain/recipe.interface';

@Injectable()
export class RecipeService {
  public async findRecipes(): Promise<Recipe[]> {
    return [
      {
        id: 1,
        title: 'Wraps met halloumi',
        imageUrl:
          'https://www.lekkerensimpel.com/wp-content/uploads/2022/08/588A2138.jpg.webp',
        ingredients: [
          {
            id: 1,
            name: 'wraps',
            amount: 4,
            unitType: UnitType.Pieces,
          },
          {
            id: 2,
            name: 'halloumi',
            amount: 250,
            unitType: UnitType.Grams,
          },
          {
            id: 3,
            name: 'olijfolie',
            amount: 2,
            unitType: UnitType.TableSpoon,
            excludedFromPrice: true,
          },
          {
            id: 4,
            name: 'pesto',
            amount: 2,
            unitType: UnitType.TableSpoon,
            excludedFromPrice: true,
          },
          {
            id: 5,
            name: 'avocado',
            amount: 1,
            unitType: UnitType.Pieces,
          },
          {
            id: 6,
            name: 'tomaten',
            amount: 2,
            unitType: UnitType.Pieces,
          },
          {
            id: 7,
            name: 'veldsla',
            amount: 100,
            unitType: UnitType.Grams,
          },
          {
            id: 8,
            name: 'peen julienne',
            amount: 100,
            unitType: UnitType.Grams,
          },
          {
            id: 9,
            name: 'zwarte peper',
            amount: 1,
            unitType: UnitType.APinch,
            excludedFromPrice: true,
          },
        ],
        instructions: [
          'Snijd de halloumi in plakjes. Meng in een bakje de olijfolie en pesto. Smeer met een kwastje de plakjes halloumi in.',
          'Giet een scheutje olie in een pan en bak de plakjes halloumi 2 minuten per kant.',
          'Snijd de tomaten in stukjes.',
          'Snijd de avocado doormidden en verwijder de pit. Schep het vruchtvlees eruit. Prak de avocado met een vork en besmeer de wraps met de avocadopuree. Breng op smaak met een snufje zout en peper.',
          'Beleg de wraps verder met halloumi, tomaat, peen julienne en veldsla.',
        ],
      },
    ];
  }

  public async findRecipeById(id: number): Promise<Recipe | null> {
    const recipes = await this.findRecipes();
    return recipes.find((recipe) => recipe.id === id) ?? null;
  }
}

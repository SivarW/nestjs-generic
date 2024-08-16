import { Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import * as dotenvExpand from 'dotenv-expand';
import * as path from 'path';

export enum UnitType {
  Pieces = 'pieces',
  Grams = 'grams',
  TableSpoon = 'table_spoon',
  APinch = 'a_pinch',
}

const logger = new Logger('seed');

const environment = process.env.NODE_ENV || 'dev';
const envFilePath = path.resolve(__dirname, `../env/${environment}.env`);

const myEnv = dotenv.config({ path: envFilePath });
dotenvExpand.expand(myEnv);

const prisma = new PrismaClient();

const main = async () => {
  const recipeId = 1;

  const recipe = await prisma.recipe.upsert({
    where: { id: recipeId },
    update: {},
    create: {
      title: 'Wraps met halloumi',
      imageUrl:
        'https://www.lekkerensimpel.com/wp-content/uploads/2022/08/588A2138.jpg.webp',
      instructions: [
        'Snijd de halloumi in plakjes. Meng in een bakje de olijfolie en pesto. Smeer met een kwastje de plakjes halloumi in.',
        'Giet een scheutje olie in een pan en bak de plakjes halloumi 2 minuten per kant.',
        'Snijd de tomaten in stukjes.',
        'Snijd de avocado doormidden en verwijder de pit. Schep het vruchtvlees eruit. Prak de avocado met een vork en besmeer de wraps met de avocadopuree. Breng op smaak met een snufje zout en peper.',
        'Beleg de wraps verder met halloumi, tomaat, peen julienne en veldsla.',
      ],
    },
  });

  console.log('recipe', recipe);

  const ingredients = [
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
  ];

  for (const ingredient of ingredients) {
    await prisma.ingredient.upsert({
      where: { id: ingredient.id },
      update: {
        name: ingredient.name,
        amount: ingredient.amount,
        excludedFromPrice: ingredient.excludedFromPrice ?? false,
        unitType: ingredient.unitType,
        recipeId: recipeId,
      },
      create: {
        name: ingredient.name,
        amount: ingredient.amount,
        excludedFromPrice: ingredient.excludedFromPrice ?? false,
        unitType: ingredient.unitType,
        recipeId: recipeId,
      },
    });
  }
};

main()
  .catch((error) => {
    logger.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

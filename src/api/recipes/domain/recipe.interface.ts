export enum UnitType {
  Pieces = 'pieces',
  Grams = 'grams',
  TableSpoon = 'table_spoon',
  APinch = 'a_pinch',
}

interface Ingedient {
  id: number;
  name: string;
  amount: number;
  unitType: UnitType;
  alreadyInHouse?: boolean;
}

export interface Recipe {
  id: number;
  title: string;
  imageUrl: string;
  ingredients: Ingedient[];
  instructions: string[];
}

/*
  Warnings:

  - Changed the type of `unitType` on the `Ingredient` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Ingredient" DROP COLUMN "unitType",
ADD COLUMN     "unitType" TEXT NOT NULL;

-- DropEnum
DROP TYPE "UnitType";

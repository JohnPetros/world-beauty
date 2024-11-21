/*
  Warnings:

  - You are about to drop the column `value` on the `phones` table. All the data in the column will be lost.
  - Added the required column `code_area` to the `phones` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number` to the `phones` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "phones" DROP COLUMN "value",
ADD COLUMN     "code_area" TEXT NOT NULL,
ADD COLUMN     "number" TEXT NOT NULL;

/*
  Warnings:

  - A unique constraint covering the columns `[value]` on the table `cpfs` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[number]` on the table `phones` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[value]` on the table `rgs` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "customers" ALTER COLUMN "socialName" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "cpfs_value_key" ON "cpfs"("value");

-- CreateIndex
CREATE UNIQUE INDEX "phones_number_key" ON "phones"("number");

-- CreateIndex
CREATE UNIQUE INDEX "rgs_value_key" ON "rgs"("value");

/*
  Warnings:

  - You are about to drop the column `cpf` on the `users` table. All the data in the column will be lost.
  - Added the required column `issued_at` to the `rgs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "rgs" ADD COLUMN     "issued_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "cpf";

-- CreateTable
CREATE TABLE "cpfs" (
    "id" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "customer_id" TEXT NOT NULL,
    "issued_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cpfs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "cpfs_customer_id_key" ON "cpfs"("customer_id");

-- AddForeignKey
ALTER TABLE "cpfs" ADD CONSTRAINT "cpfs_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

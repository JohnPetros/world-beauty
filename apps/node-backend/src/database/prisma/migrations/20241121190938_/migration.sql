-- CreateEnum
CREATE TYPE "ItemCategory" AS ENUM ('PRODUCT', 'SERVICE');

-- CreateEnum
CREATE TYPE "CustomerGender" AS ENUM ('MALE', 'FEMALE');

-- CreateTable
CREATE TABLE "order_items" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "registered_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "category" "ItemCategory" NOT NULL,

    CONSTRAINT "order_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "socialName" TEXT NOT NULL,
    "gender" "CustomerGender" NOT NULL DEFAULT 'MALE',
    "registered_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cpfs" (
    "id" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "customer_id" TEXT NOT NULL,
    "issued_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cpfs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rgs" (
    "id" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "customer_id" TEXT NOT NULL,
    "issued_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "rgs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "phones" (
    "id" TEXT NOT NULL,
    "code_area" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "customer_id" TEXT NOT NULL,

    CONSTRAINT "phones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" TEXT NOT NULL,
    "customer_id" TEXT NOT NULL,
    "item_id" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "registered_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "cpfs_customer_id_key" ON "cpfs"("customer_id");

-- AddForeignKey
ALTER TABLE "cpfs" ADD CONSTRAINT "cpfs_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rgs" ADD CONSTRAINT "rgs_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "phones" ADD CONSTRAINT "phones_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "order_items"("id") ON DELETE CASCADE ON UPDATE CASCADE;

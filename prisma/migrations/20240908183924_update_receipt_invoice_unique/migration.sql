/*
  Warnings:

  - A unique constraint covering the columns `[invoice]` on the table `Receipt` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Receipt_invoice_key` ON `Receipt`(`invoice`);

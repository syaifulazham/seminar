/*
  Warnings:

  - Added the required column `bank` to the `Receipt` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Receipt` ADD COLUMN `bank` VARCHAR(191) NOT NULL,
    MODIFY `amount` DOUBLE NOT NULL DEFAULT 0.00;

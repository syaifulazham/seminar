/*
  Warnings:

  - You are about to drop the column `hash` on the `Participant` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Participant` DROP COLUMN `hash`,
    ADD COLUMN `hashid` VARCHAR(191) NOT NULL DEFAULT '';

/*
  Warnings:

  - A unique constraint covering the columns `[hashid]` on the table `Participant` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Participant` ALTER COLUMN `hashid` DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX `Participant_hashid_key` ON `Participant`(`hashid`);

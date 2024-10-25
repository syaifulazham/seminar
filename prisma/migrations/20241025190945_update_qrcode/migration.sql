/*
  Warnings:

  - You are about to drop the column `hashid` on the `attendance` table. All the data in the column will be lost.
  - Added the required column `qrCode` to the `Attendance` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `attendance` DROP FOREIGN KEY `Attendance_participantId_fkey`;

-- AlterTable
ALTER TABLE `attendance` DROP COLUMN `hashid`,
    ADD COLUMN `qrCode` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `participant` ADD COLUMN `qrCode` VARCHAR(191) NULL;

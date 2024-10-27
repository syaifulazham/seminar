/*
  Warnings:

  - A unique constraint covering the columns `[label,participantId]` on the table `Attendance` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[qrCode]` on the table `Participant` will be added. If there are existing duplicate values, this will fail.
  - Made the column `qrCode` on table `participant` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX `Attendance_participantId_fkey` ON `attendance`;

-- AlterTable
ALTER TABLE `attendance` ADD COLUMN `label` VARCHAR(191) NOT NULL DEFAULT '26-10-2024';

-- AlterTable
ALTER TABLE `participant` MODIFY `qrCode` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Attendance_label_participantId_key` ON `Attendance`(`label`, `participantId`);

-- CreateIndex
CREATE UNIQUE INDEX `Participant_qrCode_key` ON `Participant`(`qrCode`);

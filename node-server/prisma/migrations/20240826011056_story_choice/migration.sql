/*
  Warnings:

  - You are about to drop the column `text` on the `choice` table. All the data in the column will be lost.
  - Added the required column `title` to the `Choice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `choice` DROP COLUMN `text`,
    ADD COLUMN `title` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `story` ADD COLUMN `published` BOOLEAN NOT NULL DEFAULT false;

/*
  Warnings:

  - You are about to drop the column `storyId` on the `node` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `node` DROP FOREIGN KEY `Node_storyId_fkey`;

-- AlterTable
ALTER TABLE `node` DROP COLUMN `storyId`;

/*
  Warnings:

  - Added the required column `comment` to the `Place` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Place` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Place" ADD COLUMN     "comment" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;

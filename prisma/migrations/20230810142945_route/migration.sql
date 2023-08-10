/*
  Warnings:

  - Added the required column `title` to the `Route` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Route" ADD COLUMN     "title" TEXT NOT NULL;

/*
  Warnings:

  - You are about to drop the column `user_id` on the `Waypoint` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Waypoint" DROP CONSTRAINT "Waypoint_user_id_fkey";

-- AlterTable
ALTER TABLE "Waypoint" DROP COLUMN "user_id";

/*
  Warnings:

  - You are about to drop the column `birthday` on the `birthday_person` table. All the data in the column will be lost.
  - Added the required column `birthday_date` to the `birthday_person` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `birthday_person` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "birthday_person" DROP COLUMN "birthday",
ADD COLUMN     "birthday_date" DATE NOT NULL,
ADD COLUMN     "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMPTZ(3) NOT NULL;

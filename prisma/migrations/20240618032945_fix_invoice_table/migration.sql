/*
  Warnings:

  - You are about to drop the column `file_path` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `uploaded_at` on the `Invoice` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Invoice" DROP COLUMN "file_path",
DROP COLUMN "uploaded_at";

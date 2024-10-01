/*
  Warnings:

  - You are about to drop the column `state` on the `UserAddress` table. All the data in the column will be lost.
  - You are about to drop the column `zip` on the `UserAddress` table. All the data in the column will be lost.
  - Added the required column `firstName` to the `UserAddress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `UserAddress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `UserAddress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postalCode` to the `UserAddress` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserAddress" DROP COLUMN "state",
DROP COLUMN "zip",
ADD COLUMN     "address2" TEXT,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "postalCode" TEXT NOT NULL;

/*
  Warnings:

  - The values [PLAYED] on the enum `UserGameStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "UserGameStatus_new" AS ENUM ('OWNED', 'WISHLIST');
ALTER TABLE "user_games" ALTER COLUMN "status" TYPE "UserGameStatus_new" USING ("status"::text::"UserGameStatus_new");
ALTER TYPE "UserGameStatus" RENAME TO "UserGameStatus_old";
ALTER TYPE "UserGameStatus_new" RENAME TO "UserGameStatus";
DROP TYPE "public"."UserGameStatus_old";
COMMIT;

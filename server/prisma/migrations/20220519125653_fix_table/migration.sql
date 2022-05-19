/*
  Warnings:

  - You are about to drop the column `created_at` on the `feedbacks` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `feedbacks` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_feedbacks" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "screenshot" TEXT
);
INSERT INTO "new_feedbacks" ("comment", "id", "screenshot", "type") SELECT "comment", "id", "screenshot", "type" FROM "feedbacks";
DROP TABLE "feedbacks";
ALTER TABLE "new_feedbacks" RENAME TO "feedbacks";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

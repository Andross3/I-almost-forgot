-- CreateEnum
CREATE TYPE "SocialCircle" AS ENUM ('FRIENDS', 'FAMILY');

-- CreateTable
CREATE TABLE "birthday_person" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "birthday" DATE NOT NULL,
    "social_circle" "SocialCircle" NOT NULL,

    CONSTRAINT "birthday_person_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notification" (
    "id" TEXT NOT NULL,
    "hour" TIME(0) NOT NULL,
    "previous_day" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "notification_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "notification" ADD CONSTRAINT "notification_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "birthday_person"("id") ON DELETE CASCADE ON UPDATE CASCADE;

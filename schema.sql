CREATE SCHEMA "capacitor";

CREATE TYPE "capacitor"."role" AS ENUM (
  'member',
  'moderator',
  'admin'
);

CREATE TYPE "capacitor"."assetType" AS ENUM (
  'layout',
  'passive_widget',
  'active_widget'
);

CREATE TYPE "capacitor"."publishState" AS ENUM (
  'draft',
  'awaiting_moderation',
  'denied',
  'published'
);

CREATE TABLE "capacitor"."users" (
  "id" uuid PRIMARY KEY,
  "email" varchar UNIQUE NOT NULL,
  "passwordHash" varchar NOT NULL,
  "displayName" varchar NOT NULL,
  "role" capacitor.role DEFAULT 'member',
  "bio" text,
  "created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
  "validated_at" timestamp DEFAULT NULL,
  "banned_at" timestamp DEFAULT NULL
);

CREATE TABLE "capacitor"."assets" (
  "id" uuid PRIMARY KEY,
  "author_id" uuid NOT NULL,
  "status" capacitor."publishState" DEFAULT 'draft',
  "version" integer DEFAULT 1,
  "parent" uuid,
  "title" varchar NOT NULL,
  "description" text,
  "asset_type" capacitor."assetType" NOT NULL,
  "download_url" varchar NOT NULL,
  "slots" int DEFAULT 0
);

CREATE TABLE "capacitor"."screenshots" (
  "id" uuid PRIMARY KEY,
  "asset_id" uuid
);

CREATE TABLE "capacitor"."favorites" (
  "favorited_asset_id" uuid,
  "favoriting_user_id" uuid,
  PRIMARY KEY ("favorited_asset_id", "favoriting_user_id")
);

CREATE TABLE "capacitor"."follows" (
  "following_user_id" uuid,
  "followed_user_id" uuid,
  PRIMARY KEY ("followed_user_id", "following_user_id")
);

CREATE TABLE "capacitor"."ratings" (
  "asset_id" uuid NOT NULL,
  "user_id" uuid NOT NULL,
  "rating" integer
);

CREATE UNIQUE INDEX ON "capacitor"."ratings" ("asset_id", "user_id");

ALTER TABLE "capacitor"."assets" ADD FOREIGN KEY ("author_id") REFERENCES "capacitor"."users" ("id");

ALTER TABLE "capacitor"."screenshots" ADD FOREIGN KEY ("asset_id") REFERENCES "capacitor"."assets" ("id");

ALTER TABLE "capacitor"."favorites" ADD FOREIGN KEY ("favorited_asset_id") REFERENCES "capacitor"."assets" ("id");

ALTER TABLE "capacitor"."favorites" ADD FOREIGN KEY ("favoriting_user_id") REFERENCES "capacitor"."users" ("id");

ALTER TABLE "capacitor"."follows" ADD FOREIGN KEY ("following_user_id") REFERENCES "capacitor"."users" ("id");

ALTER TABLE "capacitor"."follows" ADD FOREIGN KEY ("followed_user_id") REFERENCES "capacitor"."users" ("id");

ALTER TABLE "capacitor"."ratings" ADD FOREIGN KEY ("asset_id") REFERENCES "capacitor"."assets" ("id");

ALTER TABLE "capacitor"."ratings" ADD FOREIGN KEY ("user_id") REFERENCES "capacitor"."users" ("id");

-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.
-- Removed the Not Null from the breed


CREATE TABLE "breed" (
    "breed_id" int   NOT NULL,
    "breed_name" varchar(250)   NOT NULL,
    "min_height" int,
    "max_height" int,
    "min_weight" int,
    "max_weight" int,
    "min_life" int,
    "max_life" int,
    "group" int,
    CONSTRAINT "pk_breed" PRIMARY KEY (
        "breed_id"
     )
);

CREATE TABLE "groups" (
    "group_id" int   NOT NULL,
    "group_name" varchar(250)   NOT NULL,
    CONSTRAINT "pk_group" PRIMARY KEY (
        "group_id"
     )
);

CREATE TABLE "temperament" (
    "temperament_id" int   NOT NULL,
    "temperament_name" varchar(250)   NOT NULL,
    CONSTRAINT "pk_temperament" PRIMARY KEY (
        "temperament_id"
     )
);

CREATE TABLE "purpose" (
    "purpose_id" int   NOT NULL,
    "purpose" varchar(250)   NOT NULL,
    CONSTRAINT "pk_purpose" PRIMARY KEY (
        "purpose_id"
     )
);

CREATE TABLE "breed_temperament" (
    "breed_id" int   NOT NULL,
    "temperament_id" int   NOT NULL
);

CREATE TABLE "breed_purpose" (
    "breed" int   NOT NULL,
    "purpose" int   NOT NULL
);

ALTER TABLE "breed" ADD CONSTRAINT "fk_breed_group" FOREIGN KEY("group")
REFERENCES "groups" ("group_id");

ALTER TABLE "breed_temperament" ADD CONSTRAINT "fk_breed_temperament_breed" FOREIGN KEY("breed_id")
REFERENCES "breed" ("breed_id");

ALTER TABLE "breed_temperament" ADD CONSTRAINT "fk_breed_temperament_temperament" FOREIGN KEY("temperament_id")
REFERENCES "temperament" ("temperament_id");

ALTER TABLE "breed_purpose" ADD CONSTRAINT "fk_breed_purpose_breed" FOREIGN KEY("breed")
REFERENCES "breed" ("breed_id");

ALTER TABLE "breed_purpose" ADD CONSTRAINT "fk_breed_purpose_purpose" FOREIGN KEY("purpose")
REFERENCES "purpose" ("purpose_id");


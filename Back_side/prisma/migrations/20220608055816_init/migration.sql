-- CreateTable
CREATE TABLE "field" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,

    CONSTRAINT "field_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "first_name" VARCHAR(50) NOT NULL,
    "last_name" VARCHAR(50) NOT NULL,
    "phone" VARCHAR(20) NOT NULL,
    "national_id" INTEGER NOT NULL,
    "personal_id" INTEGER NOT NULL,
    "birthday" TIMESTAMP(3) NOT NULL,
    "entery_year" SMALLINT,
    "photo" VARCHAR(100),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assigned_by" INTEGER NOT NULL,
    "assigned_projects" INTEGER,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "field_id" INTEGER,
    "need_acception" BOOLEAN DEFAULT false,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "message" (
    "id" INTEGER NOT NULL,
    "sent_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "text" VARCHAR(500) NOT NULL,
    "sender_id" INTEGER NOT NULL,
    "receiver_id" INTEGER NOT NULL,

    CONSTRAINT "message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roles_of_users" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "role_id" SMALLINT NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "roles_of_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roles" (
    "id" SMALLSERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "score" INTEGER,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "permisions" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "key" VARCHAR(50) NOT NULL,

    CONSTRAINT "permisions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "permisions_of_roles" (
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "permision_id" INTEGER NOT NULL,
    "role_id" SMALLINT NOT NULL,

    CONSTRAINT "permisions_of_roles_pkey" PRIMARY KEY ("permision_id","role_id")
);

-- CreateTable
CREATE TABLE "project_helper" (
    "id" SERIAL NOT NULL,
    "project_id" INTEGER NOT NULL,

    CONSTRAINT "project_helper_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_student" (
    "id" SERIAL NOT NULL,
    "project_id" INTEGER NOT NULL,
    "student_id" INTEGER NOT NULL,

    CONSTRAINT "project_student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_process" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "description" VARCHAR(2000) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "project_id" INTEGER,

    CONSTRAINT "project_process_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_defence_details" (
    "id" SERIAL NOT NULL,
    "place" VARCHAR(50) NOT NULL,
    "time" TIMESTAMP NOT NULL,
    "description" VARCHAR(1000) NOT NULL,
    "project_id" INTEGER NOT NULL,

    CONSTRAINT "project_defence_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_defence" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "project_defence_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "field_name_key" ON "field"("name");

-- CreateIndex
CREATE UNIQUE INDEX "users_national_id_key" ON "users"("national_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_personal_id_key" ON "users"("personal_id");

-- CreateIndex
CREATE UNIQUE INDEX "roles_name_key" ON "roles"("name");

-- CreateIndex
CREATE UNIQUE INDEX "permisions_name_key" ON "permisions"("name");

-- CreateIndex
CREATE UNIQUE INDEX "permisions_key_key" ON "permisions"("key");

-- CreateIndex
CREATE UNIQUE INDEX "project_helper_project_id_key" ON "project_helper"("project_id");

-- CreateIndex
CREATE UNIQUE INDEX "project_student_project_id_key" ON "project_student"("project_id");

-- CreateIndex
CREATE UNIQUE INDEX "project_student_student_id_key" ON "project_student"("student_id");

-- CreateIndex
CREATE UNIQUE INDEX "project_defence_details_project_id_key" ON "project_defence_details"("project_id");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_field_id_fkey" FOREIGN KEY ("field_id") REFERENCES "field"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_assigned_projects_fkey" FOREIGN KEY ("assigned_projects") REFERENCES "project_helper"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_receiver_id_fkey" FOREIGN KEY ("receiver_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "roles_of_users" ADD CONSTRAINT "roles_of_users_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "roles_of_users" ADD CONSTRAINT "roles_of_users_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "permisions_of_roles" ADD CONSTRAINT "permisions_of_roles_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "permisions_of_roles" ADD CONSTRAINT "permisions_of_roles_permision_id_fkey" FOREIGN KEY ("permision_id") REFERENCES "permisions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_helper" ADD CONSTRAINT "project_helper_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "project_defence"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_student" ADD CONSTRAINT "project_student_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_student" ADD CONSTRAINT "project_student_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "project_defence"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_process" ADD CONSTRAINT "project_process_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "project_defence"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_defence_details" ADD CONSTRAINT "project_defence_details_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "project_defence"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

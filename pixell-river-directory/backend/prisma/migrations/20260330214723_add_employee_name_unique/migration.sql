/*
  Warnings:

  - A unique constraint covering the columns `[firstName,lastName]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Employee_firstName_lastName_key" ON "Employee"("firstName", "lastName");

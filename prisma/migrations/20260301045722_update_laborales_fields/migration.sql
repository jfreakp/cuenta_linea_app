/*
  Warnings:

  - You are about to drop the column `barrio` on the `datos_laborales` table. All the data in the column will be lost.
  - You are about to drop the column `calle_principal` on the `datos_laborales` table. All the data in the column will be lost.
  - You are about to drop the column `calle_secundaria` on the `datos_laborales` table. All the data in the column will be lost.
  - You are about to drop the column `canton` on the `datos_laborales` table. All the data in the column will be lost.
  - You are about to drop the column `numeracion` on the `datos_laborales` table. All the data in the column will be lost.
  - You are about to drop the column `parroquia` on the `datos_laborales` table. All the data in the column will be lost.
  - You are about to drop the column `provincia` on the `datos_laborales` table. All the data in the column will be lost.
  - You are about to drop the column `referencia` on the `datos_laborales` table. All the data in the column will be lost.
  - You are about to drop the column `telefono` on the `datos_laborales` table. All the data in the column will be lost.
  - You are about to drop the column `tipo_telefono` on the `datos_laborales` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "datos_laborales" DROP COLUMN "barrio",
DROP COLUMN "calle_principal",
DROP COLUMN "calle_secundaria",
DROP COLUMN "canton",
DROP COLUMN "numeracion",
DROP COLUMN "parroquia",
DROP COLUMN "provincia",
DROP COLUMN "referencia",
DROP COLUMN "telefono",
DROP COLUMN "tipo_telefono",
ADD COLUMN     "barrio_laboral" VARCHAR(100),
ADD COLUMN     "calle_principal_laboral" VARCHAR(100),
ADD COLUMN     "calle_secundaria_laboral" VARCHAR(100),
ADD COLUMN     "canton_laboral" VARCHAR(100),
ADD COLUMN     "numeracion_laboral" VARCHAR(20),
ADD COLUMN     "numero_casa_laboral" VARCHAR(20),
ADD COLUMN     "parroquia_laboral" VARCHAR(100),
ADD COLUMN     "provincia_laboral" VARCHAR(100),
ADD COLUMN     "referencia_laboral" VARCHAR(255),
ADD COLUMN     "tipo_telefono_laboral" VARCHAR(20);

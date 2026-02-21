-- CreateTable
CREATE TABLE "Provincia" (
    "id" SERIAL NOT NULL,
    "codigo" VARCHAR(2) NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Provincia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Canton" (
    "id" SERIAL NOT NULL,
    "codigo" VARCHAR(4) NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "provinciaId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Canton_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Parroquia" (
    "id" SERIAL NOT NULL,
    "codigo" VARCHAR(7) NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "cantonId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Parroquia_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Provincia_codigo_key" ON "Provincia"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "Canton_codigo_key" ON "Canton"("codigo");

-- CreateIndex
CREATE INDEX "Canton_provinciaId_idx" ON "Canton"("provinciaId");

-- CreateIndex
CREATE UNIQUE INDEX "Parroquia_codigo_key" ON "Parroquia"("codigo");

-- CreateIndex
CREATE INDEX "Parroquia_cantonId_idx" ON "Parroquia"("cantonId");

-- AddForeignKey
ALTER TABLE "Canton" ADD CONSTRAINT "Canton_provinciaId_fkey" FOREIGN KEY ("provinciaId") REFERENCES "Provincia"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Parroquia" ADD CONSTRAINT "Parroquia_cantonId_fkey" FOREIGN KEY ("cantonId") REFERENCES "Canton"("id") ON DELETE CASCADE ON UPDATE CASCADE;

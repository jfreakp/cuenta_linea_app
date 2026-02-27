-- CreateEnum
CREATE TYPE "EstadoCatalogo" AS ENUM ('ACTIVO', 'INACTIVO');

-- CreateTable
CREATE TABLE "catalogos" (
    "id" SERIAL NOT NULL,
    "codigo" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "estado" "EstadoCatalogo" NOT NULL DEFAULT 'ACTIVO',
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usuarioCreacion" TEXT,

    CONSTRAINT "catalogos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "catalogo_items" (
    "id" SERIAL NOT NULL,
    "catalogoId" INTEGER NOT NULL,
    "codigo" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "orden" INTEGER,
    "estado" "EstadoCatalogo" NOT NULL DEFAULT 'ACTIVO',
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usuarioCreacion" TEXT,

    CONSTRAINT "catalogo_items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "catalogos_codigo_key" ON "catalogos"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "catalogo_items_catalogoId_codigo_key" ON "catalogo_items"("catalogoId", "codigo");

-- AddForeignKey
ALTER TABLE "catalogo_items" ADD CONSTRAINT "catalogo_items_catalogoId_fkey" FOREIGN KEY ("catalogoId") REFERENCES "catalogos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

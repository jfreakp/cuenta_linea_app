-- CreateEnum
CREATE TYPE "EstadoUsuario" AS ENUM ('ACTIVO', 'INACTIVO', 'PENDIENTE_VERIFICACION');

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(120) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "nombres" VARCHAR(100),
    "apellidos" VARCHAR(100),
    "estado" "EstadoUsuario" NOT NULL DEFAULT 'PENDIENTE_VERIFICACION',
    "emailVerificado" BOOLEAN NOT NULL DEFAULT false,
    "tokenVerificacion" TEXT,
    "tokenVerificacionExp" TIMESTAMP(3),
    "tokenReset" TEXT,
    "tokenResetExp" TIMESTAMP(3),
    "ultimoLogin" TIMESTAMP(3),
    "clienteId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_tokenVerificacion_key" ON "Usuario"("tokenVerificacion");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_tokenReset_key" ON "Usuario"("tokenReset");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_clienteId_key" ON "Usuario"("clienteId");

-- CreateIndex
CREATE INDEX "Usuario_email_idx" ON "Usuario"("email");

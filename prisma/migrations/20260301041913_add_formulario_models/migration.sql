-- CreateTable
CREATE TABLE "clientes" (
    "id" SERIAL NOT NULL,
    "nombres" VARCHAR(100) NOT NULL,
    "apellidos" VARCHAR(100) NOT NULL,
    "correo" VARCHAR(120) NOT NULL,
    "telefono" VARCHAR(20),
    "motivo_apertura" VARCHAR(50),
    "estado" VARCHAR(20) NOT NULL DEFAULT 'PENDIENTE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "clientes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "datos_personales" (
    "id" SERIAL NOT NULL,
    "clienteId" INTEGER NOT NULL,
    "cedula" VARCHAR(20) NOT NULL,
    "codigo_dactilar" VARCHAR(50),
    "autoriza_verificacion" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "datos_personales_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "datos_domicilio" (
    "id" SERIAL NOT NULL,
    "clienteId" INTEGER NOT NULL,
    "provincia" VARCHAR(100) NOT NULL,
    "canton" VARCHAR(100) NOT NULL,
    "parroquia" VARCHAR(100) NOT NULL,
    "barrio" VARCHAR(100),
    "direccion" VARCHAR(255) NOT NULL,
    "referencia" VARCHAR(255),
    "numero_casa" VARCHAR(20),
    "tipo_telefono" VARCHAR(20),
    "numero_telefono" VARCHAR(20),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "datos_domicilio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "datos_laborales" (
    "id" SERIAL NOT NULL,
    "clienteId" INTEGER NOT NULL,
    "relacion_laboral" VARCHAR(50) NOT NULL,
    "ingresos_mensuales" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "actividad_economica" VARCHAR(100) NOT NULL,
    "direccion_laboral" VARCHAR(255),
    "provincia" VARCHAR(100),
    "canton" VARCHAR(100),
    "parroquia" VARCHAR(100),
    "barrio" VARCHAR(100),
    "telefono_laboral" VARCHAR(20),
    "calle_principal" VARCHAR(100),
    "calle_secundaria" VARCHAR(100),
    "referencia" VARCHAR(255),
    "numeracion" VARCHAR(20),
    "telefono" VARCHAR(20),
    "tipo_telefono" VARCHAR(20),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "datos_laborales_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "datos_financieros" (
    "id" SERIAL NOT NULL,
    "clienteId" INTEGER NOT NULL,
    "activos" DECIMAL(15,2) NOT NULL DEFAULT 0,
    "pasivos" DECIMAL(15,2) NOT NULL DEFAULT 0,
    "patrimonio" DECIMAL(15,2) NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "datos_financieros_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "legalizacion" (
    "id" SERIAL NOT NULL,
    "clienteId" INTEGER NOT NULL,
    "acepta_terminos" BOOLEAN NOT NULL DEFAULT false,
    "ip_solicitud" VARCHAR(45),
    "navegador" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "legalizacion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "clientes_correo_key" ON "clientes"("correo");

-- CreateIndex
CREATE UNIQUE INDEX "datos_personales_clienteId_key" ON "datos_personales"("clienteId");

-- CreateIndex
CREATE UNIQUE INDEX "datos_personales_cedula_key" ON "datos_personales"("cedula");

-- CreateIndex
CREATE INDEX "datos_personales_clienteId_idx" ON "datos_personales"("clienteId");

-- CreateIndex
CREATE UNIQUE INDEX "datos_domicilio_clienteId_key" ON "datos_domicilio"("clienteId");

-- CreateIndex
CREATE INDEX "datos_domicilio_clienteId_idx" ON "datos_domicilio"("clienteId");

-- CreateIndex
CREATE UNIQUE INDEX "datos_laborales_clienteId_key" ON "datos_laborales"("clienteId");

-- CreateIndex
CREATE INDEX "datos_laborales_clienteId_idx" ON "datos_laborales"("clienteId");

-- CreateIndex
CREATE UNIQUE INDEX "datos_financieros_clienteId_key" ON "datos_financieros"("clienteId");

-- CreateIndex
CREATE INDEX "datos_financieros_clienteId_idx" ON "datos_financieros"("clienteId");

-- CreateIndex
CREATE UNIQUE INDEX "legalizacion_clienteId_key" ON "legalizacion"("clienteId");

-- CreateIndex
CREATE INDEX "legalizacion_clienteId_idx" ON "legalizacion"("clienteId");

-- AddForeignKey
ALTER TABLE "datos_personales" ADD CONSTRAINT "datos_personales_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "clientes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "datos_domicilio" ADD CONSTRAINT "datos_domicilio_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "clientes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "datos_laborales" ADD CONSTRAINT "datos_laborales_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "clientes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "datos_financieros" ADD CONSTRAINT "datos_financieros_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "clientes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "legalizacion" ADD CONSTRAINT "legalizacion_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "clientes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

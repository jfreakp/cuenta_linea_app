import { prisma } from '../lib/prisma.ts'

async function main() {

  await prisma.catalogo.upsert({
    where: { codigo: "RELACION_LABORAL" },
    update: {},
    create: {
      codigo: "RELACION_LABORAL",
      nombre: "Relación Laboral",
      items: {
        create: [
          { codigo: "DEP", nombre: "Dependiente" },
          { codigo: "IND", nombre: "Independiente" },
          { codigo: "HON", nombre: "Honorarios" },
          { codigo: "OBR", nombre: "Por obra o servicio" },
          { codigo: "PRA", nombre: "Prácticas / Pasantías" },
          { codigo: "AUT", nombre: "Autónomo" },
          { codigo: "TER", nombre: "Tercerizado" },
          { codigo: "FRE", nombre: "Freelance" }
        ]
      }
    }
  })

  console.log("✅ Catálogo RELACION_LABORAL creado")

  await prisma.catalogo.upsert({
    where: { codigo: "MOTIVO_APERTURA" },
    update: {},
    create: {
      codigo: "MOTIVO_APERTURA",
      nombre: "Motivo de Apertura",
      items: {
        create: [
          { codigo: "AHORRO", nombre: "Ahorro personal" },
          { codigo: "INVERSION", nombre: "Inversión" },
          { codigo: "NEGOCIO", nombre: "Actividad comercial / Negocio" },
          { codigo: "NOMINA", nombre: "Recepción de nómina" },
          { codigo: "REMESAS", nombre: "Recepción de remesas" },
          { codigo: "PENSION", nombre: "Recepción de pensión" },
          { codigo: "CREDITO", nombre: "Gestión de crédito" },
          { codigo: "REQUISITO", nombre: "Requisito institucional" },
          { codigo: "ESTUDIO", nombre: "Estudios" },
          { codigo: "VIAJE", nombre: "Viaje" },
          { codigo: "FAMILIAR", nombre: "Apoyo familiar" },
          { codigo: "AHORRO_PROGRAMADO", nombre: "Ahorro programado" },
          { codigo: "EMPRENDIMIENTO", nombre: "Emprendimiento" },
          { codigo: "OTRO", nombre: "Otro" }
        ]
      }
    }
  })

  console.log("✅ Catálogo MOTIVO_APERTURA creado")

  await prisma.catalogo.upsert({
  where: { codigo: "ACTIVIDAD_ECONOMICA" },
  update: {},
  create: {
    codigo: "ACTIVIDAD_ECONOMICA",
    nombre: "Actividad Económica",
    items: {
      create: [
        { codigo: "AGR", nombre: "Agricultura, ganadería, silvicultura y pesca" },
        { codigo: "MIN", nombre: "Explotación de minas y canteras" },
        { codigo: "IND", nombre: "Industrias manufactureras" },
        { codigo: "CON", nombre: "Construcción" },
        { codigo: "COM", nombre: "Comercio al por mayor y menor" },
        { codigo: "TRA", nombre: "Transporte y almacenamiento" },
        { codigo: "ALO", nombre: "Alojamiento y servicios de comida" },
        { codigo: "INF", nombre: "Información y comunicación" },
        { codigo: "FIN", nombre: "Actividades financieras y de seguros" },
        { codigo: "INM", nombre: "Actividades inmobiliarias" },
        { codigo: "PRO", nombre: "Actividades profesionales y técnicas" },
        { codigo: "ADM", nombre: "Actividades administrativas y servicios de apoyo" },
        { codigo: "PUB", nombre: "Administración pública" },
        { codigo: "EDU", nombre: "Enseñanza" },
        { codigo: "SAL", nombre: "Salud humana y asistencia social" },
        { codigo: "ART", nombre: "Artes, entretenimiento y recreación" },
        { codigo: "OTR", nombre: "Otras actividades de servicios" },
        { codigo: "HOG", nombre: "Actividades de los hogares como empleadores" },
        { codigo: "ORG", nombre: "Organizaciones y órganos extraterritoriales" }
      ]
    }
  }
});
console.log("✅ Catálogo ACTIVIDAD_ECONOMICA creado");
}


main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
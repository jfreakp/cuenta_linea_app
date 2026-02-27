import { prisma } from "./../lib/prisma";

async function main() {

  await prisma.catalogo.upsert({
    where: { codigo: "RELACION_LABORAL" },
    update: {},
    create: {
      codigo: "RELACION_LABORAL",
      nombre: "Relación Laboral",
      items: {
        create: [
          { codigo: "DEP", nombre: "Dependiente", orden: 1 },
          { codigo: "IND", nombre: "Independiente", orden: 2 },
          { codigo: "HON", nombre: "Honorarios", orden: 3 },
          { codigo: "OBR", nombre: "Por obra o servicio", orden: 4 },
          { codigo: "PRA", nombre: "Prácticas / Pasantías", orden: 5 },
          { codigo: "AUT", nombre: "Autónomo", orden: 6 },
          { codigo: "TER", nombre: "Tercerizado", orden: 7 },
          { codigo: "FRE", nombre: "Freelance", orden: 8 }
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
          { codigo: "AHORRO", nombre: "Ahorro personal", orden: 1 },
          { codigo: "INVERSION", nombre: "Inversión", orden: 2 },
          { codigo: "NEGOCIO", nombre: "Actividad comercial / Negocio", orden: 3 },
          { codigo: "NOMINA", nombre: "Recepción de nómina", orden: 4 },
          { codigo: "REMESAS", nombre: "Recepción de remesas", orden: 5 },
          { codigo: "PENSION", nombre: "Recepción de pensión", orden: 6 },
          { codigo: "CREDITO", nombre: "Gestión de crédito", orden: 7 },
          { codigo: "REQUISITO", nombre: "Requisito institucional", orden: 8 },
          { codigo: "ESTUDIO", nombre: "Estudios", orden: 9 },
          { codigo: "VIAJE", nombre: "Viaje", orden: 10 },
          { codigo: "FAMILIAR", nombre: "Apoyo familiar", orden: 11 },
          { codigo: "AHORRO_PROGRAMADO", nombre: "Ahorro programado", orden: 12 },
          { codigo: "EMPRENDIMIENTO", nombre: "Emprendimiento", orden: 13 },
          { codigo: "OTRO", nombre: "Otro", orden: 14 }
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
          { codigo: "AGR", nombre: "Agricultura, ganadería, silvicultura y pesca", orden: 1 },
          { codigo: "MIN", nombre: "Explotación de minas y canteras", orden: 2 },
          { codigo: "IND", nombre: "Industrias manufactureras", orden: 3 },
          { codigo: "CON", nombre: "Construcción", orden: 4 },
          { codigo: "COM", nombre: "Comercio al por mayor y menor", orden: 5 },
          { codigo: "TRA", nombre: "Transporte y almacenamiento", orden: 6 },
          { codigo: "ALO", nombre: "Alojamiento y servicios de comida", orden: 7 },
          { codigo: "INF", nombre: "Información y comunicación", orden: 8 },
          { codigo: "FIN", nombre: "Actividades financieras y de seguros", orden: 9 },
          { codigo: "INM", nombre: "Actividades inmobiliarias", orden: 10 },
          { codigo: "PRO", nombre: "Actividades profesionales y técnicas", orden: 11 },
          { codigo: "ADM", nombre: "Actividades administrativas y servicios de apoyo", orden: 12 },
          { codigo: "PUB", nombre: "Administración pública", orden: 13 },
          { codigo: "EDU", nombre: "Enseñanza", orden: 14 },
          { codigo: "SAL", nombre: "Salud humana y asistencia social", orden: 15 },
          { codigo: "ART", nombre: "Artes, entretenimiento y recreación", orden: 16 },
          { codigo: "OTR", nombre: "Otras actividades de servicios", orden: 17 },
          { codigo: "HOG", nombre: "Actividades de los hogares como empleadores", orden: 18 },
          { codigo: "ORG", nombre: "Organizaciones y órganos extraterritoriales", orden: 19 }
        ]
      }
    }
  })
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
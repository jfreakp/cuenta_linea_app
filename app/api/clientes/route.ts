import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.json();

    // Validar datos requeridos
    if (!formData.datosPersonales?.cedula || !formData.datosCliente?.correo) {
      return NextResponse.json(
        { error: "Cédula y correo son campos requeridos" },
        { status: 400 }
      );
    }

    // Verificar si el cliente ya existe (por cédula primero, luego por correo)
    let clienteExistente = null;
    if (formData.datosPersonales?.cedula) {
      clienteExistente = await prisma.cliente.findFirst({
        where: { datosPersonales: { cedula: formData.datosPersonales.cedula } },
        include: {
          datosPersonales: true,
          datosDomicilio: true,
          datosLaborales: true,
          datosFinancieros: true,
          legalizacion: true,
        },
      });
    }
    if (!clienteExistente) {
      clienteExistente = await prisma.cliente.findUnique({
        where: { correo: formData.datosCliente.correo },
        include: {
          datosPersonales: true,
          datosDomicilio: true,
          datosLaborales: true,
          datosFinancieros: true,
          legalizacion: true,
        },
      });
    }

    if (clienteExistente) {
      // Actualizar cliente existente
      const clienteActualizado = await prisma.cliente.update({
        where: { id: clienteExistente.id },
        data: {
          nombres: formData.datosCliente.nombres,
          apellidos: formData.datosCliente.apellidos,
          correo: formData.datosCliente.correo,
          telefono: formData.datosCliente.telefono,
          motivo_apertura: formData.datosCliente.motivo_apertura,
          datosPersonales: {
            update: {
              codigo_dactilar: formData.datosPersonales.codigo_dactilar,
              autoriza_verificacion:
                formData.datosPersonales.autoriza_verificacion,
            },
          },
          datosDomicilio: {
            upsert: {
              create: formData.datosDomicilio,
              update: formData.datosDomicilio,
            },
          },
          datosLaborales: {
            upsert: {
              create: {
                ...formData.datosLaborales,
                ingresos_mensuales: parseFloat(
                  formData.datosLaborales.ingresos_mensuales || "0"
                ),
              },
              update: {
                ...formData.datosLaborales,
                ingresos_mensuales: parseFloat(
                  formData.datosLaborales.ingresos_mensuales || "0"
                ),
              },
            },
          },
          datosFinancieros: {
            upsert: {
              create: {
                activos: parseFloat(formData.datosFinancieros.activos || "0"),
                pasivos: parseFloat(formData.datosFinancieros.pasivos || "0"),
                patrimonio: parseFloat(
                  formData.datosFinancieros.patrimonio || "0"
                ),
              },
              update: {
                activos: parseFloat(formData.datosFinancieros.activos || "0"),
                pasivos: parseFloat(formData.datosFinancieros.pasivos || "0"),
                patrimonio: parseFloat(
                  formData.datosFinancieros.patrimonio || "0"
                ),
              },
            },
          },
          legalizacion: {
            upsert: {
              create: {
                acepta_terminos: formData.legalizacion.acepta_terminos,
              },
              update: {
                acepta_terminos: formData.legalizacion.acepta_terminos,
              },
            },
          },
        },
        include: {
          datosPersonales: true,
          datosDomicilio: true,
          datosLaborales: true,
          datosFinancieros: true,
          legalizacion: true,
        },
      });

      return NextResponse.json(
        {
          message: "Cliente actualizado exitosamente",
          cliente: clienteActualizado,
        },
        { status: 200 }
      );
    }

    // Crear nuevo cliente
    const nuevoCliente = await prisma.cliente.create({
      data: {
        nombres: formData.datosCliente.nombres,
        apellidos: formData.datosCliente.apellidos,
        correo: formData.datosCliente.correo,
        telefono: formData.datosCliente.telefono,
        motivo_apertura: formData.datosCliente.motivo_apertura,
        datosPersonales: {
          create: {
            cedula: formData.datosPersonales.cedula,
            codigo_dactilar: formData.datosPersonales.codigo_dactilar,
            autoriza_verificacion:
              formData.datosPersonales.autoriza_verificacion,
          },
        },
        datosDomicilio: {
          create: formData.datosDomicilio,
        },
        datosLaborales: {
          create: {
            ...formData.datosLaborales,
            ingresos_mensuales: parseFloat(
              formData.datosLaborales.ingresos_mensuales || "0"
            ),
          },
        },
        datosFinancieros: {
          create: {
            activos: parseFloat(formData.datosFinancieros.activos || "0"),
            pasivos: parseFloat(formData.datosFinancieros.pasivos || "0"),
            patrimonio: parseFloat(
              formData.datosFinancieros.patrimonio || "0"
            ),
          },
        },
        legalizacion: {
          create: {
            acepta_terminos: formData.legalizacion.acepta_terminos,
          },
        },
      },
      include: {
        datosPersonales: true,
        datosDomicilio: true,
        datosLaborales: true,
        datosFinancieros: true,
        legalizacion: true,
      },
    });

    return NextResponse.json(
      { message: "Cliente creado exitosamente", cliente: nuevoCliente },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving cliente:", error);
    return NextResponse.json(
      { error: "Error al guardar el cliente", details: String(error) },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const clientes = await prisma.cliente.findMany({
      select: {
        id: true,
        nombres: true,
        apellidos: true,
        correo: true,
        telefono: true,
        motivo_apertura: true,
        estado: true,
        createdAt: true,
        datosPersonales: {
          select: {
            cedula: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      total: clientes.length,
      clientes: clientes,
    });
  } catch (error) {
    console.error("Error fetching clientes:", error);
    return NextResponse.json(
      { error: "Error al obtener los clientes", details: String(error) },
      { status: 500 }
    );
  }
}

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Intentar buscar por ID o por cédula
    const cliente = await prisma.cliente.findFirst({
      where: {
        OR: [{ id: parseInt(id) }, { datosPersonales: { cedula: id } }],
      },
      include: {
        datosPersonales: true,
        datosDomicilio: true,
        datosLaborales: true,
        datosFinancieros: true,
        legalizacion: true,
      },
    });

    if (!cliente) {
      return NextResponse.json(
        { error: "Cliente no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(cliente);
  } catch (error) {
    console.error("Error fetching cliente:", error);
    return NextResponse.json(
      { error: "Error al obtener el cliente", details: String(error) },
      { status: 500 }
    );
  }
}

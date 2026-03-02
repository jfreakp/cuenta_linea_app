import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const catalogos = await prisma.catalogo.findMany({
      select: {
        id: true,
        codigo: true,
        nombre: true,
        descripcion: true,
        estado: true,
      },
      where: { estado: "ACTIVO" },
      orderBy: { nombre: "asc" },
    });
    return NextResponse.json(catalogos);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to load catálogos" },
      { status: 500 }
    );
  }
}

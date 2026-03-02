import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ codigo: string }> }
) {
  try {
    const { codigo } = await params;

    const catalogo = await prisma.catalogo.findUnique({
      where: { codigo },
      include: {
        items: {
          where: { estado: "ACTIVO" },
          orderBy: { orden: "asc" },
        },
      },
    });

    if (!catalogo) {
      return NextResponse.json(
        { error: "Catálogo no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(catalogo);
  } catch (error) {
    console.error("Error fetching catálogo:", error);
    return NextResponse.json(
      { error: "Failed to load catálogo", details: String(error) },
      { status: 500 }
    );
  }
}

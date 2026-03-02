import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const provincias = await prisma.provincia.findMany({
      select: { id: true, nombre: true, codigo: true },
      orderBy: { nombre: "asc" },
    });
    return NextResponse.json(provincias);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to load provincias" },
      { status: 500 },
    );
  }
}

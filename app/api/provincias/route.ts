import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    console.log("Fetching provincias...");
    const provincias = await prisma.provincia.findMany({
      select: { id: true, nombre: true, codigo: true },
      orderBy: { nombre: "asc" },
    });
    console.log("Provincias fetched:", provincias);
    return NextResponse.json(provincias);
  } catch (error) {
    console.log("Error fetching provincias:", error);
    return NextResponse.json(
      { error: "Failed to load provincias" },
      { status: 500 },
    );
  }
}

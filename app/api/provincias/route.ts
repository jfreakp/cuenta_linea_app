import {prisma} from "@/lib/prisma";

export async function GET() {
  try {
    const provincias = await prisma.provincia.findMany({
      select: { id: true, nombre: true },
      orderBy: { nombre: 'asc' },
    });
    return new Response(JSON.stringify(provincias), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to load provincias' }), { status: 500 });
  }
}

import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const cantonId = searchParams.get("cantonId");
    if (!cantonId) {
      return new Response(JSON.stringify({ error: 'cantonId is required' }), { status: 400 });
    }
    const id = parseInt(cantonId, 10);
    const parroquias = await prisma.parroquia.findMany({
      where: { cantonId: id },
      select: { id: true, nombre: true },
      orderBy: { nombre: 'asc' },
    });
    return new Response(JSON.stringify(parroquias), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to load parroquias' }), { status: 500 });
  }
}

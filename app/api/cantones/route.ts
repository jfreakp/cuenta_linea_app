import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const provinciaId = searchParams.get("provinciaId");
    if (!provinciaId) {
      return new Response(JSON.stringify({ error: 'provinciaId is required' }), { status: 400 });
    }
    const id = parseInt(provinciaId, 10);
    const cantones = await prisma.canton.findMany({
      where: { provinciaId: id },
      select: { id: true, nombre: true, codigo: true },
      orderBy: { nombre: 'asc' },
    });
    return new Response(JSON.stringify(cantones), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to load cantones' }), { status: 500 });
  }
}

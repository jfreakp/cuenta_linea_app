import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyJWT } from '@/lib/auth';
import type { AuthResponse } from '@/types/auth';

export async function GET(request: NextRequest): Promise<NextResponse<AuthResponse>> {
  try {
    // Obtener token de la cookie o header
    const token = request.cookies.get('auth_token')?.value || 
                  request.headers.get('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: 'No autenticado',
        },
        { status: 401 }
      );
    }

    // Verificar JWT
    const payload = verifyJWT(token);
    if (!payload) {
      return NextResponse.json(
        {
          success: false,
          message: 'Token inválido o expirado',
        },
        { status: 401 }
      );
    }

    // Obtener usuario
    const user = await prisma.usuario.findUnique({
      where: { id: payload.sub },
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: 'Usuario no encontrado',
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Usuario obtenido exitosamente',
        data: {
          id: user.id,
          email: user.email,
          nombres: user.nombres,
          apellidos: user.apellidos,
          emailVerificado: user.emailVerificado,
          estado: user.estado,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in me route:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Error al obtener usuario',
      },
      { status: 500 }
    );
  }
}

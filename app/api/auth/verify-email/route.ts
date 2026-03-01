import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import type { AuthResponse } from '@/types/auth';

export async function POST(request: NextRequest): Promise<NextResponse<AuthResponse>> {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: 'Token de verificación requerido',
        },
        { status: 400 }
      );
    }

    // Buscar usuario con el token
    const user = await prisma.usuario.findUnique({
      where: { tokenVerificacion: token },
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: 'Token inválido o expirado',
        },
        { status: 400 }
      );
    }

    // Verificar si el token ha expirado
    if (user.tokenVerificacionExp && user.tokenVerificacionExp < new Date()) {
      return NextResponse.json(
        {
          success: false,
          message: 'Token de verificación expirado',
        },
        { status: 400 }
      );
    }

    // Actualizar usuario
    const updatedUser = await prisma.usuario.update({
      where: { id: user.id },
      data: {
        emailVerificado: true,
        estado: 'ACTIVO',
        tokenVerificacion: null,
        tokenVerificacionExp: null,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Email verificado exitosamente',
        data: {
          id: updatedUser.id,
          email: updatedUser.email,
          nombres: updatedUser.nombres,
          apellidos: updatedUser.apellidos,
          emailVerificado: updatedUser.emailVerificado,
          estado: updatedUser.estado,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in verify-email route:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Error al verificar email',
      },
      { status: 500 }
    );
  }
}

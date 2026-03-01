import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyPassword, hashPassword, validatePasswordStrength, verifyJWT } from '@/lib/auth';
import type { AuthResponse } from '@/types/auth';
import { z } from 'zod';

const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Contraseña actual requerida'),
  newPassword: z.string().min(8, 'Contraseña muy corta'),
  newPasswordConfirm: z.string(),
}).refine((data) => data.newPassword === data.newPasswordConfirm, {
  message: 'Las contraseñas no coinciden',
  path: ['newPasswordConfirm'],
});

export async function POST(request: NextRequest): Promise<NextResponse<AuthResponse>> {
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

    const body = await request.json();

    // Validación con Zod
    const validation = changePasswordSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message: 'Validación fallida',
          errors: validation.error.flatten().fieldErrors as Record<string, string[]>,
        },
        { status: 400 }
      );
    }

    const { currentPassword, newPassword } = validation.data;

    // Validar fortaleza de contraseña
    const passwordValidation = validatePasswordStrength(newPassword);
    if (!passwordValidation.valid) {
      return NextResponse.json(
        {
          success: false,
          message: 'Contraseña débil',
          errors: { newPassword: passwordValidation.errors },
        },
        { status: 400 }
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

    // Verificar contraseña actual
    const passwordMatches = await verifyPassword(currentPassword, user.password);
    if (!passwordMatches) {
      return NextResponse.json(
        {
          success: false,
          message: 'Contraseña actual incorrecta',
        },
        { status: 401 }
      );
    }

    // Hashear nueva contraseña
    const hashedPassword = await hashPassword(newPassword);

    // Actualizar contraseña
    const updatedUser = await prisma.usuario.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Contraseña cambida exitosamente',
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
    console.error('Error in change-password route:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Error al cambiar contraseña',
      },
      { status: 500 }
    );
  }
}

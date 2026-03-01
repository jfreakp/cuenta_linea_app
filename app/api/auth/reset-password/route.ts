import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword, validatePasswordStrength } from '@/lib/auth';
import type { AuthResponse } from '@/types/auth';
import { z } from 'zod';

const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Token requerido'),
  newPassword: z.string().min(8, 'Contraseña muy corta'),
  newPasswordConfirm: z.string(),
}).refine((data) => data.newPassword === data.newPasswordConfirm, {
  message: 'Las contraseñas no coinciden',
  path: ['newPasswordConfirm'],
});

export async function POST(request: NextRequest): Promise<NextResponse<AuthResponse>> {
  try {
    const body = await request.json();

    // Validación con Zod
    const validation = resetPasswordSchema.safeParse(body);
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

    const { token, newPassword } = validation.data;

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

    // Buscar usuario con el token
    const user = await prisma.usuario.findUnique({
      where: { tokenReset: token },
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
    if (user.tokenResetExp && user.tokenResetExp < new Date()) {
      return NextResponse.json(
        {
          success: false,
          message: 'Token de restablecimiento expirado',
        },
        { status: 400 }
      );
    }

    // Hashear nueva contraseña
    const hashedPassword = await hashPassword(newPassword);

    // Actualizar usuario
    const updatedUser = await prisma.usuario.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        tokenReset: null,
        tokenResetExp: null,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Contraseña restablecida exitosamente',
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
    console.error('Error in reset-password route:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Error al restablecer contraseña',
      },
      { status: 500 }
    );
  }
}

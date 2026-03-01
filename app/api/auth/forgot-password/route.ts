import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateToken } from '@/lib/auth';
import { sendEmail, getResetPasswordEmailTemplate } from '@/lib/email';
import type { AuthResponse } from '@/types/auth';
import { z } from 'zod';

const forgotPasswordSchema = z.object({
  email: z.string().email('Email inválido'),
});

export async function POST(request: NextRequest): Promise<NextResponse<AuthResponse>> {
  try {
    const body = await request.json();

    // Validación con Zod
    const validation = forgotPasswordSchema.safeParse(body);
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

    const { email } = validation.data;

    // Buscar usuario
    const user = await prisma.usuario.findUnique({
      where: { email: email.toLowerCase() },
    });

    // Por seguridad, siempre responder que el correo fue enviado
    // aunque el usuario no exista (previene enumeration)
    if (!user) {
      return NextResponse.json(
        {
          success: true,
          message: 'Si la cuenta existe, recibirás un correo para restablecer tu contraseña',
        },
        { status: 200 }
      );
    }

    // Generar token de reset
    const resetToken = generateToken();
    const resetTokenExp = new Date(Date.now() + 1 * 60 * 60 * 1000); // 1 hora

    // Guardar token en la base de datos
    await prisma.usuario.update({
      where: { id: user.id },
      data: {
        tokenReset: resetToken,
        tokenResetExp: resetTokenExp,
      },
    });

    // Enviar email
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const resetLink = `${baseUrl}/auth/reset-password?token=${resetToken}`;
    
    const userName = user.nombres || user.email;
    const emailSent = await sendEmail({
      to: user.email,
      subject: 'Restablecer contraseña - Cuenta en Línea',
      html: getResetPasswordEmailTemplate(userName, resetLink),
    });

    if (!emailSent) {
      console.warn('Email de reset no pudo ser enviado para:', user.email);
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Si la cuenta existe, recibirás un correo para restablecer tu contraseña',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in forgot-password route:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Error al procesar solicitud',
      },
      { status: 500 }
    );
  }
}

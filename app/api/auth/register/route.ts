import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword, isValidEmail, validatePasswordStrength, generateToken } from '@/lib/auth';
import { sendEmail, getVerificationEmailTemplate } from '@/lib/email';
import type { RegisterRequest, AuthResponse } from '@/types/auth';
import { z } from 'zod';

const registerSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(8, 'Contraseña muy corta'),
  passwordConfirm: z.string(),
  nombres: z.string().optional(),
  apellidos: z.string().optional(),
}).refine((data) => data.password === data.passwordConfirm, {
  message: 'Las contraseñas no coinciden',
  path: ['passwordConfirm'],
});

export async function POST(request: NextRequest): Promise<NextResponse<AuthResponse>> {
  try {
    const body: RegisterRequest = await request.json();

    // Validación con Zod
    const validation = registerSchema.safeParse(body);
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

    const { email, password, nombres, apellidos } = validation.data;

    // Validar email
    if (!isValidEmail(email)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Email inválido',
          errors: { email: ['El email no es válido'] },
        },
        { status: 400 }
      );
    }

    // Validar fortaleza de contraseña
    const passwordValidation = validatePasswordStrength(password);
    if (!passwordValidation.valid) {
      return NextResponse.json(
        {
          success: false,
          message: 'Contraseña débil',
          errors: { password: passwordValidation.errors },
        },
        { status: 400 }
      );
    }

    // Verificar si el usuario ya existe
    const existingUser = await prisma.usuario.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: 'Este email ya está registrado',
          errors: { email: ['El email ya está en uso'] },
        },
        { status: 409 }
      );
    }

    // Hashear contraseña
    const hashedPassword = await hashPassword(password);

    // Generar token de verificación
    const verificationToken = generateToken();
    const verificationTokenExp = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 horas

    // Crear usuario
    const user = await prisma.usuario.create({
      data: {
        email: email.toLowerCase(),
        password: hashedPassword,
        nombres,
        apellidos,
        tokenVerificacion: verificationToken,
        tokenVerificacionExp: verificationTokenExp,
      },
    });

    // Enviar email de verificación
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const verificationLink = `${baseUrl}/auth/verify?token=${verificationToken}`;
    
    const userName = nombres || email;

    const emailSent = await sendEmail({
      to: email,
      subject: 'Verifica tu email - Cuenta en Línea',
      html: getVerificationEmailTemplate(userName, verificationLink),
    });

    if (!emailSent) {
      console.warn('Email de verificación no pudo ser enviado para:', email);
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Usuario registrado exitosamente. Revisa tu email para verificar tu cuenta.',
        data: {
          id: user.id,
          email: user.email,
          nombres: user.nombres,
          apellidos: user.apellidos,
          emailVerificado: user.emailVerificado,
          estado: user.estado,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error in register route:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Error al registrar usuario',
      },
      { status: 500 }
    );
  }
}

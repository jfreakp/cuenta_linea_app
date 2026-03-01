import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyPassword, generateJWT } from '@/lib/auth';
import type { LoginRequest, AuthResponse } from '@/types/auth';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(1, 'Contraseña requerida'),
});

export async function POST(request: NextRequest): Promise<NextResponse<AuthResponse>> {
  try {
    const body: LoginRequest = await request.json();

    // Validación con Zod
    const validation = loginSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message: 'Email o contraseña inválidos',
          errors: validation.error.flatten().fieldErrors as Record<string, string[]>,
        },
        { status: 400 }
      );
    }

    const { email, password } = validation.data;

    // Buscar usuario
    const user = await prisma.usuario.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: 'Email o contraseña inválidos',
        },
        { status: 401 }
      );
    }

    // Verificar si el usuario está activo
    if (user.estado === 'INACTIVO') {
      return NextResponse.json(
        {
          success: false,
          message: 'Cuenta inactiva',
        },
        { status: 403 }
      );
    }

    // Verificar si el email está verificado
    if (!user.emailVerificado) {
      return NextResponse.json(
        {
          success: false,
          message: 'Por favor, verifica tu email antes de iniciar sesión',
        },
        { status: 403 }
      );
    }

    // Verificar contraseña
    const passwordMatches = await verifyPassword(password, user.password);
    if (!passwordMatches) {
      return NextResponse.json(
        {
          success: false,
          message: 'Email o contraseña inválidos',
        },
        { status: 401 }
      );
    }

    // Generar JWT
    const token = generateJWT(user.id, user.email);

    // Actualizar último login
    await prisma.usuario.update({
      where: { id: user.id },
      data: { ultimoLogin: new Date() },
    });

    // Preparar respuesta
    const response = NextResponse.json(
      {
        success: true,
        message: 'Login exitoso',
        data: {
          id: user.id,
          email: user.email,
          nombres: user.nombres,
          apellidos: user.apellidos,
          emailVerificado: user.emailVerificado,
          estado: user.estado,
          token,
        },
      },
      { status: 200 }
    );

    // Establecer cookie con el token
    response.cookies.set({
      name: 'auth_token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 días
    });

    return response;
  } catch (error) {
    console.error('Error in login route:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Error al iniciar sesión',
      },
      { status: 500 }
    );
  }
}

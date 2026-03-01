import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const response = NextResponse.json(
      {
        success: true,
        message: 'Sesión cerrada exitosamente',
      },
      { status: 200 }
    );

    // Eliminar la cookie de autenticación
    response.cookies.set({
      name: 'auth_token',
      value: '',
      httpOnly: true,
      maxAge: 0,
    });

    return response;
  } catch (error) {
    console.error('Error in logout route:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Error al cerrar sesión',
      },
      { status: 500 }
    );
  }
}

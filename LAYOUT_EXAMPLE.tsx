// Ejemplo de cómo usar el AuthProvider en app/layout.tsx

import type { Metadata } from 'next';
import { AuthProvider } from '@/components/auth/AuthContext';
import { Toaster } from 'sonner';
import './globals.css';

export const metadata: Metadata = {
  title: 'Cuenta en Línea',
  description: 'Sistema de gestión de cuentas en línea',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Link from 'next/link';

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isVerifying, setIsVerifying] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get('token');

      if (!token) {
        toast.error('Token inválido');
        setIsVerifying(false);
        return;
      }

      try {
        const response = await fetch('/api/auth/verify-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        });

        const result = await response.json();

        if (!response.ok) {
          toast.error(result.message || 'Error al verificar email');
          setIsVerifying(false);
          return;
        }

        toast.success('¡Email verificado exitosamente!');
        setIsSuccess(true);
        
        // Redirigir al login en 3 segundos
        setTimeout(() => {
          router.push('/auth/login');
        }, 3000);
      } catch (error) {
        console.error('Verify error:', error);
        toast.error('Error al conectar con el servidor');
        setIsVerifying(false);
      }
    };

    verifyEmail();
  }, [searchParams, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        {isVerifying && (
          <>
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Verificando tu email...</h2>
          </>
        )}

        {isSuccess && (
          <>
            <div className="flex justify-center">
              <div className="rounded-full bg-green-100 p-4">
                <svg
                  className="h-8 w-8 text-green-600"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">¡Email Verificado!</h2>
            <p className="text-gray-600">
              Tu cuenta está lista. Serás redirigido al login en breve.
            </p>
            <Link
              href="/auth/login"
              className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Ir a Iniciar Sesión
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

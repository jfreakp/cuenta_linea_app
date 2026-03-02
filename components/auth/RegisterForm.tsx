'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import Link from 'next/link';

const registerSchema = z
  .object({
    email: z.string().email('Email inválido'),
    nombres: z.string().optional(),
    apellidos: z.string().optional(),
    password: z
      .string()
      .min(8, 'Mínimo 8 caracteres')
      .regex(/[A-Z]/, 'Debe contener una mayúscula')
      .regex(/[a-z]/, 'Debe contener una minúscula')
      .regex(/[0-9]/, 'Debe contener un número')
      .regex(/[!@#$%^&*]/, 'Debe contener un carácter especial (!@#$%^&*)'),
    passwordConfirm: z.string(),
    acceptTerms: z.boolean().refine((val) => val === true, {
      message: 'Debes aceptar los términos y condiciones',
    }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: 'Las contraseñas no coinciden',
    path: ['passwordConfirm'],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      const { acceptTerms, ...submitData } = data;
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData),
      });

      const result = await response.json();

      if (!response.ok) {
        if (result.errors) {
          Object.values(result.errors).forEach((errorArray) => {
            (errorArray as string[]).forEach((error) => toast.error(error));
          });
        } else {
          toast.error(result.message || 'Error al registrar');
        }
        return;
      }

      toast.success('Registro exitoso. Revisa tu email para verificar tu cuenta.');
      router.push('/auth/login?registered=true');
    } catch (error) {
      console.error('Register error:', error);
      toast.error('Error al conectar con el servidor');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
        isDark
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
          : 'bg-gradient-to-br from-white via-gray-50 to-white'
      } px-4 sm:px-6 lg:px-8 py-12`}
    >
      {/* Dark Mode Toggle Button */}
      <button
        onClick={() => setIsDark(!isDark)}
        className={`fixed top-8 right-8 p-3 rounded-full transition-all duration-300 ${
          isDark
            ? 'bg-gray-700 hover:bg-gray-600 text-yellow-400'
            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
        }`}
        aria-label="Toggle dark mode"
      >
        {isDark ? '☀️' : '🌙'}
      </button>

      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1
            className={`text-4xl font-bold mb-2 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
          >
            Crea tu <span className="text-[#78BE20]">cuenta</span>
          </h1>

          {/* Step Indicator */}
          <div className="flex items-center justify-center gap-3 mt-4">
            <span
              className={`text-sm font-medium ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              Paso 1 de 3
            </span>
            {/* Progress Bar */}
            <div
              className={`w-16 h-1 rounded-full overflow-hidden ${
                isDark ? 'bg-gray-700' : 'bg-gray-200'
              }`}
            >
              <div className="w-1/3 h-full bg-[#78BE20]"></div>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Nombre Completo */}
          <div>
            <input
              id="nombres"
              type="text"
              placeholder="Nombre completo"
              className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#78BE20] ${
                isDark
                  ? `bg-gray-800 border-gray-700 text-white placeholder-gray-500 ${
                      errors.nombres
                        ? 'border-red-500 focus:ring-red-500'
                        : 'focus:border-[#78BE20]'
                    }`
                  : `bg-white border-gray-200 text-gray-900 placeholder-gray-400 ${
                      errors.nombres
                        ? 'border-red-500 focus:ring-red-500'
                        : 'focus:border-[#78BE20]'
                    }`
              }`}
              {...register('nombres')}
            />
            {errors.nombres && (
              <p className="mt-2 text-sm text-red-500">{errors.nombres.message}</p>
            )}
          </div>

          {/* Apellido */}
          <div>
            <input
              id="apellidos"
              type="text"
              placeholder="Apellido"
              className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#78BE20] ${
                isDark
                  ? `bg-gray-800 border-gray-700 text-white placeholder-gray-500 ${
                      errors.apellidos
                        ? 'border-red-500 focus:ring-red-500'
                        : 'focus:border-[#78BE20]'
                    }`
                  : `bg-white border-gray-200 text-gray-900 placeholder-gray-400 ${
                      errors.apellidos
                        ? 'border-red-500 focus:ring-red-500'
                        : 'focus:border-[#78BE20]'
                    }`
              }`}
              {...register('apellidos')}
            />
            {errors.apellidos && (
              <p className="mt-2 text-sm text-red-500">{errors.apellidos.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              id="email"
              type="email"
              required
              placeholder="Correo electrónico"
              className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#78BE20] ${
                isDark
                  ? `bg-gray-800 border-gray-700 text-white placeholder-gray-500 ${
                      errors.email
                        ? 'border-red-500 focus:ring-red-500'
                        : 'focus:border-[#78BE20]'
                    }`
                  : `bg-white border-gray-200 text-gray-900 placeholder-gray-400 ${
                      errors.email
                        ? 'border-red-500 focus:ring-red-500'
                        : 'focus:border-[#78BE20]'
                    }`
              }`}
              {...register('email')}
            />
            {errors.email && (
              <p className="mt-2 text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="Nueva contraseña"
                className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#78BE20] ${
                  isDark
                    ? `bg-gray-800 border-gray-700 text-white placeholder-gray-500 ${
                        errors.password
                          ? 'border-red-500 focus:ring-red-500'
                          : 'focus:border-[#78BE20]'
                      }`
                    : `bg-white border-gray-200 text-gray-900 placeholder-gray-400 ${
                        errors.password
                          ? 'border-red-500 focus:ring-red-500'
                          : 'focus:border-[#78BE20]'
                      }`
                }`}
                {...register('password')}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute right-4 top-1/2 -translate-y-1/2 transition-colors ${
                  isDark ? 'text-gray-500 hover:text-gray-400' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
            {errors.password && (
              <p className="mt-2 text-sm text-red-500">{errors.password.message}</p>
            )}
            <div
              className={`mt-3 text-xs space-y-1 ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              <p className="font-medium">La contraseña debe contener:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Mínimo 8 caracteres</li>
                <li>Una letra mayúscula (A-Z)</li>
                <li>Una letra minúscula (a-z)</li>
                <li>Un número (0-9)</li>
                <li>Un carácter especial (!@#$%^&*)</li>
              </ul>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <div className="relative">
              <input
                id="passwordConfirm"
                type={showConfirmPassword ? 'text' : 'password'}
                required
                placeholder="Confirmar contraseña"
                className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#78BE20] ${
                  isDark
                    ? `bg-gray-800 border-gray-700 text-white placeholder-gray-500 ${
                        errors.passwordConfirm
                          ? 'border-red-500 focus:ring-red-500'
                          : 'focus:border-[#78BE20]'
                      }`
                    : `bg-white border-gray-200 text-gray-900 placeholder-gray-400 ${
                        errors.passwordConfirm
                          ? 'border-red-500 focus:ring-red-500'
                          : 'focus:border-[#78BE20]'
                      }`
                }`}
                {...register('passwordConfirm')}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className={`absolute right-4 top-1/2 -translate-y-1/2 transition-colors ${
                  isDark ? 'text-gray-500 hover:text-gray-400' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {showConfirmPassword ? '🙈' : '👁️'}
              </button>
            </div>
            {errors.passwordConfirm && (
              <p className="mt-2 text-sm text-red-500">{errors.passwordConfirm.message}</p>
            )}
          </div>

          {/* Terms Checkbox */}
          <div className="flex items-start gap-3 pt-2">
            <input
              id="acceptTerms"
              type="checkbox"
              className="w-5 h-5 rounded cursor-pointer accent-[#78BE20] mt-0.5"
              {...register('acceptTerms')}
            />
            <label
              htmlFor="acceptTerms"
              className={`text-sm cursor-pointer leading-relaxed ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              Acepto los{' '}
              <Link
                href="/terms"
                className="text-[#78BE20] hover:text-[#6aad1d] font-medium"
              >
                términos y condiciones
              </Link>
            </label>
          </div>
          {errors.acceptTerms && (
            <p className="text-sm text-red-500">{errors.acceptTerms.message}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-300 mt-6 ${
              isLoading
                ? `bg-gray-400 cursor-not-allowed ${
                    isDark ? 'hover:bg-gray-400' : 'hover:bg-gray-400'
                  }`
                : `bg-[#78BE20] hover:bg-[#6aad1d] active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#78BE20] ${
                    isDark ? 'focus:ring-offset-gray-900' : 'focus:ring-offset-white'
                  }`
            }`}
          >
            {isLoading ? 'Registrando...' : 'Continuar'}
          </button>

          {/* Login Link */}
          <p
            className={`text-center text-sm ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            ¿Ya tienes cuenta?{' '}
            <Link href="/auth/login" className="text-[#78BE20] hover:text-[#6aad1d] font-medium">
              Inicia sesión
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

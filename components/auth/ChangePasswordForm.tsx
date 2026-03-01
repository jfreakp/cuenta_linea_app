'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';

const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Contraseña actual requerida'),
    newPassword: z
      .string()
      .min(8, 'Mínimo 8 caracteres')
      .regex(/[A-Z]/, 'Debe contener una mayúscula')
      .regex(/[a-z]/, 'Debe contener una minúscula')
      .regex(/[0-9]/, 'Debe contener un número')
      .regex(/[!@#$%^&*]/, 'Debe contener un carácter especial (!@#$%^&*)'),
    newPasswordConfirm: z.string(),
  })
  .refine((data) => data.newPassword === data.newPasswordConfirm, {
    message: 'Las contraseñas no coinciden',
    path: ['newPasswordConfirm'],
  });

type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

export default function ChangePasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
  });

  const onSubmit = async (data: ChangePasswordFormData) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        if (result.errors) {
          Object.values(result.errors).forEach((errorArray) => {
            (errorArray as string[]).forEach((error) => toast.error(error));
          });
        } else {
          toast.error(result.message || 'Error al cambiar contraseña');
        }
        return;
      }

      toast.success('Contraseña cambida exitosamente');
      reset();
    } catch (error) {
      console.error('Change password error:', error);
      toast.error('Error al conectar con el servidor');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Cambiar Contraseña</h2>
        <p className="mt-2 text-sm text-gray-600">
          Actualiza tu contraseña para mantener tu cuenta segura
        </p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        {/* Contraseña Actual */}
        <div>
          <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
            Contraseña Actual
          </label>
          <div className="mt-1 relative">
            <input
              id="currentPassword"
              type={showPasswords.current ? 'text' : 'password'}
              className={`block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                errors.currentPassword ? 'border-red-500' : ''
              }`}
              placeholder="••••••••"
              {...register('currentPassword')}
            />
            <button
              type="button"
              onClick={() =>
                setShowPasswords({ ...showPasswords, current: !showPasswords.current })
              }
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPasswords.current ? '🙈' : '👁️'}
            </button>
          </div>
          {errors.currentPassword && (
            <p className="mt-1 text-sm text-red-600">{errors.currentPassword.message}</p>
          )}
        </div>

        {/* Nueva Contraseña */}
        <div>
          <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
            Nueva Contraseña
          </label>
          <div className="mt-1 relative">
            <input
              id="newPassword"
              type={showPasswords.new ? 'text' : 'password'}
              className={`block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                errors.newPassword ? 'border-red-500' : ''
              }`}
              placeholder="••••••••"
              {...register('newPassword')}
            />
            <button
              type="button"
              onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPasswords.new ? '🙈' : '👁️'}
            </button>
          </div>
          {errors.newPassword && (
            <p className="mt-1 text-sm text-red-600">{errors.newPassword.message}</p>
          )}
          <div className="mt-2 text-xs text-gray-500">
            <p>La contraseña debe contener:</p>
            <ul className="list-disc list-inside">
              <li>Mínimo 8 caracteres</li>
              <li>Una letra mayúscula (A-Z)</li>
              <li>Una letra minúscula (a-z)</li>
              <li>Un número (0-9)</li>
              <li>Un carácter especial (!@#$%^&*)</li>
            </ul>
          </div>
        </div>

        {/* Confirmar Contraseña */}
        <div>
          <label
            htmlFor="newPasswordConfirm"
            className="block text-sm font-medium text-gray-700"
          >
            Confirmar Nueva Contraseña
          </label>
          <input
            id="newPasswordConfirm"
            type="password"
            className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
              errors.newPasswordConfirm ? 'border-red-500' : ''
            }`}
            placeholder="••••••••"
            {...register('newPasswordConfirm')}
          />
          {errors.newPasswordConfirm && (
            <p className="mt-1 text-sm text-red-600">{errors.newPasswordConfirm.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
            isLoading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
          }`}
        >
          {isLoading ? 'Cambiando contraseña...' : 'Cambiar Contraseña'}
        </button>
      </form>
    </div>
  );
}

import ChangePasswordForm from '@/components/auth/ChangePasswordForm';

export const metadata = {
  title: 'Cambiar Contraseña - Cuenta en Línea',
  description: 'Cambia tu contraseña',
};

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <ChangePasswordForm />
      </div>
    </div>
  );
}

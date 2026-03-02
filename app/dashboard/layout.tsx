'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState, useEffect, useRef } from "react";

type User = {
  nombres: string;
  apellidos: string;
  email: string;
};

// app/dashboard/layout.tsx
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Obtener información del usuario
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/auth/me');
        if (response.ok) {
          const data = await response.json();
          setUser(data.data);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);

  // Cerrar menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };

    if (showUserMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showUserMenu]);

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      });

      if (response.ok) {
        toast.success('Sesión cerrada exitosamente');
        router.push('/auth/login');
      } else {
        toast.error('Error al cerrar sesión');
      }
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Error al cerrar sesión');
    }
  };
  return (
    <>
      <header className="h-16 border-b border-border-light flex items-center justify-between px-6 bg-background-light sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <span className="material-symbols-outlined text-white text-xl">
              account_balance
            </span>
          </div>
          <span className="text-xl font-bold tracking-tight">
            BANCO<span className="text-primary">VERDE</span>
          </span>
        </div>
        <div className="flex items-center gap-6">
          <button className="relative p-2 text-slate-500 hover:bg-surface-light rounded-full transition-colors">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-white"></span>
          </button>
          <div className="flex items-center gap-3 pl-4 border-l border-border-light">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-slate-900">
                {user ? `${user.nombres} ${user.apellidos}` : 'Cargando...'}
              </p>
              <p className="text-xs text-slate-500">Gestión de Clientes</p>
            </div>
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="w-10 h-10 rounded-full bg-surface-light border border-border-light overflow-hidden hover:ring-2 hover:ring-primary transition-all"
              >
                <img
                  alt="Avatar de usuario"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCi2zsQ8o1kEH44yyQyepIe9MzNaUDFnZtGtqxoMA9sms4WleMpQDdzo1fVO3gTPgKKd4bNWG9aJwhZyW_hxthiocioTPj9QUeQE2WkOapWDECBMTOG21_3N3zJflRm1O3I9b4tqjA-Z6omFEcF_W5tJY519esitOid0SJQByqrMWE2YtGpwJJn6tpxebpKrapph1AiVdTfUwdy_9wigsNDUSePsZQSOllL0Sv6fbIiV870_4sfO9LmMd-JFSdRfCeTf2UwoclV0Uvd"
                />
              </button>
              
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-border-light py-1 z-50">
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2 transition-colors"
                  >
                    <span className="material-symbols-outlined text-xl">logout</span>
                    Cerrar Sesión
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      <div className="flex">
        <aside className="w-64 fixed h-[calc(100vh-64px)] border-r border-border-light bg-background-light hidden md:block">
          <nav className="p-4 space-y-1">           
            <Link
              className="flex items-center gap-3 px-4 py-3 text-primary bg-primary/10 rounded-lg font-medium"
              href="/dashboard"
            >
              <span className="material-symbols-outlined">group</span>
              Clientes
            </Link>
          </nav>
          <div className="absolute bottom-4 left-4 right-4">
            <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl">
              <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">
                Sistema Operativo
              </p>
              <p className="text-sm text-slate-600 mb-3">
                Panel administrativo de control total.
              </p>
            </div>
          </div>
        </aside>
        <main className="flex-1 ml-0 lg:p-10 bg-surface-light min-h-[calc(100vh-64px)]">
          {children}
        </main>
      </div>
      <div className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-border-light flex md:hidden items-center justify-around z-50">
        <button className="flex flex-col items-center gap-1 text-slate-400">
          <span className="material-symbols-outlined">home</span>
          <span className="text-[10px] font-bold">Inicio</span>
        </button>
      </div>
    </>
  );
}

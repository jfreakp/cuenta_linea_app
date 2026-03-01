import Link from "next/link";

// app/dashboard/layout.tsx
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
          <div className="flex items-center gap-3 pl-4 border-l border-border-light ">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-slate-900">
                Admin Central
              </p>
              <p className="text-xs text-slate-500">Gestión de Clientes</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-surface-light  border border-border-light overflow-hidden">
              <img
                alt="Avatar de usuario"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCi2zsQ8o1kEH44yyQyepIe9MzNaUDFnZtGtqxoMA9sms4WleMpQDdzo1fVO3gTPgKKd4bNWG9aJwhZyW_hxthiocioTPj9QUeQE2WkOapWDECBMTOG21_3N3zJflRm1O3I9b4tqjA-Z6omFEcF_W5tJY519esitOid0SJQByqrMWE2YtGpwJJn6tpxebpKrapph1AiVdTfUwdy_9wigsNDUSePsZQSOllL0Sv6fbIiV870_4sfO9LmMd-JFSdRfCeTf2UwoclV0Uvd"
              />
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

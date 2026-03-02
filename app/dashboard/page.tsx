"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type ClienteRow = {
  id: number;
  nombres: string;
  apellidos: string;
  correo: string;
  telefono: string | null;
  motivo_apertura: string | null;
  estado: string;
  createdAt: string;
  datosPersonales: {
    cedula: string;
  };
};

export default function DashboardPage() {
  const router = useRouter();
  const [clientes, setClientes] = useState<ClienteRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState("");
  const [estadoFiltro, setEstadoFiltro] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchClientes();
    }
  }, [isAuthenticated]);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/me');
      
      if (!response.ok) {
        router.push('/auth/login');
        return;
      }
      
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Error verificando autenticación:', error);
      router.push('/auth/login');
    }
  };

  const fetchClientes = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/clientes");
      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || "Error al cargar clientes");
        return;
      }

      setClientes(data.clientes || []);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error al cargar los clientes");
    } finally {
      setLoading(false);
    }
  };

  const clientesFiltrados = clientes.filter((cliente) => {
    const busqueda = filtro.toLowerCase();
    const coincideBusqueda =
      cliente.nombres.toLowerCase().includes(busqueda) ||
      cliente.apellidos.toLowerCase().includes(busqueda) ||
      cliente.datosPersonales.cedula.includes(busqueda) ||
      cliente.correo.toLowerCase().includes(busqueda);

    const coincideEstado = estadoFiltro
      ? cliente.estado === estadoFiltro
      : true;
    return coincideBusqueda && coincideEstado;
  });

  const totalPages = Math.ceil(clientesFiltrados.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedClientes = clientesFiltrados.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const stats = {
    total: clientes.length,
    pendientes: clientes.filter((c) => c.estado === "PENDIENTE").length,
    completados: clientes.filter((c) => c.estado !== "PENDIENTE").length,
  };

  return (
    <main className="flex-1 ml-0 md:ml-64 p-6 lg:p-10 bg-surface-light min-h-[calc(100vh-64px)]">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">
              <span className="text-primary">Clientes</span>
            </h1>
            <p className="text-slate-500 text-sm">
              Visualiza y administra la base de datos de usuarios.
            </p>
          </div>
          <button className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-lg font-bold shadow-sm hover:brightness-105 transition-all">
            <span className="material-symbols-outlined">person_add</span>
            Nuevo Cliente
          </button>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-border-light overflow-hidden">
          <div className="p-4 bg-whiteborder-b border-border-light flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">
                search
              </span>
              <input
                className="w-full pl-10 pr-4 py-2 bg-surface-light border-none focus:ring-2 focus:ring-primary rounded-lg text-sm transition-all"
                placeholder="Buscar cliente por nombre o cédula..."
                type="text"
              />
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <select className="bg-surface-light border-none focus:ring-2 focus:ring-primary rounded-lg text-sm py-2 px-4 pr-8 text-slate-600 w-full md:w-40">
                <option value="">Estado</option>
                <option value="active">Activo</option>
                <option value="inactive">Inactivo</option>
              </select>
              <select className="bg-surface-light border-none focus:ring-2 focus:ring-primary rounded-lg text-sm py-2 px-4 pr-8 text-slate-600 w-full md:w-48">
                <option value="">Tipo de Producto</option>
                <option value="savings">Cuenta Ahorros</option>
                <option value="checking">Cuenta Corriente</option>
                <option value="credit">Tarjeta de Crédito</option>
              </select>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-surface-light/50">
                <tr className="text-xs text-slate-500 uppercase tracking-wider">
                  <th className="px-6 py-4 font-semibold">Cliente</th>
                  <th className="px-6 py-4 font-semibold">Identificación</th>
                  <th className="px-6 py-4 font-semibold">Estado</th>
                  <th className="px-6 py-4 font-semibold">Fecha</th>
                  <th className="px-6 py-4 font-semibold text-right">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-light">
                {clientes.map((cliente) => (
                  <tr className="hover:bg-surface-light/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-100 overflow-hidden">
                          <img
                            alt="Andrés Mendoza"
                            className="w-full h-full object-cover"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJ_tvzk3JFH7hZxHwoW5Zw-0UzjWXDXvhdEKRbtWExZgEcJBn_yRKbsbA8TnA7MTtx8qbsfpRQi9RgOv1IdfdN5j5Bpw-wr7aYMWfc0Ado30fBTV2A4CXP6l1tzgc8Ycb7VdFeUQ2VZC8krxm96eIo3LZkFN_hHAkyGolSo0A5oxCEKjYz6QiitH1OrAHGePh62dN5ADo1xslk-Thu6VsLnR_tvUb_oQgKugjL6W1-_75vCjZey99Ysm2Tw2JfzTdKhg6tRkwog3Zc"
                          />
                        </div>
                        <div>
                          <p className="font-bold text-slate-500">
                            {cliente.nombres} {cliente.apellidos}
                          </p>
                          <p className="text-xs text-slate-500">
                            {cliente.correo}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {cliente.datosPersonales.cedula}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 text-slate-500 text-xs font-bold rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                        {cliente.estado === "PENDIENTE"
                          ? "Pendiente"
                          : "Activo"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {cliente.createdAt}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-slate-400 hover:text-primary transition-colors">
                        <Link href={`/dashboard/clientes/${cliente.id}`}>
                          <span className="material-symbols-outlined">
                            visibility
                          </span>
                        </Link>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t border-border-light flex items-center justify-between">
            <p className="text-sm text-slate-500">
              Mostrando 4 de 1.250 clientes
            </p>
            <div className="flex gap-2">
              <button className="p-2 border border-border-light rounded hover:bg-surface-light transition-colors">
                <span className="material-symbols-outlined text-sm">
                  chevron_left
                </span>
              </button>
              <button className="p-2 border border-border-light rounded bg-primary text-white font-bold text-sm px-4">
                1
              </button>
              <button className="p-2 border border-border-light rounded hover:bg-surface-light transition-colors text-sm px-4">
                2
              </button>
              <button className="p-2 border border-border-light rounded hover:bg-surface-light transition-colors">
                <span className="material-symbols-outlined text-sm">
                  chevron_right
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

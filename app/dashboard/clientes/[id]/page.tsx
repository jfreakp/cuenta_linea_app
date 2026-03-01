'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';

type ClienteDetalle = {
  id: number;
  nombres: string;
  apellidos: string;
  correo: string;
  telefono: string | null;
  motivo_apertura: string | null;
  estado: string;
  createdAt: string;
  updatedAt: string | null;
  datosPersonales: {
    cedula: string;
    codigo_dactilar: string | null;
    autoriza_verificacion: boolean;
  };
  datosDomicilio: {
    provincia: string;
    canton: string;
    parroquia: string;
    barrio: string | null;
    direccion: string;
    referencia: string | null;
    numero_casa: string | null;
    tipo_telefono: string | null;
    numero_telefono: string | null;
  };
  datosLaborales: {
    relacion_laboral: string;
    ingresos_mensuales: number;
    actividad_economica: string;
    direccion_laboral: string | null;
    provincia_laboral: string | null;
    canton_laboral: string | null;
    parroquia_laboral: string | null;
    barrio_laboral: string | null;
    calle_principal_laboral: string | null;
    calle_secundaria_laboral: string | null;
    referencia_laboral: string | null;
    numeracion_laboral: string | null;
    telefono_laboral: string | null;
    tipo_telefono_laboral: string | null;
    numero_casa_laboral: string | null;
  };
  datosFinancieros: {
    activos: number;
    pasivos: number;
    patrimonio: number;
  };
  legalizacion: {
    acepta_terminos: boolean;
    ip_solicitud: string | null;
    navegador: string | null;
  };
};

export default function ClienteDetallePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [clienteId, setClienteId] = useState<string | null>(null);
  const [cliente, setCliente] = useState<ClienteDetalle | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    params.then((p) => {
      setClienteId(p.id);
    });
  }, [params]);

  useEffect(() => {
    if (!clienteId) return;
    fetchCliente();
  }, [clienteId]);

  const fetchCliente = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/clientes/${clienteId}`);
      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || 'Error al cargar el cliente');
        return;
      }

      setCliente(data);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al cargar el cliente');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background-light p-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-600">Cargando cliente...</p>
        </div>
      </div>
    );
  }

  if (!cliente) {
    return (
      <div className="min-h-screen bg-background-light p-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-600 mb-4">Cliente no encontrado</p>
          <Link
            href="/dashboard"
            className="text-primary hover:text-[#68a825] font-medium"
          >
            Volver al dashboard
          </Link>
        </div>
      </div>
    );
  }

  const SectionCard = ({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) => (
    <div className="bg-white rounded-lg shadow-sm border border-border-light p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        {title}
      </h2>
      {children}
    </div>
  );

  const InfoRow = ({ label, value }: { label: string; value: React.ReactNode }) => (
    <div className="flex justify-between py-2 border-b border-border-light last:border-b-0">
      <span className="text-gray-600 font-medium">{label}</span>
      <span className="text-gray-400">{value || '-'}</span>
    </div>
  );

  return (
    <div className='flex-1 ml-0 md:ml-64 p-6 lg:p-10 bg-surface-light min-h-[calc(100vh-64px)]'>
      <div>
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/dashboard"
            className="text-primary hover:text-[#68a825] font-medium mb-4 inline-block"
          >
            ← Volver al dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">
            {cliente.nombres} {cliente.apellidos}
          </h1>
          <p className="text-gray-600 mt-2">
            Cédula: {cliente.datosPersonales.cedula}
          </p>
        </div>

        {/* Datos del Cliente */}
        <SectionCard title="Datos del Cliente">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <InfoRow label="Nombres" value={cliente.nombres} />
              <InfoRow label="Apellidos" value={cliente.apellidos} />
              <InfoRow label="Correo" value={cliente.correo} />
              <InfoRow label="Teléfono" value={cliente.telefono} />
            </div>
            <div>
              <InfoRow label="Motivo de Apertura" value={cliente.motivo_apertura} />
              <InfoRow label="Estado" value={cliente.estado} />
              <InfoRow
                label="Registrado"
                value={new Date(cliente.createdAt).toLocaleDateString()}
              />
            </div>
          </div>
        </SectionCard>

        {/* Datos Personales */}
        <SectionCard title="Datos Personales">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoRow label="Cédula" value={cliente.datosPersonales.cedula} />
            <InfoRow label="Código Dactilar" value={cliente.datosPersonales.codigo_dactilar} />
            <InfoRow
              label="Autoriza Verificación"
              value={cliente.datosPersonales.autoriza_verificacion ? 'Sí' : 'No'}
            />
          </div>
        </SectionCard>

        {/* Datos Domicilio */}
        <SectionCard title="Datos del Domicilio">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <InfoRow label="Provincia" value={cliente.datosDomicilio.provincia} />
              <InfoRow label="Cantón" value={cliente.datosDomicilio.canton} />
              <InfoRow label="Parroquia" value={cliente.datosDomicilio.parroquia} />
              <InfoRow label="Barrio" value={cliente.datosDomicilio.barrio} />
            </div>
            <div>
              <InfoRow label="Dirección" value={cliente.datosDomicilio.direccion} />
              <InfoRow label="Número de Casa" value={cliente.datosDomicilio.numero_casa} />
              <InfoRow label="Referencia" value={cliente.datosDomicilio.referencia} />
              <InfoRow label="Teléfono" value={cliente.datosDomicilio.numero_telefono} />
            </div>
          </div>
        </SectionCard>

        {/* Datos Laborales */}
        <SectionCard title="Datos Laborales">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <InfoRow label="Relación Laboral" value={cliente.datosLaborales.relacion_laboral} />
              <InfoRow
                label="Actividad Económica"
                value={cliente.datosLaborales.actividad_economica}
              />
              <InfoRow
                label="Ingresos Mensuales"
                value={`$${Number(cliente.datosLaborales.ingresos_mensuales).toFixed(2)}`}
              />
              <InfoRow label="Dirección Laboral" value={cliente.datosLaborales.direccion_laboral} />
            </div>
            <div>
              <InfoRow label="Provincia Laboral" value={cliente.datosLaborales.provincia_laboral} />
              <InfoRow label="Cantón Laboral" value={cliente.datosLaborales.canton_laboral} />
              <InfoRow label="Parroquia Laboral" value={cliente.datosLaborales.parroquia_laboral} />
              <InfoRow label="Teléfono Laboral" value={cliente.datosLaborales.telefono_laboral} />
            </div>
          </div>
        </SectionCard>

        {/* Datos Financieros */}
        <SectionCard title="Datos Financieros">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
              <p className="text-blue-700 text-sm font-medium mb-1">Activos</p>
              <p className="text-2xl font-bold text-blue-900">
                ${Number(cliente.datosFinancieros.activos).toFixed(2)}
              </p>
            </div>
            <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-lg">
              <p className="text-red-700 text-sm font-medium mb-1">Pasivos</p>
              <p className="text-2xl font-bold text-red-900">
                ${Number(cliente.datosFinancieros.pasivos).toFixed(2)}
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg">
              <p className="text-green-700 text-sm font-medium mb-1">
                Patrimonio
              </p>
              <p className="text-2xl font-bold text-green-900">
                ${Number(cliente.datosFinancieros.patrimonio).toFixed(2)}
              </p>
            </div>
          </div>
        </SectionCard>

        {/* Legalización */}
        <SectionCard title="Legalización">
          <div>
            <InfoRow
              label="Acepta Términos"
              value={cliente.legalizacion.acepta_terminos ? 'Sí' : 'No'}
            />
            <InfoRow label="IP de Solicitud" value={cliente.legalizacion.ip_solicitud} />
            <InfoRow label="Navegador" value={cliente.legalizacion.navegador} />
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

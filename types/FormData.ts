type FormData = {
  datosPersonales: {
    cedula: string;
    codigo_dactilar: string;
    autoriza_verificacion: boolean;
  };

  datosCliente: {
    nombres: string;
    apellidos: string;
    correo: string;
    telefono: string;
    motivo_apertura: string;
  };

  datosDomicilio: {
    provincia: string;
    canton: string;
    parroquia: string;
    barrio: string;
    direccion: string;
    referencia: string;
    numero_casa: string;
    tipo_telefono: string;
    numero_telefono: string;
  };

  datosLaborales: {
    relacion_laboral: string;
    ingresos_mensuales: number;
    actividad_economica: string;
    direccion_laboral: string;
    provincia: string;
    canton: string;
    parroquia: string;
    barrio: string;
    telefono_laboral: string;
    calle_principal: string;
    calle_secundaria: string;
    referencia: string;
    numeracion: string;
    telefono: string;
    tipo_telefono: string;
  };

  datosFinancieros: {
    activos: number;
    pasivos: number;
    patrimonio: number;
  };
};

export type { FormData };

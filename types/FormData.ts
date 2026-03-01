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
    provincia_laboral: string;
    canton_laboral: string;
    parroquia_laboral: string;
    barrio_laboral: string;
    calle_principal_laboral: string;
    calle_secundaria_laboral: string;
    referencia_laboral: string;
    numeracion_laboral: string;
    telefono_laboral: string;
    tipo_telefono_laboral: string;
    numero_casa_laboral: string;
  };

  datosFinancieros: {
    activos: number;
    pasivos: number;
    patrimonio: number;
  };

  legalizacion: {
    acepta_terminos: boolean;
  };
};

export type { FormData };

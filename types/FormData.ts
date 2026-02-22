type FormData = {
  datosPersonales: {
    cedula: string;
    codigo_dactilar: string;
    autoriza_verificacion: boolean;
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
};

export type { FormData };

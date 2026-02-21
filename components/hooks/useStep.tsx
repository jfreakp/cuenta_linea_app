import { useCallback, type Dispatch, type SetStateAction } from "react";

type FormData = {
  datosPersonales: {
    cedula: string;
    codigo_dactilar: string;
    autoriza_verificacion: boolean;
  };
  datosDomicilio: {
    direccion: string;
    ciudad: string;
    estado: string;
    codigo_postal: string;
  };
};

export function useStep(
  step: number,
  setStep: Dispatch<SetStateAction<number>>,
  formData: FormData
) {
  const nextStep = useCallback(() => {
    if (step === 1 && !formData.datosPersonales.cedula) {
      alert("La cédula es obligatoria");
      return;
    }

    if (step === 1 && !formData.datosPersonales.codigo_dactilar) {
      alert("El código dactilar es obligatorio");
      return;
    }

    if (step === 1 && !formData.datosPersonales.autoriza_verificacion) {
      alert("Debes autorizar la verificación de tus datos");
      return;
    }

    if (step === 2 && !formData.datosPersonales.codigo_dactilar) {
      alert("El código dactilar es obligatorio");
      return;
    }
    setStep((s) => s + 1);
  }, [step, formData, setStep]);

  const prevStep = useCallback(() => {
    setStep((s) => Math.max(1, s - 1));
  }, [setStep]);

  return { nextStep, prevStep } as const;
}

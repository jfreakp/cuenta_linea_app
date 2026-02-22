import { useCallback, type Dispatch, type SetStateAction } from "react";
import type { FormData } from "../../types/FormData";

export function useStep(
  step: number,
  setStep: Dispatch<SetStateAction<number>>,
  formData: FormData,
) {
  const nextStep = useCallback(() => {
    if (step === 1) {
      if (!formData.datosPersonales.cedula) {
        alert("La cédula es obligatoria");
        return;
      }

      if (!formData.datosPersonales.codigo_dactilar) {
        alert("El código dactilar es obligatorio");
        return;
      }

      if (!formData.datosPersonales.autoriza_verificacion) {
        alert("Debes autorizar la verificación de tus datos");
        return;
      }
    }

    if (step === 2) {
      if (!formData.datosDomicilio.provincia) {
        alert("La provincia es obligatoria");
        return;
      }

      if (!formData.datosDomicilio.canton) {
        alert("El cantón es obligatorio");
        return;
      }

      if (!formData.datosDomicilio.parroquia) {
        alert("La parroquia es obligatoria");
        return;
      }

      if (!formData.datosDomicilio.barrio) {
        alert("El barrio es obligatorio");
        return;
      }

      if (!formData.datosDomicilio.direccion) {
        alert("La dirección es obligatoria");
        return;
      }

      if (!formData.datosDomicilio.referencia) {
        alert("La referencia es obligatoria");
        return;
      }

      if (!formData.datosDomicilio.tipo_telefono) {
        alert("El tipo de teléfono es obligatorio");
        return;
      }

      if (!formData.datosDomicilio.numero_telefono) {
        alert("El número de teléfono es obligatorio");
        return;
      }
    }

    setStep((s) => s + 1);
  }, [step, formData, setStep]);

  const prevStep = useCallback(() => {
    setStep((s) => Math.max(1, s - 1));
  }, [setStep]);

  console.log("Form data at step", step, formData);

  return { nextStep, prevStep } as const;
}

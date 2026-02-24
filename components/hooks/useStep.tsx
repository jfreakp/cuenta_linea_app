import { useCallback, type Dispatch, type SetStateAction } from "react";
import type { FormData } from "../../types/FormData";
import { SonnerNotification } from "../notifications/sonnerNotification";

export function useStep(
  step: number,
  setStep: Dispatch<SetStateAction<number>>,
  formData: FormData,
) {
  const nextStep = useCallback(() => {
    if (step === 1) {
      if (!formData.datosPersonales.cedula) {
        SonnerNotification({
          type: "error",
          message: "La cédula es obligatoria",
        }); 
        return;
      }

      if (!formData.datosPersonales.codigo_dactilar) {
        SonnerNotification({
          type: "error",
          message: "El código dactilar es obligatorio",
        });
        return;
      }

      if (!formData.datosPersonales.autoriza_verificacion) {
        SonnerNotification({
          type: "error",
          message: "Debes autorizar la verificación de tus datos",
        });
        return;
      }
    }

    if (step === 2) {
      if (!formData.datosDomicilio.provincia) {
        SonnerNotification({
          type: "error",
          message: "La provincia es obligatoria",
        });
        return;
      }

      if (!formData.datosDomicilio.canton) {
        SonnerNotification({
          type: "error",
          message: "El cantón es obligatorio",
        });
        return;
      }

      if (!formData.datosDomicilio.parroquia) {
        SonnerNotification({
          type: "error",
          message: "La parroquia es obligatoria",
        });
        return;
      }

      if (!formData.datosDomicilio.barrio) {
        SonnerNotification({
          type: "error",
          message: "El barrio es obligatorio",
        });
        return;
      }

      if (!formData.datosDomicilio.direccion) {
        SonnerNotification({
          type: "error",
          message: "La dirección es obligatoria",
        });
        return;
      }

      if (!formData.datosDomicilio.referencia) {
        SonnerNotification({
          type: "error",
          message: "La referencia es obligatoria",
        });
        return;
      }

      if (!formData.datosDomicilio.tipo_telefono) {
        SonnerNotification({
          type: "error",
          message: "El tipo de teléfono es obligatorio",
        });
        return;
      }

      if (!formData.datosDomicilio.numero_telefono) {
        SonnerNotification({
          type: "error",
          message: "El número de teléfono es obligatorio",
        });
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

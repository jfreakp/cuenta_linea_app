"use client";
import { useState } from "react";
import { AperturaStep } from "./steps/AperturaStep";
import { SiguienteButton } from "./buttons/ContinuarButton";
import { useStep } from "./hooks/useStep";
import { DomicilioStep } from "./steps/DomicilioStep";
import type { FormData } from "../types/FormData";
import { ClienteStep } from "./steps/ClienteStep";
import { LaboralesStep } from "./steps/LaboralesStep";
import { LegalizacionStep } from "./steps/Legalizacion";
import { FinalizarButton } from "./buttons/FinalizarButton";
import { FinancieroStep } from "./steps/FinancieroStep";
import { toast } from "sonner";

export default function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    datosPersonales: {
      cedula: "",
      codigo_dactilar: "",
      autoriza_verificacion: false,
    },
    datosDomicilio: {
      provincia: "",
      canton: "",
      parroquia: "",
      barrio: "",
      direccion: "",
      referencia: "",
      numero_casa: "",
      tipo_telefono: "",
      numero_telefono: "",
    },
    datosCliente: {
      nombres: "",
      apellidos: "",
      correo: "",
      telefono: "",
      motivo_apertura: "",
    },
    datosLaborales: {
      relacion_laboral: "",
      ingresos_mensuales: 0,
      actividad_economica: "",
      direccion_laboral: "",
      provincia_laboral: "",
      canton_laboral: "",
      parroquia_laboral: "",
      barrio_laboral: "",
      calle_principal_laboral: "",
      calle_secundaria_laboral: "",
      referencia_laboral: "",
      numeracion_laboral: "",
      telefono_laboral: "",
      tipo_telefono_laboral: "",
      numero_casa_laboral: "",
    },
    datosFinancieros: {
      activos: 0,
      pasivos: 0,
      patrimonio: 0,
    },
    legalizacion: {
      acepta_terminos: false,
    },
  });

  const { nextStep, prevStep } = useStep(step, setStep, formData);

  const progress = (step / 6) * 100;

  const handleFinalize = async () => {
    try {
      // Validar que los datos requeridos estén completos
      if (!formData.datosPersonales.cedula) {
        toast.error("Por favor complete los datos personales");
        return;
      }
      if (!formData.datosCliente.correo) {
        toast.error("Por favor complete el correo");
        return;
      }
      if (!formData.legalizacion.acepta_terminos) {
        toast.error("Debe aceptar los términos y condiciones");
        return;
      }

      // Llamar al API para guardar los datos
      const response = await fetch("/api/clientes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.error || "Error al guardar los datos");
        return;
      }

      toast.success("¡Formulario enviado exitosamente!");

      // Aquí puedes realizar acciones adicionales como redirigir, etc.
      // window.location.href = '/success';
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error al enviar el formulario");
    }
  };

  return (
    <div className="min-h-screen">
      {/* Paso 1 */}
      {step === 1 && (
        <>
          <AperturaStep
            progress={progress}
            formData={formData}
            paso_ini={1}
            paso_fin={6}
            title1="Apertura"
            title2="de cuenta"
            onChange={(e) => {
              const { name, type, checked, value } =
                e.target as HTMLInputElement;
              setFormData((prev) => ({
                ...prev,
                datosPersonales: {
                  ...prev.datosPersonales,
                  ...(name === "autoriza_verificacion"
                    ? { autoriza_verificacion: checked }
                    : { [name]: value }),
                },
              }));
            }}
          />
          <SiguienteButton onClick={nextStep} />
        </>
      )}

      {/* Paso 2 */}
      {step === 2 && (
        <>
          <ClienteStep
            progress={progress}
            formData={formData}
            paso_ini={2}
            paso_fin={6}
            title1="Datos"
            title2="del cliente"
            onChange={(e) => {
              const { name, value } = e.target as
                | HTMLInputElement
                | HTMLSelectElement;
              setFormData((prev) => ({
                ...prev,
                datosCliente: {
                  ...prev.datosCliente,
                  [name]: value,
                },
              }));
            }}
          />
          <SiguienteButton onClick={nextStep} />
        </>
      )}

      {/* Paso 3 */}
      {step === 3 && (
        <>
          <DomicilioStep
            progress={progress}
            formData={formData}
            paso_ini={3}
            paso_fin={6}
            title1="Datos"
            title2="del domicilio"
            onChange={(e) => {
              const { name, value } = e.target as HTMLInputElement;
              setFormData((prev) => ({
                ...prev,
                datosDomicilio: {
                  ...prev.datosDomicilio,
                  [name]: value,
                },
              }));
            }}
          />
          <SiguienteButton onClick={nextStep} />
        </>
      )}

      {/* Paso 4 */}
      {step === 4 && (
        <>
          <LaboralesStep
            progress={progress}
            formData={formData}
            paso_ini={4}
            paso_fin={6}
            title1="Datos"
            title2="laborales"
            onChange={(e) => {
              const { name, value } = e.target as HTMLInputElement;
              setFormData((prev) => ({
                ...prev,
                datosLaborales: {
                  ...prev.datosLaborales,
                  [name]: value,
                },
              }));
            }}
          />
          <SiguienteButton onClick={nextStep} />
        </>
      )}

      {/* Paso 5 */}
      {step === 5 && (
        <>
          <FinancieroStep
            progress={progress}
            formData={formData}
            paso_ini={5}
            paso_fin={6}
            title1="Datos"
            title2="financieros"
            onChange={(e) => {
              const { name, value } = e.target as HTMLInputElement;
              setFormData((prev) => ({
                ...prev,
                datosFinancieros: {
                  ...prev.datosFinancieros,
                  [name]: Number(value),
                },
              }));
            }}
          />
          <SiguienteButton onClick={nextStep} />
        </>
      )}
      {/* Paso 6 */}
      {step === 6 && (
        <>
          <LegalizacionStep
            progress={progress}
            formData={formData}
            paso_ini={6}
            paso_fin={6}
            title1="Legalización"
            title2=" de Documentos"
            onChange={(e) => {
              const { name, type, checked } = e.target as HTMLInputElement;
              setFormData((prev) => ({
                ...prev,
                legalizacion: {
                  ...prev.legalizacion,
                  [name]: type === "checkbox" ? checked : e.target.value,
                },
              }));
            }}
          />
          <FinalizarButton onClick={handleFinalize} />
        </>
      )}
    </div>
  );
}

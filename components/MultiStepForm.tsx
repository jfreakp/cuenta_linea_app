"use client";
import { useState } from "react";
import { AperturaStep } from "./steps/AperturaStep";
import { SiguienteButton } from "./buttons/ContinuarButton";
import { useStep } from "./hooks/useStep";
import { DomicilioStep } from "./steps/DomicilioStep";
import type { FormData } from "../types/FormData";

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
      provincia: "",
      canton: "",
      parroquia: "",
      barrio: "",
      telefono_laboral: "",
      calle_principal: "",
      calle_secundaria: "",
      referencia: "",
      numeracion: "",
      telefono: "",
      tipo_telefono: "",
    },
    datosFinancieros: {
      activos: 0,
      pasivos: 0,
      patrimonio: 0,
    },
  });

  const { nextStep, prevStep } = useStep(step, setStep, formData);

  const progress = (step / 6) * 100;

  return (
    <div>
      {/* Barra de progreso */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
        <div
          className="bg-primary h-2 rounded-full transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Paso 1 */}
      {step === 1 && (
        <>
          <AperturaStep
            progress={progress}
            formData={formData}
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
          <DomicilioStep
            progress={progress}
            formData={formData}
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

      {/* Paso 3 */}
      {step === 3 && (
        <>
          <h2 className="text-xl font-bold mb-4">Dirección</h2>
          <input
            type="text"
            placeholder="Dirección"
            className="w-full border p-3 rounded-xl mb-4"
            value={formData.datosDomicilio.direccion}
            onChange={(e) =>
              setFormData({
                ...formData,
                datosDomicilio: {
                  ...formData.datosDomicilio,
                  direccion: e.target.value,
                },
              })
            }
          />
          <div className="flex justify-between">
            <button
              onClick={prevStep}
              className="bg-gray-300 px-6 py-2 rounded-xl"
            >
              Atrás
            </button>
            <button
              onClick={() => alert("Formulario enviado")}
              className="bg-green-600 text-white px-6 py-2 rounded-xl"
            >
              Finalizar
            </button>
          </div>
        </>
      )}
    </div>
  );
}

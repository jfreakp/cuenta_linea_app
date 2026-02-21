"use client";
import { useState } from "react";
import { AperturaPage } from "./steps/Apertura";
import { SiguienteButton } from "./buttons/SiguienteButton";
import { useStep } from "./hooks/useStep";
import { MoverButton } from "./buttons/MoverButton";
import { DomicilioPage } from "./steps/Domicilio";

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

export default function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    datosPersonales: {
      cedula: "",
      codigo_dactilar: "",
      autoriza_verificacion: false,
    },
    datosDomicilio: {
      direccion: "",
      ciudad: "",
      estado: "",
      codigo_postal: "",
    },
  });

  const { nextStep, prevStep } = useStep(step, setStep, formData);

  const progress = (step / 3) * 100;

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
          <AperturaPage
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
          <DomicilioPage progress={progress} />
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

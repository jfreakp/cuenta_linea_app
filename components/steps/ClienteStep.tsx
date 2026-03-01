"use client";

import { HeaderStep } from "./header/HeaderStep";
import type { FormData } from "../../types/FormData";
import { Input } from "../inputs.tsx/Input";
import { useEffect, useState } from "react";
import { SelectApi } from "../selects/SelectApi";

interface Props {
  progress: number;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  formData: FormData;
  paso_ini: number;
  paso_fin: number;
  title1: string;
  title2: string;
}

export const ClienteStep = ({
  progress,
  onChange,
  formData,
  paso_ini,
  paso_fin,
  title1,
  title2,
}: Props) => {
  const [motivosApertura, setMotivosApertura] = useState<
    { value: string; label: string }[]
  >([]);

  const [selectedMotivoApertura, setSelectedMotivoApertura] = useState<"" | "">("");

  useEffect(() => {
    fetch("/api/catalogos/MOTIVO_APERTURA")
      .then((r) => r.json())
      .then((data) => {
        if (data.items) {
          const opciones = data.items.map(
            (item: { codigo: string; nombre: string }) => ({
              value: item.codigo,
              label: item.nombre,
            })
          );
          setMotivosApertura(opciones);
        }
      })
      .catch(() => setMotivosApertura([]));
  }, []);

  useEffect(() => {
    if (selectedMotivoApertura) {
      formData.datosCliente.motivo_apertura = selectedMotivoApertura;
    }
  }, [selectedMotivoApertura]);


 
  return (
    (formData.datosCliente.nombres = "Juan Pablo"),
    (formData.datosCliente.apellidos = "Torres Diaz"),
    (
      <main className="flex-grow flex flex-col items-center py-10 px-4">
        <HeaderStep
          title1={title1}
          title2={title2}
          paso_ini={paso_ini}
          paso_fin={paso_fin}
          progress={progress}
        />
        <div className="bg-surface-light w-full max-w-4xl rounded-lg shadow-sm border border-border-light p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <Input
              name="nombre_apellido"
              label="Nombre y apellido"
              type="text"
              placeholder="Ej. Juan Pablo Torres Diaz"
              onChange={onChange}
              value={
                formData.datosCliente.nombres +
                " " +
                formData.datosCliente.apellidos
              }
              disabled={true}
            />
            <Input
              name="correo"
              label="Correo electrónico"
              type="email"
              placeholder="Ej. jfer.23@hotmail.com"
              onChange={onChange}
              value={formData.datosCliente.correo}
              disabled={false}
            />
            <Input
              name="telefono"
              label="Teléfono celular"
              type="tel"
              placeholder="Ej. 0989585474"
              onChange={onChange}
              value={formData.datosCliente.telefono}
              disabled={false}
            />

            <SelectApi
                label="Motivo de apertura"
                name="motivo_apertura"
                id="motivo_apertura"
                formData={formData}
                onChange={onChange}
                options={motivosApertura}
                value={formData.datosCliente.motivo_apertura || ""}
              />

          </div>
        </div>
        <div className="w-full max-w-4xl mt-6 px-1">
          <p className="text-sm text-text-light mb-3">
            ¿Tienes obligaciones tributarias en otro país?
          </p>
          <div className="flex gap-6">
            <label className="inline-flex items-center cursor-pointer">
              <input
                className="form-checkbox h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary transition duration-150 ease-in-out"
                type="radio"
                onChange={onChange}
                name="obligaciones_tributarias"
                value="S"
              />
              <span className="ml-2 text-sm text-gray-700">
                Si
              </span>
            </label>
            <label className="inline-flex items-center cursor-pointer">
              <input
                className="form-checkbox h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary transition duration-150 ease-in-out"
                type="radio"
                onChange={onChange}
                name="obligaciones_tributarias"
                value="N"
                checked={true}
              />
              <span className="ml-2 text-sm text-gray-700">
                No
              </span>
            </label>
          </div>
        </div>
      </main>
    )
  );
};

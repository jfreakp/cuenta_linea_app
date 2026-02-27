"use client";

import { HeaderStep } from "./header/HeaderStep";
import type { FormData } from "../../types/FormData";
import { Input } from "../inputs.tsx/Input";
import { SelectGeneric } from "../selects/SelectGeneric";

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
        <div className="bg-surface-light dark:bg-surface-dark w-full max-w-4xl rounded-lg shadow-sm border border-border-light dark:border-border-dark p-6 md:p-8">
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

            <SelectGeneric
              label="Motivo de apertura"
              onChange={onChange}
              name="motivo_apertura"
              id="motivo_apertura"
              value={formData.datosCliente.motivo_apertura}
              options={[
                { value: "ahorros", label: "Ahorros" },
                { value: "nomina", label: "Nómina" },
                { value: "inversion", label: "Inversión" },
              ]}
            />
          </div>
        </div>
        <div className="w-full max-w-4xl mt-6 px-1">
          <p className="text-sm text-text-light dark:text-text-dark mb-3">
            ¿Tienes obligaciones tributarias en otro país?
          </p>
          <div className="flex gap-6">
            <label className="inline-flex items-center cursor-pointer">
              <input
                className="form-checkbox h-4 w-4 text-primary border-gray-300 dark:border-gray-600 dark:bg-surface-dark rounded focus:ring-primary transition duration-150 ease-in-out"
                type="radio"
                onChange={onChange}
                name="obligaciones_tributarias"
                value="S"
              />
              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                Si
              </span>
            </label>
            <label className="inline-flex items-center cursor-pointer">
              <input
                className="form-checkbox h-4 w-4 text-primary border-gray-300 dark:border-gray-600 dark:bg-surface-dark rounded focus:ring-primary transition duration-150 ease-in-out"
                type="radio"
                onChange={onChange}
                name="obligaciones_tributarias"
                value="N"
              />
              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                No
              </span>
            </label>
          </div>
        </div>
      </main>
    )
  );
};

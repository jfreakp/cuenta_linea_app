"use client";

import { HeaderStep } from "./header/HeaderStep";
import type { FormData } from "../../types/FormData";

interface Props {
  progress: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
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
          <div className="flex flex-col">
            <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-1">
              Nombre y apellido
            </label>
            <div className="w-full px-3 py-2 bg-gray-300 dark:bg-gray-600 border border-transparent rounded text-gray-600 dark:text-gray-300 text-sm">
              JUAN PABLO TORRES DIAZ
            </div>
          </div>
          <div className="flex flex-col">
            <label
              className="block text-sm font-medium text-text-light dark:text-text-dark mb-1"
              htmlFor="email"
            >
              Correo electrónico
            </label>
            <input
              className="w-full bg-input-light dark:bg-input-dark border-transparent focus:border-primary focus:ring-0 rounded-lg py-3 px-4 text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
              id="email"
              placeholder="Ej. jfer.23@hotmail.com"
              type="email"
              name="correo"
              value={formData.datosCliente.correo}
              onChange={onChange}
            />
          </div>
          <div className="flex flex-col">
            <label
              className="block text-sm font-medium text-text-light dark:text-text-dark mb-1"
              htmlFor="phone"
            >
              Teléfono celular
            </label>
            <input
              className="w-full px-3 py-2 bg-gray-50 dark:bg-surface-dark border border-gray-300 dark:border-gray-600 rounded focus:ring-1 focus:ring-primary focus:border-primary text-sm text-text-light dark:text-text-dark placeholder-gray-400 dark:placeholder-gray-500 form-input-custom transition-shadow"
              id="phone"
              placeholder="Ej. 0989585474"
              type="tel"
              name="telefono"
              value={formData.datosCliente.telefono}
              onChange={onChange}
            />
          </div>
          <div className="flex flex-col">
            <label
              className="block text-sm font-medium text-text-light dark:text-text-dark mb-1"
              htmlFor="motivo_apertura"
            >
              Motivo de apertura cuenta
            </label>
            <div className="relative">
              <select
                className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded focus:ring-1 focus:ring-primary focus:border-primary text-sm text-text-light dark:text-text-dark appearance-none form-input-custom transition-shadow"
                id="motivo_apertura"
                name="motivo_apertura"
                value={formData.datosCliente.motivo_apertura}
                onChange={onChange}
              >
                <option value="" disabled>
                  Seleccione una opción 
                </option>
                <option value="ahorros">Ahorros</option>
                <option value="nomina">Nómina</option>
                <option value="inversion">Inversión</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                <svg
                  className="fill-current h-4 w-4"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"></path>
                </svg>
              </div>
            </div>
          </div>
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
  );
};

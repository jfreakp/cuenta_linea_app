import { FormData } from "@/types/FormData";
import { HeaderStep } from "./header/HeaderStep";

interface Props {
  progress: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formData: FormData;
  paso_ini: number;
  paso_fin: number;
  title1: string;
  title2: string;
}

export const LaboralesStep = ({
  progress,
  onChange,
  formData,
  paso_ini,
  paso_fin,
  title1,
  title2,
}: Props) => {
  return (
    <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
      <HeaderStep
        progress={progress}
        title1={title1}
        title2={title2}
        paso_ini={paso_ini}
        paso_fin={paso_fin}
      />
      <div className="bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-gray-700 rounded shadow-card p-6 md:p-8">
        <form action="#" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                Relación laboral
              </label>
              <div className="relative">
                <select className="block w-full pl-3 pr-10 py-2.5 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded bg-input-bg-light dark:bg-input-bg-dark text-gray-800 dark:text-gray-200">
                  <option>INDEPENDIENTE</option>
                  <option>DEPENDIENTE</option>
                  <option>JUBILADO</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1 flex items-center">
                Ingreso mensual
                <span
                  className="material-icons text-primary text-sm ml-1 cursor-help"
                  title="Información adicional"
                >
                  help_outline
                </span>
              </label>
              <div className="relative rounded-md shadow-sm">
                <input
                  className="focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 dark:border-gray-600 rounded py-2.5 bg-input-bg-light dark:bg-input-bg-dark text-gray-800 dark:text-gray-200"
                  name="ingreso"
                  placeholder="$0.00"
                  type="text"
                  value="$2,486.00"
                />
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
              Actividad económica
            </label>
            <div className="relative">
              <select
                className="block w-full pl-3 pr-10 py-2.5 text-base border-gray-300 dark:border-gray-600 bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed sm:text-sm rounded"
                disabled={true}
              >
                <option selected={true}>Seleccione una actividad...</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M19 9l-7 7-7-7"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
          <div className="pt-2">
            <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-2">
              Dirección de trabajo:
            </h3>
            <div className="flex items-center mb-4">
              <label className="inline-flex items-center cursor-pointer">
                <input className="sr-only peer" type="checkbox" />
                <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary dark:peer-focus:ring-primary rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                <span className="ml-3 text-sm font-medium text-gray-600 dark:text-gray-400">
                  Es la misma dirección de domicilio
                </span>
              </label>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                Provincia
              </label>
              <select className="block w-full pl-3 pr-10 py-2.5 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded bg-input-bg-light dark:bg-input-bg-dark text-gray-800 dark:text-gray-200">
                <option>LOJA</option>
                <option>PICHINCHA</option>
                <option>GUAYAS</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                Cantón
              </label>
              <select className="block w-full pl-3 pr-10 py-2.5 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded bg-input-bg-light dark:bg-input-bg-dark text-gray-800 dark:text-gray-200">
                <option>LOJA</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                Parroquia
              </label>
              <select className="block w-full pl-3 pr-10 py-2.5 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded bg-input-bg-light dark:bg-input-bg-dark text-gray-800 dark:text-gray-200">
                <option>SAN SEBASTIAN</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                Barrio
              </label>
              <select className="block w-full pl-3 pr-10 py-2.5 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded bg-input-bg-light dark:bg-input-bg-dark text-gray-800 dark:text-gray-200">
                <option>ZAMORA HUAYCO</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                Calle principal
              </label>
              <input
                className="focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 dark:border-gray-600 rounded py-2.5 bg-white dark:bg-surface-dark text-gray-800 dark:text-gray-200 border"
                placeholder=""
                type="text"
                value="RIO BOBONAZA"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                Calle secundaria
              </label>
              <input
                className="focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 dark:border-gray-600 rounded py-2.5 bg-white dark:bg-surface-dark text-gray-800 dark:text-gray-200 border"
                placeholder=""
                type="text"
                value="RIO PILCOMAYA"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                Referencia
              </label>
              <input
                className="focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 dark:border-gray-600 rounded py-2.5 bg-white dark:bg-surface-dark text-gray-800 dark:text-gray-200 border"
                placeholder=""
                type="text"
                value="EDIFICIO NOVO"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                Numeración
              </label>
              <input
                className="focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 dark:border-gray-600 rounded py-2.5 bg-white dark:bg-surface-dark text-gray-800 dark:text-gray-200 border"
                placeholder=""
                type="text"
                value="SN"
              />
            </div>
          </div>
          <div className="mt-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center mb-2">
              <label className="block text-sm text-gray-600 dark:text-gray-400 mr-4 mt-1">
                Teléfono
              </label>
              <div className="flex gap-4">
                <label className="inline-flex items-center">
                  <input
                    className="rounded border-gray-300 text-primary shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                    name="tipo_telefono"
                    type="checkbox"
                    value="convencional"
                  />
                  <span className="ml-2 text-xs text-gray-600 dark:text-gray-400">
                    Convencional
                  </span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    checked={true}
                    className="rounded border-gray-300 text-primary shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                    name="tipo_telefono"
                    type="checkbox"
                    value="celular"
                  />
                  <span className="ml-2 text-xs text-gray-600 dark:text-gray-400">
                    Celular
                  </span>
                </label>
              </div>
            </div>
            <div className="relative">
              <input
                className="focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 dark:border-gray-600 rounded py-2.5 bg-white dark:bg-surface-dark text-gray-800 dark:text-gray-200 border"
                placeholder="Ej. 0989585878"
                type="text"
              />
              <div className="absolute right-0 -bottom-5 text-[10px] text-gray-500">
                0/0
              </div>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

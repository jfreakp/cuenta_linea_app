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

export const FinancieroStep = ({ progress, onChange, formData, paso_ini, paso_fin, title1, title2 }: Props) => {
  return (
    <main className="flex-grow flex flex-col items-center pt-10 pb-20 px-4 w-full max-w-5xl mx-auto">
      <HeaderStep title1={title1} title2={title2} paso_ini={paso_ini} paso_fin={paso_fin} progress={progress} />
      <div className="w-full max-w-4xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-md shadow-sm p-6 md:p-8">
        <form
          action="#"
          className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6"
          method="POST"
        >
          <div className="flex flex-col">
            <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1 flex items-center gap-1">
              Activos
              <span
                className="material-icons text-primary text-base cursor-help"
                title="Información sobre activos"
              >
                help_outline
              </span>
            </label>
            <div className="relative">
              <input
                className="w-full border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 text-gray-600 dark:text-gray-300"
                type="number"
                name="activos"
                value={formData.datosFinancieros.activos}
                onChange={onChange}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1 flex items-center gap-1">
              Pasivos
              <span
                className="material-icons text-primary text-base cursor-help"
                title="Información sobre pasivos"
              >
                help_outline
              </span>
            </label>
            <div className="relative">
              <input
                className="w-full border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 text-gray-600 dark:text-gray-300"
                type="number"
                name="pasivos"
                value={formData.datosFinancieros.pasivos}
                onChange={onChange}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1 flex items-center gap-1">
              Patrimonio
              <span
                className="material-icons text-primary text-base cursor-help"
                title="Información sobre patrimonio"
              >
                help_outline
              </span>
            </label>
            <div className="relative">
              <input
                className="w-full border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 text-gray-600 dark:text-gray-300"
                type="number"
                name="patrimonio"
                value={formData.datosFinancieros.patrimonio}
                onChange={onChange}
              />
            </div>
          </div>
          <div className="hidden md:block"></div>
        </form>
      </div>
    </main>
  );
};

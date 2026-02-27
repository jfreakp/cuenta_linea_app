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

export const LegalizacionStep = ({ progress, onChange, formData, paso_ini, paso_fin, title1, title2 }: Props) => {
  return (
    <main className="flex-grow flex flex-col items-center pt-8 pb-12 px-4 sm:px-6">
      <div className="w-full max-w-4xl space-y-8">
        <HeaderStep
          title1={title1}
          title2={title2}
          paso_ini={paso_ini}
          paso_fin={paso_fin}
          progress={progress}
        />
        <div className="w-full max-w-3xl mx-auto mt-10 space-y-6">
          <h2 className="text-xl text-gray-600 dark:text-gray-300 font-medium">
            Acepta los términos y condiciones
          </h2>
          <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-md flex items-start gap-4 shadow-sm border border-gray-100 dark:border-gray-600">
            <div className="flex h-6 items-center">
              <input
                className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary custom-checkbox cursor-pointer bg-white dark:bg-gray-600 dark:border-gray-500"
                id="acepta_terminos"
                name="acepta_terminos"
                type="checkbox"
                checked={formData.legalizacion.acepta_terminos}
                onChange={onChange}
              />
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              <label
                className="cursor-pointer select-none"
                htmlFor="acepta_terminos"
              >
                He revisado y acepto el{" "}
                <a className="text-primary hover:underline" href="#">
                  Contrato de Apertura y uso de la Cuenta de ahorros Banca
                  electrónica.
                </a>{" "}
                <a className="text-primary hover:underline" href="#">
                  Aviso de privacidad.
                </a>
              </label>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

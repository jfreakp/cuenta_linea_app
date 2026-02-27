import { FormData } from "@/types/FormData";
import { HeaderStep } from "./header/HeaderStep";
import { Input } from "../inputs.tsx/Input";

interface Props {
  progress: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formData: FormData;
  paso_ini: number;
  paso_fin: number;
  title1: string;
  title2: string;
}

export const FinancieroStep = ({
  progress,
  onChange,
  formData,
  paso_ini,
  paso_fin,
  title1,
  title2,
}: Props) => {
  return (
    <main className="flex-grow flex flex-col items-center pt-10 pb-20 px-4 w-full max-w-5xl mx-auto">
      <HeaderStep
        title1={title1}
        title2={title2}
        paso_ini={paso_ini}
        paso_fin={paso_fin}
        progress={progress}
      />
      <div className="w-full max-w-4xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-md shadow-sm p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          <Input
            label="Activos"
            name="activos"
            type="number"
            placeholder="Ej. 5000"
            onChange={onChange}
            value={formData.datosFinancieros.activos}
            outline
            outline_title="Los activos representan los bienes y derechos que posee una persona o empresa, como dinero en efectivo, propiedades, inversiones, etc."
          />

          <Input
            label="Pasivos"
            name="pasivos"
            type="number"
            placeholder="Ej. 2000"
            onChange={onChange}
            value={formData.datosFinancieros.pasivos}
            outline
            outline_title="Los pasivos representan las deudas y obligaciones financieras que tiene una persona o empresa, como préstamos, tarjetas de crédito, hipotecas, etc."
          />
           
          <Input
            label="Patrimonio"
            name="patrimonio"
            type="number"
            placeholder="Ej. 3000"
            onChange={onChange}
            value={formData.datosFinancieros.patrimonio}
            outline
            outline_title="El patrimonio representa la diferencia entre los activos y los pasivos de una persona o empresa, es decir, el valor neto que posee después de restar las deudas de los bienes y derechos."
          />
        </div>
      </div>
    </main>
  );
};

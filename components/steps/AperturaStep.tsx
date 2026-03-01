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

export const AperturaStep = ({
  progress,
  onChange,
  formData,
  paso_ini,
  paso_fin,
  title1,
  title2,
}: Props) => {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <HeaderStep
        title1={title1}
        title2={title2}
        paso_ini={paso_ini}
        paso_fin={paso_fin}
        progress={progress}
      />
      <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-8 transition-colors duration-200 border border-slate-100">
        <p className="text-slate-500 mb-10 text-center max-w-lg mx-auto leading-relaxed">
          De forma fácil, rápida y segura. Adicional recibe tu tarjeta de débito
          gratis en la comodidad de tu hogar o trabajo.
        </p>
        <div className="space-y-8">
          <div>
            <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center">
              <span className="w-1.5 h-6 bg-primary mr-3 rounded-full"></span>
              Datos de identificación:
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Input
                name="cedula"
                label="Cédula"
                type="text"
                placeholder="Ej. 1104865987"
                onChange={onChange}
                value={formData.datosPersonales.cedula}
                disabled={false}
                outline
                outline_title="Número de identificación ciudadana"
              />
              <Input
                name="codigo_dactilar"
                label="Código dactilar"
                type="text"
                placeholder="Ej. V343VVV342"
                onChange={onChange}
                value={formData.datosPersonales.codigo_dactilar}
                disabled={false}
                outline
                outline_title="Ubicado al reverso de tu cédula"
              />
            </div>
          </div>
          <div className="bg-green-50 border border-green-100 rounded-xl p-4 flex items-start space-x-3">
            <span className="material-icons-outlined text-primary mt-0.5">
              info
            </span>
            <p className="text-sm text-green-800 leading-snug">
              Disponible para ciudadanos ecuatorianos residentes en el país,
              excepto Región Insular (Galápagos).
            </p>
          </div>
          <label className="flex items-start space-x-3 bg-slate-50 p-4 rounded-xl border border-slate-100 cursor-pointer">
            <input
              className="focus:ring-primary h-5 w-5 text-primary border-slate-300 rounded cursor-pointer mt-1"
              id="autoriza_verificacion"
              name="autoriza_verificacion"
              type="checkbox"
              checked={formData.datosPersonales.autoriza_verificacion}
              onChange={onChange}
            />
            <span className="text-sm text-slate-600 leading-tight">
              Autorizo a Banco de xxx a verificar mis datos de fuentes legales
              de información.
            </span>
          </label>
        </div>
      </div>
    </main>
  );
};

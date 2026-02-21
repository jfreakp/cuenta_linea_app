interface Props {
    progress: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formData: {
    datosPersonales: {
      cedula: string;
      codigo_dactilar: string;
      autoriza_verificacion: boolean;
    };
  };
}

export const AperturaPage = ({ progress, onChange, formData }: Props) => {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-light text-slate-700 dark:text-slate-200 mb-6">
          Apertura <span className="text-primary font-bold">de cuenta</span>
        </h1>
        <div className="max-w-md mx-auto">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-semibold text-primary uppercase tracking-wider">
              Paso 1 de 5
            </span>
          </div>
          <div className="progress-bar-container w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8 md:p-12 mb-8 transition-colors duration-200 border border-slate-100 dark:border-slate-800">
        <p className="text-slate-500 dark:text-slate-400 mb-10 text-center max-w-lg mx-auto leading-relaxed">
          De forma fácil, rápida y segura. Adicional recibe tu tarjeta de débito
          gratis en la comodidad de tu hogar o trabajo.
        </p>
        <div className="space-y-8">
          <div>
            <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-6 flex items-center">
              <span className="w-1.5 h-6 bg-primary mr-3 rounded-full"></span>
              Datos de identificación:
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="flex items-center text-sm font-semibold text-slate-600 dark:text-slate-300">
                  Cédula
                  <span
                    className="material-icons-outlined text-primary text-base ml-1 cursor-help"
                    title="Número de identificación ciudadana"
                  >
                    help_outline
                  </span>
                </label>
                <input
                  className="w-full bg-slate-50 dark:bg-slate-800 border-transparent dark:border-slate-700 focus:ring-2 focus:ring-primary focus:border-transparent rounded-lg py-3 px-4 text-slate-700 dark:text-slate-200 placeholder-slate-300 dark:placeholder-slate-500 transition-all"
                  placeholder="Ej. 1104865987"
                  type="text"
                  name="cedula"
                  onChange={onChange}
                  value={formData.datosPersonales.cedula}
                />
              </div>
              <div className="space-y-2">
                <label className="flex items-center text-sm font-semibold text-slate-600 dark:text-slate-300">
                  Código dactilar
                  <span
                    className="material-icons-outlined text-primary text-base ml-1 cursor-help"
                    title="Ubicado al reverso de tu cédula"
                  >
                    help_outline
                  </span>
                </label>
                <input
                  className="w-full bg-slate-50 dark:bg-slate-800 border-transparent dark:border-slate-700 focus:ring-2 focus:ring-primary focus:border-transparent rounded-lg py-3 px-4 text-slate-700 dark:text-slate-200 placeholder-slate-300 dark:placeholder-slate-500 transition-all"
                  placeholder="Ej. V343VVV342"
                  type="text"
                  name="codigo_dactilar"
                  onChange={onChange}
                  value={formData.datosPersonales.codigo_dactilar}
                />
              </div>
            </div>
          </div>
          <div className="bg-green-50 dark:bg-green-950/20 border border-green-100 dark:border-green-900/30 rounded-xl p-4 flex items-start space-x-3">
            <span className="material-icons-outlined text-primary mt-0.5">
              info
            </span>
            <p className="text-sm text-green-800 dark:text-green-200/80 leading-snug">
              Disponible para ciudadanos ecuatorianos residentes en el país,
              excepto Región Insular (Galápagos).
            </p>
          </div>
          <label className="flex items-start space-x-3 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800 cursor-pointer">
            <input
              className="focus:ring-primary h-5 w-5 text-primary border-slate-300 dark:border-slate-600 rounded cursor-pointer mt-1"
              id="autoriza_verificacion"
              name="autoriza_verificacion"
              type="checkbox"
              checked={formData.datosPersonales.autoriza_verificacion}
              onChange={onChange}
            />
            <span className="text-sm text-slate-600 dark:text-slate-400 leading-tight">
              Autorizo a Banco de Loja a verificar mis datos de fuentes legales
              de información.
            </span>
          </label>
        </div>
      </div>
    </main>
  );
};

"use client";
import { useEffect, useState } from "react";

interface Props {
  progress: number;
}

export const DomicilioPage = ({ progress }: Props) => {
  const [phoneType, setPhoneType] = useState<"convencional" | "celular" >("celular");
  const [provincias, setProvincias] = useState<{ id: number; nombre: string }[]>([]);
  const [cantones, setCantones] = useState<{ id: number; nombre: string }[]>([]);
  const [parroquias, setParroquias] = useState<{ id: number; nombre: string }[]>([]);

  const [selectedProvincia, setSelectedProvincia] = useState<number | "">("");
  const [selectedCanton, setSelectedCanton] = useState<number | "">("");
  const [selectedParroquia, setSelectedParroquia] = useState<number | "">("");

  useEffect(() => {
    fetch("/api/provincias")
      .then((r) => r.json())
      .then((data) => setProvincias(data || []))
      .catch(() => setProvincias([]));
  }, []);

  useEffect(() => {
    if (!selectedProvincia) {
      setCantones([]);
      setSelectedCanton("");
      setParroquias([]);
      setSelectedParroquia("");
      return;
    }
    fetch(`/api/cantones?provinciaId=${selectedProvincia}`)
      .then((r) => r.json())
      .then((data) => setCantones(data || []))
      .catch(() => setCantones([]));
    setSelectedCanton("");
    setParroquias([]);
    setSelectedParroquia("");
  }, [selectedProvincia]);

  useEffect(() => {
    if (!selectedCanton) {
      setParroquias([]);
      setSelectedParroquia("");
      return;
    }
    fetch(`/api/parroquias?cantonId=${selectedCanton}`)
      .then((r) => r.json())
      .then((data) => setParroquias(data || []))
      .catch(() => setParroquias([]));
    setSelectedParroquia("");
  }, [selectedCanton]);

  return (
    <>
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-normal text-gray-700 dark:text-gray-200">
            Datos <span className="text-primary font-semibold">del domicilio</span>
          </h1>
          <div className="mt-8 max-w-2xl mx-auto text-left">
            <div className="flex justify-between items-end mb-2">
              <span className="text-primary font-medium text-sm uppercase tracking-wider">
                Paso 2 de 5
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-zinc-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-primary h-full progress-bar"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>
        <div className="bg-card-light dark:bg-card-dark rounded-xl shadow-sm border border-gray-100 dark:border-zinc-800 p-8 md:p-12">
          <form action="#" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">
                  Provincia
                </label>
                <div className="relative">
                  <select
                    value={selectedProvincia}
                    onChange={(e) => setSelectedProvincia(e.target.value ? parseInt(e.target.value, 10) : "")}
                    className="w-full bg-input-light dark:bg-input-dark border-transparent focus:border-primary focus:ring-0 rounded-lg py-3 px-4 text-gray-700 dark:text-gray-200 appearance-none"
                  >
                    <option value="">Selecciona una opción</option>
                    {provincias.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.nombre}
                      </option>
                    ))}
                  </select>
                  <span className="material-icons-outlined absolute right-3 top-3 text-primary pointer-events-none">
                    expand_more
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">
                  Cantón
                </label>
                <div className="relative">
                  <select
                    value={selectedCanton}
                    onChange={(e) => setSelectedCanton(e.target.value ? parseInt(e.target.value, 10) : "")}
                    className="w-full bg-input-light dark:bg-input-dark border-transparent focus:border-primary focus:ring-0 rounded-lg py-3 px-4 text-gray-700 dark:text-gray-200 appearance-none"
                  >
                    <option value="">Selecciona una opción</option>
                    {cantones.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.nombre}
                      </option>
                    ))}
                  </select>
                  <span className="material-icons-outlined absolute right-3 top-3 text-primary pointer-events-none">
                    expand_more
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">
                  Parroquia
                </label>
                <div className="relative">
                  <select
                    value={selectedParroquia}
                    onChange={(e) => setSelectedParroquia(e.target.value ? parseInt(e.target.value, 10) : "")}
                    className="w-full bg-input-light dark:bg-input-dark border-transparent focus:border-primary focus:ring-0 rounded-lg py-3 px-4 text-gray-700 dark:text-gray-200 appearance-none"
                  >
                    <option value="">Selecciona una opción</option>
                    {parroquias.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.nombre}
                      </option>
                    ))}
                  </select>
                  <span className="material-icons-outlined absolute right-3 top-3 text-primary pointer-events-none">
                    expand_more
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">
                  Barrio
                </label>
                <div className="relative">
                  <select className="w-full bg-input-light dark:bg-input-dark border-transparent focus:border-primary focus:ring-0 rounded-lg py-3 px-4 text-gray-700 dark:text-gray-200 appearance-none">
                    <option>Selecciona una opción</option>
                  </select>
                  <span className="material-icons-outlined absolute right-3 top-3 text-primary pointer-events-none">
                    expand_more
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">
                  Dirección
                </label>
                <input
                  className="w-full bg-input-light dark:bg-input-dark border-transparent focus:border-primary focus:ring-0 rounded-lg py-3 px-4 text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
                  placeholder="Ej. Calle 18 de noviembre y Gonzanamá"
                  type="text"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">
                  Referencia
                </label>
                <input
                  className="w-full bg-input-light dark:bg-input-dark border-transparent focus:border-primary focus:ring-0 rounded-lg py-3 px-4 text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
                  placeholder="Ej. Junto al colegio"
                  type="text"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">
                  Num. Casa
                </label>
                <input
                  className="w-full bg-input-light dark:bg-input-dark border-transparent focus:border-primary focus:ring-0 rounded-lg py-3 px-4 text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
                  placeholder="Ej. 242A32"
                  type="text"
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 px-2">
                    Teléfono
                  </label>
                  <div className="flex space-x-4 items-center">
                    <label className="flex items-center space-x-2 text-xs text-gray-500 cursor-pointer">
                      <input
                        checked={phoneType === "convencional"}
                        onChange={() => setPhoneType("convencional")}
                        className="text-primary focus:ring-primary h-4 w-4 border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                        name="phoneType"
                        type="radio"
                        value="convencional"
                      />
                      <span>Convencional</span>
                    </label>
                    <label className="flex items-center space-x-2 text-xs text-gray-500 cursor-pointer">
                      <input
                        checked={phoneType === "celular"}
                        onChange={() => setPhoneType("celular")}
                        className="text-primary focus:ring-primary h-4 w-4 border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                        name="phoneType"
                        type="radio"
                        value="celular"
                      />
                      <span>Celular</span>
                    </label>
                  </div>
                </div>
                <input
                  className="w-full bg-input-light dark:bg-input-dark border-transparent focus:border-primary focus:ring-0 rounded-lg py-3 px-4 text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
                  placeholder="Ej. 098965878"
                  type="tel"
                />
              </div>
            </div>
          </form>
        </div>
        <p className="text-center mt-12 text-sm text-gray-500 dark:text-zinc-500">
          ¿Necesitas ayuda? Llámanos al{" "}
          <span className="font-semibold text-primary">1800 565 233</span>
        </p>
      </main>
    </>
  );
};

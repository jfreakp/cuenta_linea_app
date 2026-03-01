"use client";
import { use, useEffect, useState } from "react";
import type { FormData } from "../../types/FormData";
import { on } from "events";
import { HeaderStep } from "./header/HeaderStep";
import { SelectApi } from "../selects/SelectApi";
import { Input } from "../inputs.tsx/Input";

interface Props {
  formData: FormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  progress: number;
  paso_ini: number;
  paso_fin: number;
  title1: string;
  title2: string;
}

export const DomicilioStep = ({
  formData,
  onChange,
  progress,
  paso_ini,
  paso_fin,
  title1,
  title2,
}: Props) => {
  const [phoneType, setPhoneType] = useState<"C" | "M">("M");
  const [provincias, setProvincias] = useState<
    { id: number; nombre: string; codigo: string }[]
  >([]);
  const [cantones, setCantones] = useState<
    { id: number; nombre: string; codigo: string }[]
  >([]);
  const [parroquias, setParroquias] = useState<
    { id: number; nombre: string; codigo: string }[]
  >([]);

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
      formData.datosDomicilio.provincia = "";
      formData.datosDomicilio.canton = "";
      formData.datosDomicilio.parroquia = "";
      return;
    }
    fetch(`/api/cantones?provinciaId=${selectedProvincia}`)
      .then((r) => r.json())
      .then((data) => setCantones(data || []))
      .catch(() => setCantones([]));
    setSelectedCanton("");
    setParroquias([]);
    setSelectedParroquia("");
    formData.datosDomicilio.provincia =
      provincias.find((p) => p.id === selectedProvincia)?.codigo || "";
    formData.datosDomicilio.canton = "";
    formData.datosDomicilio.parroquia = "";
  }, [selectedProvincia]);

  useEffect(() => {
    if (!selectedCanton) {
      setParroquias([]);
      setSelectedParroquia("");
      formData.datosDomicilio.canton = "";
      formData.datosDomicilio.parroquia = "";
      return;
    }
    fetch(`/api/parroquias?cantonId=${selectedCanton}`)
      .then((r) => r.json())
      .then((data) => setParroquias(data || []))
      .catch(() => setParroquias([]));
    setSelectedParroquia("");
    formData.datosDomicilio.canton =
      cantones.find((c) => c.id === selectedCanton)?.codigo || "";
    formData.datosDomicilio.parroquia = "";
  }, [selectedCanton]);

  useEffect(() => {
    formData.datosDomicilio.parroquia =
      parroquias.find((p) => p.id === selectedParroquia)?.codigo || "";
  }, [selectedParroquia]);

  useEffect(() => {
    formData.datosDomicilio.tipo_telefono = phoneType;
  }, [phoneType]);

  return (
    <>
      <main className="max-w-4xl mx-auto px-6 py-12">
        <HeaderStep
          title1={title1}
          title2={title2}
          paso_ini={paso_ini}
          paso_fin={paso_fin}
          progress={progress}
        />
        <div className="bg-card-light dark:bg-slate-900 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-800 p-8 md:p-12">
          <form action="#" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <SelectApi
                label={"Provincia"}
                name={"provincia"}
                id={"provincia"}
                formData={formData}
                onChange={(e) =>
                  setSelectedProvincia(
                    e.target.value ? parseInt(e.target.value, 10) : "",
                  )
                }
                options={provincias.map((p) => ({
                  value: String(p.id),
                  label: p.nombre,
                }))}
                value={String(selectedProvincia)}
              />

              <SelectApi
                label={"Cantón"}
                name={"canton"}
                id={"canton"}
                formData={formData}
                onChange={(e) =>
                  setSelectedCanton(
                    e.target.value ? parseInt(e.target.value, 10) : "",
                  )
                }
                options={cantones.map((c) => ({
                  value: String(c.id),
                  label: c.nombre,
                }))}
                value={String(selectedCanton)}
              />

              <SelectApi
                label={"Parroquia"}
                name={"parroquia"}
                id={"parroquia"}
                formData={formData}
                onChange={(e) =>
                  setSelectedParroquia(
                    e.target.value ? parseInt(e.target.value, 10) : "",
                  )
                }
                options={parroquias.map((p) => ({
                  value: String(p.id),
                  label: p.nombre,
                }))}
                value={String(selectedParroquia)}
              />

              <Input
                name="barrio"
                label="Barrio"
                type="text"
                placeholder="Ej. El Valle"
                onChange={onChange}
                value={formData.datosDomicilio.barrio}
              />
              <Input
                name="direccion"
                label="Dirección"
                type="text"
                placeholder="Ej. Calle 18 de noviembre y Gonzanamá"
                onChange={onChange}
                value={formData.datosDomicilio.direccion}
              />
              <Input
                name="referencia"
                label="Referencia"
                type="text"
                placeholder="Ej. Junto al colegio"
                onChange={onChange}
                value={formData.datosDomicilio.referencia}
              />
              <Input
                name="numero_casa"
                label="Num. Casa"
                type="text"
                placeholder="Ej. 242A32"
                onChange={onChange}
                value={formData.datosDomicilio.numero_casa}
              />
              
              
              <div className="space-y-2">
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 px-2">
                    Teléfono
                  </label>
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex space-x-4 items-center">
                      <label className="flex items-center gap-2 text-xs text-dark:text-gray-400 cursor-pointer">
                        <input
                          type="radio"
                          name="tipo_telefono"
                          value="C"
                          checked={phoneType === "C"}
                          onChange={() => setPhoneType("C")}
                          className="h-4 w-4 accent-primary border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 focus:ring-primary"
                        />
                        <span>Convencional</span>
                      </label>

                      <label className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 cursor-pointer">
                        <input
                          type="radio"
                          name="tipo_telefono"
                          value="M"
                          checked={phoneType === "M"}
                          onChange={() => setPhoneType("M")}
                          className="h-4 w-4 accent-primary border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 focus:ring-primary"
                        />
                        <span>Móvil</span>
                      </label>
                    </div>
                  </div>
                </div>
                <input
                  className="w-full bg-input-light dark:bg-slate-800 border-transparent focus:border-primary focus:ring-0 rounded-lg py-3 px-4 text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
                  placeholder="Ej. 098965878"
                  type="tel"
                  name="numero_telefono"
                  value={formData.datosDomicilio.numero_telefono}
                  onChange={onChange}
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

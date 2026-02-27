import { HeaderStep } from "./header/HeaderStep";
import { SelectGeneric } from "../selects/SelectGeneric";
import { Input } from "../inputs.tsx/Input";
import { Toggle } from "../inputs.tsx/Toggle";
import { FormData } from "@/types/FormData";
import { useEffect, useState } from "react";
import { SelectApi } from "../selects/SelectApi";

interface Props {
  progress: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => void;
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
    <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
      <HeaderStep
        progress={progress}
        title1={title1}
        title2={title2}
        paso_ini={paso_ini}
        paso_fin={paso_fin}
      />
      <div className="bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-gray-700 rounded shadow-card p-6 md:p-8">
        <div className="grid md:grid-cols-2 gap-8">
          <SelectGeneric
            label="Relación laboral"
            onChange={onChange}
            name="relacion_laboral"
            id="relacion_laboral"
            value={formData.datosLaborales.relacion_laboral}
            options={[
              { value: "I", label: "Independiente" },
              { value: "D", label: "Dependiente" },
              { value: "J", label: "Jubilado" },
            ]}
          />
          <Input
            name="ingresos_mensuales"
            label="Ingresos mensuales"
            type="number"
            placeholder="Ej. 1500"
            onChange={onChange}
            value={formData.datosLaborales.ingresos_mensuales}
            disabled={false}
          />
          <SelectGeneric
            label="Actividad económica"
            value={formData.datosLaborales.actividad_economica}
            onChange={onChange}
            name="actividad_economica"
            id="actividad_economica"
            options={[
              { value: "I", label: "Independiente" },
              { value: "D", label: "Dependiente" },
              { value: "J", label: "Jubilado" },
            ]}
          />
          <div className="pt-2"></div>

          <div className="pt-2">
            <h2 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-2">
              Dirección de trabajo:
            </h2>
            <div />
            <Toggle />
          </div>
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
        </div>
      </div>
    </main>
  );
};

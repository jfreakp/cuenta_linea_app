import React from "react";

interface SelectApiProps {
  label: string;
  name: string;
  id: string;
  formData: any;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options?: { value: string; label: string }[];
  value?: string | number;
}

export const SelectApi = ({
  formData,
  onChange,
  options,
  label,
  name,
  id,
  value,
}: SelectApiProps) => {
  return (
    <div className="flex flex-col">
      <label
        className="flex items-center text-sm font-semibold text-slate-600 mb-1"
        htmlFor={name}
      >
        {label}
      </label>
      <div className="relative">
        <select
          className="min-w-[360px] w-full bg-input-light border border-gray-300 focus:border-primary focus:ring-0 rounded-lg my-1 py-3 px-4 text-gray-700 appearance-none"
          id={id}
          name={name}
          value={value ?? ""}
          onChange={onChange}
        >
          <option
            className="border-b border-gray-300 "
            value=""
            disabled
          >
            Seleccione una opción
          </option>
          {options?.map((option) => (
            <option
              key={option.value}
              className="border-b border-gray-300"
              value={option.value}
            >
              {option.label}
            </option>
          ))}
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
  );
};

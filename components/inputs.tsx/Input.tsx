"use client";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useState } from "react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

interface InputProps {
  label: string;
  name: string;
  type: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string | number;
  disabled?: boolean;
  outline?: boolean;
  outline_title?: string;
  modal?: boolean;
  img_url?: string;
}

export const Input = ({
  label,
  name,
  placeholder,
  onChange,
  value,
  disabled = false,
  type,
  outline,
  outline_title,
  modal = false,
  img_url = "",
}: InputProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="space-y-2">
        <label className="flex items-center text-sm font-semibold text-slate-600">
          {label}
          {outline ? (
            !modal ? (
              <span
                className="material-icons-outlined text-primary text-base ml-1 cursor-help"
                title={outline_title}
              >
                help_outline
              </span>
            ) : (
              <div>
                <button
                  onClick={() => setOpen(true)}
                  type="button"
                >
                  <span
                    className="material-icons-outlined text-primary text-base ml-1 cursor-help"
                    title={outline_title}
                  >
                    help_outline
                  </span>
                </button>
                <Dialog open={open} onClose={setOpen} className="relative z-10">
                  <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-slate-900/40 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
                  />

                  <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                      <DialogPanel
                        transition
                        className="relative transform overflow-hidden rounded-xl bg-white text-left shadow-sm border border-border-light transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                      >
                        <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                          <div className="sm:flex sm:items-start">
                            
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                              
                              <div className="mt-2">
                                <Image
                                  src={img_url}
                                  alt="Ejemplo de cédula"
                                  width={400}
                                  height={250}
                                  className="rounded-lg border border-slate-200"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="bg-slate-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                          <button
                            type="button"
                            onClick={() => setOpen(false)}
                            className="inline-flex w-full justify-center rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-white hover:brightness-105 sm:ml-3 sm:w-auto"
                          >
                            Entendido
                          </button>
                          <button
                            type="button"
                            data-autofocus
                            onClick={() => setOpen(false)}
                            className="mt-3 inline-flex w-full justify-center rounded-lg border border-border-light bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 sm:mt-0 sm:w-auto"
                          >
                            Cerrar
                          </button>
                        </div>
                      </DialogPanel>
                    </div>
                  </div>
                </Dialog>
              </div>
            )
          ) : null}
        </label>
        <input
          className={`w-full ${disabled ? "bg-gray-300 " : "bg-slate-50"} border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent rounded-lg py-3 px-4 text-slate-700 placeholder-slate-300 transition-all}`}
          placeholder={placeholder}
          type={type}
          name={name}
          onChange={onChange}
          value={value}
          disabled={disabled}
        />
      </div>
    </>
  );
};

"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import Link from "next/link";

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(1, "Contraseña requerida"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.message || "Error al iniciar sesión");
        setIsLoading(false);
        return;
      }

      toast.success("¡Sesión iniciada exitosamente!");

      // Usar router refresh y push para Next.js
      router.refresh();
      await new Promise((resolve) => setTimeout(resolve, 500));
      router.push("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Error al conectar con el servidor");
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-background-light min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-xl rounded-xl p-8 md:p-12 border border-gray-100">
          <div className="flex flex-col items-center mb-10">
            <div className="flex items-center space-x-2">
              <div className="bg-primary p-2 rounded-lg">
                <span className="material-symbols-outlined text-white text-3xl">
                  account_balance
                </span>
              </div>
              <h1 className="text-3xl font-semibold tracking-tight text-gray-700">
                Banca<span className="text-primary font-bold">Virtual</span>
              </h1>
            </div>
            <p className="text-sm text-gray-400 mt-2">
              Accede a tus cuentas de forma segura
            </p>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                className="block text-sm font-medium text-gray-600 mb-2"
                htmlFor="email"
              >
                E-mail
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl">
                  person
                </span>
                <input
                  className="w-full pl-10 pr-4 py-3 bg-input-grey border-transparent rounded-lg text-gray-800 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200"
                  id="email"
                  placeholder="Ej. juanperez@example.com"
                  type="email"
                  {...register("email")}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <label
                  className="block text-sm font-medium text-gray-600"
                  htmlFor="password"
                >
                  Contraseña
                </label>
              </div>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl">
                  lock
                </span>
                <input
                  className="w-full pl-10 pr-10 py-3 bg-input-grey border-transparent rounded-lg text-gray-800 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200"
                  id="password"
                  placeholder="••••••••"
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                />
                <button
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  <span className="material-symbols-outlined text-xl">
                    {showPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>
            <div className="flex items-center justify-between py-1">
              <div className="flex items-center">
                <input
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded cursor-pointer"
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                />
                <label
                  className="ml-2 block text-sm text-gray-600 cursor-pointer"
                  htmlFor="remember-me"
                >
                  Recordarme
                </label>
              </div>
              <div className="text-sm">
                <Link
                  className="font-medium text-primary hover:text-green-700 transition-colors"
                  href="/auth/forgot-password"
                >
                  ¿Olvidaste tu clave?
                </Link>
              </div>
            </div>
            <button
              className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-lg shadow-sm text-lg font-semibold text-white bg-primary hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-200 active:transform active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Iniciando sesión..." : "Ingresar"}
            </button>
          </form>
          <div className="mt-10 text-center">
            <p className="text-sm text-gray-500">
              <Link
                href="/auth/register"
                className="font-bold text-primary hover:text-green-700 transition-colors"
              >
                Regístrate aquí
              </Link>
            </p>
          </div>
        </div>
        <div className="mt-8 text-center text-xs text-gray-500 space-y-2">
          <p>© 2024 Banca Virtual. Todos los derechos reservados.</p>
          <div className="flex justify-center space-x-4">
            <a className="hover:underline" href="#">
              Privacidad
            </a>
            <a className="hover:underline" href="#">
              Seguridad
            </a>
            <a className="hover:underline" href="#">
              Ayuda
            </a>
          </div>
        </div>
      </div>
      <button
        className="fixed bottom-6 right-6 p-3 bg-white rounded-full shadow-lg border border-gray-100 text-gray-500 hover:text-primary transition-colors"
        onClick={() => document.documentElement.classList.toggle("dark")}
      >
        <span className="material-symbols-outlined">contrast</span>
      </button>
    </div>
  );
}

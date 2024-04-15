"use client";
import { useForm } from "react-hook-form";
import { useAuthFetch } from "@/hooks/useAuthFetch";
import useStore from "@/store/storeGlobals";
import Link from "next/link";
import { AxiosRequestConfig } from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

interface ChangePasswordProps {
  newPassword: string;
  confirmPassword: string;
}

const ChangePasswor = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ChangePasswordProps>();
  const authRouter = useAuthFetch();
  const { errorAuth } = useStore();
  const searchParams = useSearchParams();
  const navigation = useRouter();

  const onSubmit = async (data: ChangePasswordProps) => {
    const token = searchParams.get("token");

    const options: AxiosRequestConfig<any> = {
      headers: {
        token,
      },
    };

    await authRouter({
      endpoint: "change-password",
      formData: {
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword,
      },
      options,
    });
    reset();
  };

  return (
    <Suspense
      fallback={
        <div className="w-full sm:w-[30rem] sm:h-[rem] bg-white shadow-2xl rounded px-8 py-4 mb-4 animate-fade-in animate-duration-1000 animate-iteration-count-one">
          Cargando...
        </div>
      }
    >
      <div className="p-4 w-full h-[100vh] flex-col flex sm:flex-row items-center justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" w-full sm:w-[30rem] sm:h-[rem] bg-white shadow-2xl rounded px-8 py-4 mb-4 animate-fade-in animate-duration-1000 animate-iteration-count-one"
        >
          <div className="mb-4">
            <label
              htmlFor="newPassword"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Nueva contraseña:
            </label>
            <input
              type="password"
              id="newPassword"
              {...register("newPassword", {
                required: "Este campo es obligatorio",
              })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <div className="h-2">
              {errors.newPassword && (
                <span className="text-xs text-red-500">
                  {errors.newPassword.message}
                </span>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Confirmar contraseña:
            </label>
            <input
              type="password"
              id="confirmPassword"
              {...register("confirmPassword", {
                required: "Este campo es obligatorio",
              })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <div className="h-2">
              {errors.confirmPassword && (
                <span className="text-xs text-red-500">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>
          </div>

          <div className="text-xs mb-2 text-pretty">
            <p>
              Al ingresar la nueva contraseña y su confirmación, haz click en el
              botón Confirmar cambio.
            </p>
          </div>

          <div className="mb-4 h-8 font-bold text-blue-700 text-center">
            {errorAuth && <span>{errorAuth}</span>}
          </div>

          <div className="gap-4 text-xs sm:text-base flex items-center justify-between">
            <button className="bg-teal-800 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Confirmar cambio
            </button>
            <button
              onClick={() => navigation.push("/")}
              className="bg-teal-800 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Volver al inicio de sesión
            </button>
          </div>
        </form>
      </div>
    </Suspense>
  );
};

export default ChangePasswor;

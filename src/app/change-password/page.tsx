"use client";
import { useForm } from "react-hook-form";
import { useAuthFetch } from "@/hooks/useAuthFetch";
import useStore from "@/store/storeGlobals";
import { AxiosRequestConfig } from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { TbPasswordUser } from "react-icons/tb";
import { RiLockPasswordLine } from "react-icons/ri";
import { AlertError, AlertSuccess } from "@/components/AlertInfor";
import { ChangePasswordProps } from "@/interfaces/interfaces";

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
        <div className="w-full sm:w-[30rem] sm:h-[rem] rounded px-8 py-4 mb-4 animate-fade-in animate-duration-1000 animate-iteration-count-one"></div>
      }
    >
      <div className="text-white p-4 w-full h-[100vh] flex-col flex sm:flex-row items-center justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" w-full sm:w-[30rem] sm:h-[rem] rounded px-8 py-4 mb-4 animate-fade-in animate-duration-1000 animate-iteration-count-one"
        >
          <div className="mb-4 relative">
            <input
              placeholder="Nueva contraseña"
              type="password"
              id="newPassword"
              {...register("newPassword", {
                required: "Este campo es obligatorio",
              })}
              className="w-full pr-8 focus:border-l-2 focus:border-r-2 focus:border-t-2 focus:border-b-2 focus:border-white  placeholder:text-white bg-transparent p-2 border-l-2 border-r-2 border-t-2 border-b-2 border-white text-white rounded-lg"
            />
            <TbPasswordUser className="absolute right-1 top-1 text-white text-3xl" />
            <div className="h-2">
              {errors.newPassword && (
                <span className="font-semibold text-xs text-red-500">
                  {errors.newPassword.message}
                </span>
              )}
            </div>
          </div>

          <div className="mb-4 relative">
            <input
              placeholder="Confirmar contraseña"
              type="password"
              id="confirmPassword"
              {...register("confirmPassword", {
                required: "Este campo es obligatorio",
              })}
              className="w-full pr-8 focus:border-l-2 focus:border-r-2 focus:border-t-2 focus:border-b-2 focus:border-white  placeholder:text-white bg-transparent p-2 border-l-2 border-r-2 border-t-2 border-b-2 border-white text-white rounded-lg"
            />
            <RiLockPasswordLine className="absolute right-2 top-2 text-white text-2xl" />
            <div className="h-2">
              {errors.confirmPassword && (
                <span className="font-semibold  text-xs text-red-500">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>
          </div>

          <div className="text-sm mb-2 text-pretty">
            <p>
              Al ingresar la nueva contraseña y su confirmación, haz click en el
              botón Confirmar cambio.
            </p>
          </div>

          <div className="gap-4 text-xs sm:text-base flex items-center justify-between">
            <button className="w-52  text-white bg-gradient-to-r from-indigo-500 via-indigo-600-600 to-indigo-800 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-indigo-300 dark:focus:ring-indigo-800 shadow-lg shadow-indigo-500/50 dark:shadow-lg dark:shadow-indigo-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
              Confirmar cambio
            </button>
            <button
              onClick={() => navigation.push("/")}
              className="w-52 h-10 font-semiboldborder-[3px] text-white rounded-lg  hover:text-gray-200 hover:underline hover:text-2xl hover:-translate-y-1 hover:scale-75  duration-150"
            >
              Volver al inicio
            </button>
          </div>
        </form>
      </div>

      {errorAuth}

      <div className="fixed bottom-10 w-full h-4 ">
        {errorAuth === "No autorizado" && <AlertError errorAuth={errorAuth} />}

        {errorAuth === "Token no valido" && (
          <AlertError errorAuth={errorAuth} />
        )}
        {errorAuth === "Las contraseñas no coinciden" && (
          <AlertError errorAuth={errorAuth} />
        )}
        {errorAuth === "Usuario no encontrado" && (
          <AlertError errorAuth={errorAuth} />
        )}
        {errorAuth === "Te falto enviar algún campo" && (
          <AlertError errorAuth={errorAuth} />
        )}
        {errorAuth === "Ocurrió un error" && (
          <AlertError errorAuth={errorAuth} />
        )}

        {errorAuth === "Contraseña cambiada correctamente" && (
          <AlertSuccess errorAuth={errorAuth} />
        )}

        {errorAuth}
      </div>
    </Suspense>
  );
};

export default ChangePasswor;

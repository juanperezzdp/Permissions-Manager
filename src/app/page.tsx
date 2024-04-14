"use client";
import Image from "next/image";
import IllustrationInit from "@/SVG/IllustrationRegister.svg";
import { useForm } from "react-hook-form";
import { useAuthFetch } from "@/hooks/useAuthFetch";
import useStore from "@/store/storeGlobals";
import Link from "next/link";
import useToken from "@/hooks/useToken";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface LoginFormProps {
  email: string;
  password: string;
  confirmPassword: string;
}

const LoginPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormProps>();
  const [loding, setLoding] = useState<boolean>(false);
  const authRouter = useAuthFetch();
  const { errorAuth } = useStore();
  const token = useToken();
  const route = useRouter();

  const onSubmit = async (data: LoginFormProps) => {
    setLoding(true);
    await authRouter({
      endpoint: "login",
      formData: {
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
      },
    }).then(() => {
      route.push(token?.data.rol === "Admin" ? "/homeAdmin" : "/homeUser");
      setLoding(false);
    });
  };

  return (
    <main className="px-4 py-4  w-full sm:h-[100vh] flex-col sm:flex sm:flex-row items-center justify-center">
      <Image
        className="w-[50rem] sm:w-[700px]"
        src={IllustrationInit}
        alt="Team Work Illustration"
      />
      <div className="w-full -mt-6  sm:-mt-0 sm:w-[45%] animate-fade-in animate-duration-1000 animate-iteration-count-one">
        <div className="mb-6 text-pretty text-center">
          <h1 className="text-white text-[1.6rem] mb-4 sm:mb-0">
            Hola bienvenido al gestor de permisos
          </h1>
          <p className="text-white mb-2 text-sm ">
            La aplicación empresarial interna para gestión de permisos laborales
            es una herramienta diseñada para facilitar y optimizar el proceso de
            solicitud, aprobación y seguimiento de permisos y licencias de los
            empleados dentro de una organización.
          </p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" shadow-teal-950 shadow-2xl w-full bg-white rounded px-8 py-4 sm:mb-4 "
        >
          <div className="mb-4">
            <label htmlFor="email" className="block  text-sm font-bold mb-2">
              Correo electrónico:
            </label>
            <input
              type="email"
              id="email"
              {...register("email", { required: "Este campo es obligatorio" })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
            />
            <div className="h-2">
              {errors.email && (
                <span className="text-xs text-red-500">
                  {errors.email.message}
                </span>
              )}
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-bold mb-2">
              Contraseña:
            </label>
            <input
              type="password"
              id="password"
              {...register("password", {
                required: "Este campo es obligatorio",
              })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
            />
            <div className="h-2">
              {errors.password && (
                <span className="text-xs text-red-500">
                  {errors.password.message}
                </span>
              )}
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block  text-sm font-bold mb-2"
            >
              Confirmar Contraseña:
            </label>
            <input
              type="password"
              id="confirmPassword"
              {...register("confirmPassword", {
                required: "Este campo es obligatorio",
              })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
            />
            <div className="h-2">
              {errors.confirmPassword && (
                <span className="text-xs text-red-500">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>
          </div>
          <div className="mb-4 h-6 font-bold text-blue-800 text-center">
            {errorAuth && <span>{errorAuth}</span>}
          </div>
          <div className="flex  gap-2 items-center justify-between">
            <button className=" w-[10rem] text-sm sm:text-base bg-teal-800 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              {loding === false ? "Iniciar sesión" : "Cargando..."}
            </button>
            <Link
              className="inline-block align-baseline font-bold text-sm text-teal-900 hover:text-teal-700"
              href="forget-password"
            >
              ¿Has olvidado tu contraseña?
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
};

export default LoginPage;

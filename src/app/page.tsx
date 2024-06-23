"use client";
import { useForm } from "react-hook-form";
import { useAuthFetch } from "@/hooks/useAuthFetch";
import useStore from "@/store/storeGlobals";
import Link from "next/link";
import useToken from "@/hooks/useToken";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MdOutlineMail } from "react-icons/md";
import { TbPasswordUser } from "react-icons/tb";
import { RiLockPasswordLine } from "react-icons/ri";
import { AlertError, AlertSuccess } from "@/components/AlertInfor";
import Image from "next/image";
import { LoginFormProps } from "@/interfaces/interfaces";
import Table from "@/IMG/Tablee.png";
import User from "@/IMG/User.png";
import Email from "@/IMG/Email.jpg";
import EmailTwo from "@/IMG/EmailTwo.jpg";
import Areachart from "@/IMG/AreaChart.png";
import Radial from "@/IMG/Radial.jpg";
import { VscLoading } from "react-icons/vsc";
import { FaRegCircle } from "react-icons/fa";

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
  useToken();

  console.log(token);

  const onSubmit = async (data: LoginFormProps) => {
    setLoding(true);
    try {
      setLoding(true);
      await authRouter({
        endpoint: "login",
        formData: {
          email: data.email,
          password: data.password,
          confirmPassword: data.confirmPassword,
        },
      });
      route.push(token?.data.rol === "Admin" ? "/homeAdmin" : "/homeUser");
    } catch (error) {
      setLoding(false);
    } finally {
      setLoding(false);
    }
  };

  return (
    <>
      <main className="p-4 overflow-hidden w-full sm:h-[100vh] flex flex-col sm:flex-row justify-between items-center ">
        <div className="flex flex-col justify-center items-center w-[40%] h-auto">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-8 lg:w-[20rem] xl:w-[25rem]"
          >
            <div className=" text-white text-pretty text-center">
              <h1 className=" text-[1.3rem] font-semibold">
                Hola bienvenido al gestor de permisos
              </h1>
              <p className="mt-2 text-sm">
                La aplicación empresarial interna para gestión de permisos
                laborales es una herramienta diseñada para facilitar y optimizar
                el proceso de solicitud, aprobación y seguimiento de permisos y
                licencias de los empleados dentro de una organización.
              </p>
            </div>

            <div>
              <div className="field flex flex-col h-[50px] w-full relative mb-[20px]">
                <input
                  placeholder="Correo electrónico"
                  type="email"
                  id="email"
                  {...register("email", {
                    required: "Este campo es obligatorio",
                  })}
                  className="pr-8 focus:border-l-2 focus:border-r-2 focus:border-t-2 focus:border-b-2 focus:border-white  placeholder:text-white bg-transparent p-2 border-l-2 border-r-2 border-t-2 border-b-2 border-white text-white rounded-lg"
                />
                <MdOutlineMail className="absolute right-2 top-2 text-white text-2xl" />
                <div className="h-2">
                  {errors.email && (
                    <span className="font-semibold text-xs text-red-500">
                      {errors.email.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="field flex flex-col h-[50px] w-full relative mb-[20px]">
                <input
                  placeholder="Contraseña"
                  type="password"
                  id="password"
                  {...register("password", {
                    required: "Este campo es obligatorio",
                  })}
                  className="pr-8 focus:border-l-2 focus:border-r-2 focus:border-t-2 focus:border-b-2 focus:border-white  placeholder:text-white bg-transparent p-2 border-l-2 border-r-2 border-t-2 border-b-2 border-white text-white rounded-lg"
                />
                <TbPasswordUser className="absolute right-1 top-1 text-white text-3xl" />
                <div className="h-2">
                  {errors.password && (
                    <span className="font-semibold text-xs text-red-500">
                      {errors.password.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="field flex flex-col h-[50px] w-full relative mb-[20px]">
                <input
                  placeholder="Confirmar Contraseña"
                  type="password"
                  id="confirmPassword"
                  {...register("confirmPassword", {
                    required: "Este campo es obligatorio",
                  })}
                  className=" pr-8 focus:border-l-2 focus:border-r-2 focus:border-t-2 focus:border-b-2 focus:border-white  placeholder:text-white bg-transparent p-2 border-l-2 border-r-2 border-t-2 border-b-2 border-white text-white rounded-lg"
                />
                <RiLockPasswordLine className="absolute right-2 top-2 text-white text-2xl" />
                <div className="h-2">
                  {errors.confirmPassword && (
                    <span className="font-semibold text-xs text-red-500">
                      {errors.confirmPassword.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-2 items-center justify-between">
                <button className="w-full h-10 flex justify-center items-center text-white bg-gradient-to-r from-indigo-500 via-indigo-600-600 to-indigo-800 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-indigo-300 dark:focus:ring-indigo-800 shadow-lg shadow-indigo-500/50 dark:shadow-lg dark:shadow-indigo-800/80 font-medium rounded-lg px-5 py-2.5 text-center me-2 mb-2">
                  {loding === false ? (
                    "Iniciar sesión"
                  ) : (
                    <span className="relative flex justify-center items-center">
                      <FaRegCircle className="absolute text-3xl text-gray-400" />
                      <VscLoading className="absolute font-extrabold text-[2rem] animate-rotate-360 animate-iteration-count-infinite animate-duration-700ms" />
                    </span>
                  )}
                </button>
                <div className="h-5">
                  <Link
                    className=" hover:text-gray-200 hover:underline hover:text-xl hover:-translate-y-1 hover:scale-75  duration-150 inline-block align-baseline  text-sm text-white"
                    href="forget-password"
                  >
                    ¿Has olvidado tu contraseña?
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </div>

        <div className="w-[60%] h-[30rem] sm:h-auto ml-8 flex justify-center sm:items-center relative">
          <div className="w-[20rem] rounded-lg overflow-hidden shadow-black shadow-lg absolute sm:top-0 sm:right-0  animate-fade-in animate-duration-1000ms animate-iteration-count-one">
            <Image src={Table} alt="Table" />
          </div>
          <div className="w-[8rem] rounded-lg overflow-hidden shadow-black shadow-lg absolute sm:top-[45%] sm:-left-5  animate-fade-in animate-duration-1000ms animate-iteration-count-one">
            <Image src={User} alt="Table" className="w-[8rem]" />
          </div>
          <div className="w-[13rem] rounded-lg overflow-hidden shadow-black shadow-lg absolute sm:-top-8 sm:left-52  animate-fade-in animate-duration-1000ms animate-iteration-count-one">
            <Image src={Email} alt="Table" className="w-[13rem]" />
          </div>
          <div className="w-[13rem] rounded-lg overflow-hidden shadow-black shadow-lg absolute sm:-bottom-3 sm:left-32  animate-fade-in animate-duration-1000ms animate-iteration-count-one">
            <Image src={EmailTwo} alt="Table" className="w-[13rem]" />
          </div>
          <div className="w-[20rem] rounded-lg overflow-hidden shadow-black shadow-lg absolute sm:-right-3 sm:-bottom-3  animate-fade-in animate-duration-1000ms animate-iteration-count-one">
            <Image src={Areachart} alt="Table" />
          </div>
          <div className="w-[15rem] rounded-lg overflow-hidden shadow-black shadow-lg absolute sm:top-[5rem] sm:-right-3  animate-fade-in animate-duration-1000ms animate-iteration-count-one">
            <Image src={Radial} alt="Table" />
          </div>
        </div>
      </main>
      <div className="fixed bottom-10 w-full h-4 ">
        {errorAuth === "Usuario no encontrado" && (
          <AlertError errorAuth={errorAuth} />
        )}
        {errorAuth === "Contraseña incorrecta" && (
          <AlertError errorAuth={errorAuth} />
        )}
        {errorAuth === "Las contraseñas no coinciden" && (
          <AlertError errorAuth={errorAuth} />
        )}
        {errorAuth === "Ocurrió un error" && (
          <AlertError errorAuth={errorAuth} />
        )}

        {errorAuth === "Que bueno verte devuelta!" && (
          <AlertSuccess errorAuth={errorAuth} />
        )}
      </div>
    </>
  );
};

export default LoginPage;

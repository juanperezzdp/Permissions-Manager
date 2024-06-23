"use client";
import { useForm } from "react-hook-form";
import { useAuthFetch } from "@/hooks/useAuthFetch";
import useStore from "@/store/storeGlobals";
import { useRouter } from "next/navigation";
import { MdOutlineMail } from "react-icons/md";
import { AlertError, AlertSuccess } from "@/components/AlertInfor";
import { ForgetPasswordProps } from "@/interfaces/interfaces";

const ForgetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgetPasswordProps>();
  const authRouter = useAuthFetch();
  const { errorAuth } = useStore();
  const navigation = useRouter();

  const onSubmit = async (data: ForgetPasswordProps) => {
    await authRouter({
      endpoint: "forget-password",
      formData: {
        email: data.email,
      },
    });
  };

  return (
    <div className="px-4 sm:w-full h-[100vh] flex-col flex sm:flex-row items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" w-full sm:w-[30rem] sm:h-[rem] text-white rounded px-8 py-4 mb-4 animate-fade-in animate-duration-1000 animate-iteration-count-one"
      >
        <div className="mb-4">
          <div className="relative">
            <input
              placeholder="Correo electrónico"
              type="email"
              id="email"
              {...register("email", { required: "Este campo es obligatorio" })}
              className="w-full pr-8 focus:border-l-2 focus:border-r-2 focus:border-t-2 focus:border-b-2 focus:border-white  placeholder:text-white bg-transparent p-2 border-l-2 border-r-2 border-t-2 border-b-2 border-white text-white rounded-lg"
            />
            <MdOutlineMail className="absolute top-2 right-2 text-white text-2xl" />
          </div>
          <div className="h-2">
            {errors.email && (
              <span className="font-semibold text-xs text-red-500">
                {errors.email.message}
              </span>
            )}
          </div>
        </div>
        <div className="text-sm mb-4 text-pretty">
          <p>
            Por favor, introduce tu dirección de correo electrónico para que
            podamos enviarte un correo electrónico con instrucciones para
            restablecer tu contraseña.
          </p>
        </div>

        <div className="gap-4 text-xs sm:text-base flex items-center justify-between">
          <button className="w-52  text-white bg-gradient-to-r from-indigo-500 via-indigo-600-600 to-indigo-800 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-indigo-300 dark:focus:ring-indigo-800 shadow-lg shadow-indigo-500/50 dark:shadow-lg dark:shadow-indigo-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
            Enviar un correo
          </button>
          <button
            onClick={() => navigation.push("/")}
            className="w-52 h-10 font-semiboldborder-[3px] text-white rounded-lg  hover:text-gray-200 hover:underline hover:text-2xl hover:-translate-y-1 hover:scale-75  duration-150"
          >
            Volver al inicio
          </button>
        </div>
      </form>

      <div className="fixed bottom-10 w-full h-4 ">
        {errorAuth === "Usuario no encontrado" && (
          <AlertError errorAuth={errorAuth} />
        )}
        {errorAuth === "Ocurrió un error" && (
          <AlertError errorAuth={errorAuth} />
        )}
        {errorAuth === "Correo enviado correctamente" && (
          <AlertSuccess errorAuth={errorAuth} />
        )}
      </div>
    </div>
  );
};

export default ForgetPassword;

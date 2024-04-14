"use client";
import { useForm } from "react-hook-form";
import { useAuthFetch } from "@/hooks/useAuthFetch";
import useStore from "@/store/storeGlobals";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface ForgetPasswordProps {
  email: string;
}

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
        className=" w-full sm:w-[30rem] sm:h-[rem] bg-white shadow-2xl rounded px-8 py-4 mb-4 animate-fade-in animate-duration-1000 animate-iteration-count-one"
      >
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Correo electrónico:
          </label>
          <input
            type="email"
            id="email"
            {...register("email", { required: "Este campo es obligatorio" })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <div className="h-2">
            {errors.email && (
              <span className="text-xs text-red-500">
                {errors.email.message}
              </span>
            )}
          </div>
        </div>
        <div className="text-xs mb-2 text-pretty">
          <p>
            Por favor, introduce tu dirección de correo electrónico para que
            podamos enviarte un correo electrónico con instrucciones para
            restablecer tu contraseña.
          </p>
        </div>
        <div className="mb-2 h-8 font-bold text-blue-700 text-center">
          {errorAuth && <span>{errorAuth}</span>}
        </div>

        <div className="gap-4 text-xs sm:text-base flex items-center justify-between">
          <button className="bg-teal-800 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Enviar un correo
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
  );
};

export default ForgetPassword;

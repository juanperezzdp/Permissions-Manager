"use client";
import { useAuthFetch } from "@/hooks/useAuthFetch";
import { useForm } from "react-hook-form";
import useStore from "@/store/storeGlobals";
import { useState } from "react";

interface LoginFormProps {
  email: string;
  password: string;
  confirmPassword: string;
  doc: number;
  fullUserName: string;
  address: string;
  phoneNumber: number;
  workArea: string;
  rol: string;
}

const FormRegister = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormProps>();
  const [valueUserAdm, setvalueUserAdm] = useState<string>("");

  const authRouter = useAuthFetch();
  const { errorAuth } = useStore();

  const onSubmit = async (data: LoginFormProps) => {
    await authRouter({
      endpoint: "register",
      formData: {
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
        doc: Number(data.doc),
        fullUserName: data.fullUserName,
        address: data.address,
        phoneNumber: Number(data.phoneNumber),
        workArea: data.workArea,
        rol: valueUserAdm,
      },
    });
    reset();
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.checked ? e.target.value : "";
    setvalueUserAdm(newValue);
  };

  return (
    <div className="sm:p-2 sm:h-[100vh] w-full flex justify-center items-center animate-fade-in animate-duration-1000 animate-iteration-count-one">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-4 flex flex-col justify-center items-center bg-white shadow-teal-950 shadow-2xl sm:rounded px-8 py-4 sm:mb-4 "
      >
        <div className="text-center m-4">
          <h2 className=" text-2xl">
            En este formulario podrás agregar usuarios con el rol de
            administrador o usuario.
          </h2>
          <p>Recuerda que todos los campos son obligatorios.</p>
        </div>
        <div className="flex-col sm:flex sm:flex-row gap-8">
          <div className="gap-4">
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
                {...register("email", {
                  required: "Este campo es obligatorio",
                })}
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

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Contraseña:
              </label>
              <input
                type="password"
                id="password"
                {...register("password", {
                  required: "Este campo es obligatorio",
                })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Confirmar Contraseña:
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
          </div>

          <div className=" gap-4">
            <div className="mb-4">
              <label
                htmlFor="fullUserName"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Nombre completo:
              </label>
              <input
                type="text"
                id="fullUserName"
                {...register("fullUserName", {
                  required: "Este campo es obligatorio",
                })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <div className="h-2">
                {errors.fullUserName && (
                  <span className="text-xs text-red-500">
                    {errors.fullUserName.message}
                  </span>
                )}
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="doc"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Numero de documento:
              </label>
              <input
                type="number"
                id="doc"
                min={0}
                {...register("doc", {
                  required: "Este campo es obligatorio",
                })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <div className="h-2">
                {errors.doc && (
                  <span className="text-xs text-red-500">
                    {errors.doc.message}
                  </span>
                )}
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="address"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Dirección:
              </label>
              <input
                type="text"
                id="address"
                {...register("address", {
                  required: "Este campo es obligatorio",
                })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <div className="h-2">
                {errors.address && (
                  <span className="text-xs text-red-500">
                    {errors.address.message}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div>
            <div className="mb-4">
              <label
                htmlFor="phoneNumber"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Numero de celular:
              </label>
              <input
                type="number"
                id="phoneNumber"
                min={0}
                {...register("phoneNumber", {
                  required: "Este campo es obligatorio",
                })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <div className="h-2">
                {errors.phoneNumber && (
                  <span className="text-xs text-red-500">
                    {errors.phoneNumber.message}
                  </span>
                )}
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="workArea"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Área de trabajo:
              </label>
              <input
                type="text"
                id="workArea"
                {...register("workArea", {
                  required: "Este campo es obligatorio",
                })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <div className="h-2">
                {errors.workArea && (
                  <span className="text-xs text-red-500">
                    {errors.workArea.message}
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col justify-center h-20">
              <label
                htmlFor=""
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Elige una opción:
              </label>
              <div className="flex flex-col gap-2">
                <div className=" flex items-center">
                  <input
                    className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-green-950 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity hover:bg-green-500 checked:border-green-700 checked:bg-green-500 checked:before:bg-green-500 hover:before:opacity-10"
                    type="checkbox"
                    value="admin"
                    id="checkboxAdm"
                    checked={valueUserAdm === "admin"}
                    onChange={handleCheckboxChange}
                  />

                  <label
                    className="inline-block pl-[0.15rem] hover:cursor-pointer"
                    htmlFor="checkboxAdm"
                  >
                    Administrativo
                  </label>
                </div>

                <div className=" flex items-center mb-[0.125rem]  ">
                  <input
                    className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-green-950 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity hover:bg-green-500 checked:border-green-700 checked:bg-green-500 checked:before:bg-green-500 hover:before:opacity-10"
                    type="checkbox"
                    value="user"
                    id="checkboxUser"
                    defaultChecked
                    checked={valueUserAdm === "user"}
                    onChange={handleCheckboxChange}
                  />
                  <label
                    className="inline-block pl-[0.15rem] hover:cursor-pointer"
                    htmlFor="checkboxUser"
                  >
                    Usuario
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="h-4 mb-4 font-bold text-blue-700 flex justify-center items-center">
          {errorAuth && <span>{errorAuth}</span>}
        </div>

        <div className="flex items-center justify-between">
          <button className=" bg-teal-800 hover:bg-teal-600  text-white font-bold py-2 px-10 rounded focus:outline-none focus:shadow-outline">
            Registar
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormRegister;

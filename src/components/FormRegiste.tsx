"use client";
import { useAuthFetch } from "@/hooks/useAuthFetch";
import { useForm } from "react-hook-form";
import useStore from "@/store/storeGlobals";
import { useState } from "react";
import { MdOutlineMail, MdOutlineMapsHomeWork } from "react-icons/md";
import { TbPasswordUser } from "react-icons/tb";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaRegUser, FaRegAddressCard, FaRegCircle } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import { GrUserWorker } from "react-icons/gr";
import { AlertError, AlertSuccess } from "./AlertInfor";
import { LoginFormProps } from "@/interfaces/interfaces";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { VscLoading } from "react-icons/vsc";

const FormRegister = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormProps>();
  const [valueUserAdm, setvalueUserAdm] = useState<string>("");
  const [loding, setLoding] = useState<boolean>(false);

  const authRouter = useAuthFetch();
  const { errorAuth } = useStore();

  const onSubmit = async (data: LoginFormProps) => {
    try {
      setLoding(true);
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
    } catch (error) {
      setLoding(false);
    } finally {
      setLoding(false);
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.checked ? e.target.value : "";
    setvalueUserAdm(newValue);
  };

  return (
    <div className="sm:p-2 sm:h-[100vh] w-full flex justify-center items-center animate-fade-in animate-duration-1000 animate-iteration-count-one">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="text-white  w-[50rem] p-4 flex flex-col justify-center items-center sm:mb-4 "
      >
        <div className="text-center m-4">
          <h2 className=" text-2xl">
            En este formulario podrás agregar usuarios con el rol de
            administrador o usuario.
          </h2>
          <div className="text-xs mt-4">
            <p>
              Si creas un usuario con el rol de usuario, este usuario tendrá
              acceso al panel de empleado, donde podrá crear su solicitud de
              permiso laboral.
            </p>
            <p>
              Si creas un usuario con el rol de administrador, este usuario
              tendrá acceso al panel de administrador, donde podrá gestionar
              todos los permisos de los empleados, aprobar o denegar las
              solicitudes.
            </p>
            <p>
              Recuerda que todos los campos del formulario son obligatorios.
            </p>
          </div>
        </div>
        <div className="flex-col sm:flex sm:flex-row gap-8">
          <div className="gap-4">
            <div className="relative mb-8">
              <input
                placeholder="Correo electrónico"
                type="email"
                id="email"
                {...register("email", {
                  required: "Este campo es obligatorio",
                })}
                className="w-full pr-8 focus:border-l-2 focus:border-r-2 focus:border-t-2 focus:border-b-2 focus:border-white  placeholder:text-white bg-transparent p-2 border-l-2 border-r-2 border-t-2 border-b-2 border-white text-white rounded-lg"
              />

              <MdOutlineMail className="absolute right-2 top-2 text-white text-2xl" />
              <div className="h-2">
                {errors.email && (
                  <span className="font-semibold text-sm text-red-500">
                    {errors.email.message}
                  </span>
                )}
              </div>
            </div>

            <div className="relative mb-8">
              <input
                placeholder="Contraseña"
                type="password"
                id="password"
                {...register("password", {
                  required: "Este campo es obligatorio",
                })}
                className="w-full pr-8 focus:border-l-2 focus:border-r-2 focus:border-t-2 focus:border-b-2 focus:border-white  placeholder:text-white bg-transparent p-2 border-l-2 border-r-2 border-t-2 border-b-2 border-white text-white rounded-lg"
              />
              <TbPasswordUser className="absolute right-2 top-2 text-white text-2xl" />
              <div className="h-2">
                {errors.password && (
                  <span className="font-semibold text-sm text-red-500">
                    {errors.password.message}
                  </span>
                )}
              </div>
            </div>

            <div className="relative mb-8">
              <input
                placeholder="Confirmar Contraseña"
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
                  <span className="font-semibold text-sm text-red-500">
                    {errors.confirmPassword.message}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className=" gap-4">
            <div className="relative mb-8">
              <input
                placeholder="Nombre completo"
                type="text"
                id="fullUserName"
                {...register("fullUserName", {
                  required: "Este campo es obligatorio",
                })}
                className="w-full pr-8 focus:border-l-2 focus:border-r-2 focus:border-t-2 focus:border-b-2 focus:border-white  placeholder:text-white bg-transparent p-2 border-l-2 border-r-2 border-t-2 border-b-2 border-white text-white rounded-lg"
              />
              <FaRegUser className="absolute right-2 top-2 text-white text-xl" />
              <div className="h-2">
                {errors.fullUserName && (
                  <span className="font-semibold text-sm text-red-500">
                    {errors.fullUserName.message}
                  </span>
                )}
              </div>
            </div>
            <div className="relative mb-8">
              <input
                placeholder="Numero de documento"
                type="number"
                id="doc"
                min={0}
                {...register("doc", {
                  required: "Este campo es obligatorio",
                })}
                className="w-full pr-8 [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-nonefocus:border-l-2 focus:border-r-2 focus:border-t-2 focus:border-b-2 focus:border-white  placeholder:text-white bg-transparent p-2 border-l-2 border-r-2 border-t-2 border-b-2 border-white text-white rounded-lg"
              />
              <FaRegAddressCard className="absolute right-2 top-2 text-white text-2xl" />
              <div className="h-2">
                {errors.doc && (
                  <span className="font-semibold text-sm text-red-500">
                    {errors.doc.message}
                  </span>
                )}
              </div>
            </div>
            <div className="relative mb-8">
              <input
                placeholder="Dirección"
                type="text"
                id="address"
                {...register("address", {
                  required: "Este campo es obligatorio",
                })}
                className="w-full pr-8 focus:border-l-2 focus:border-r-2 focus:border-t-2 focus:border-b-2 focus:border-white  placeholder:text-white bg-transparent p-2 border-l-2 border-r-2 border-t-2 border-b-2 border-white text-white rounded-lg"
              />
              <MdOutlineMapsHomeWork className="absolute right-2 top-2 text-white text-2xl" />
              <div className="h-2">
                {errors.address && (
                  <span className="font-semibold text-sm text-red-500">
                    {errors.address.message}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="gap-8">
            <div className="relative mb-8">
              <input
                placeholder="Numero de celular"
                type="number"
                id="phoneNumber"
                min={0}
                {...register("phoneNumber", {
                  required: "Este campo es obligatorio",
                })}
                className="[-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none pr-8 w-full focus:border-l-2 focus:border-r-2 focus:border-t-2 focus:border-b-2 focus:border-white  placeholder:text-white bg-transparent p-2 border-l-2 border-r-2 border-t-2 border-b-2 border-white text-white rounded-lg"
              />
              <FiPhone className="absolute right-2 top-2 text-white text-2xl" />
              <div className="h-2">
                {errors.phoneNumber && (
                  <span className="font-semibold text-sm text-red-500">
                    {errors.phoneNumber.message}
                  </span>
                )}
              </div>
            </div>
            <div className="relative mb-4">
              <input
                placeholder="Área de trabajo"
                type="text"
                id="workArea"
                {...register("workArea", {
                  required: "Este campo es obligatorio",
                })}
                className="pr-8 w-full focus:border-l-2 focus:border-r-2 focus:border-t-2 focus:border-b-2 focus:border-white  placeholder:text-white bg-transparent p-2 border-l-2 border-r-2 border-t-2 border-b-2 border-white text-white rounded-lg"
              />
              <GrUserWorker className="absolute right-2 top-2 text-white text-2xl" />
              <div className="h-2">
                {errors.workArea && (
                  <span className="font-semibold text-sm text-red-500">
                    {errors.workArea.message}
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col justify-center h-20">
              <label htmlFor="" className="block text-sm font-bold mb-2">
                Elige una opción:
              </label>
              <div className="flex gap-4">
                <div className=" flex items-center">
                  <input
                    className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-white transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity hover:bg-blue-400 checked:border-white checked:bg-blue-400 bg-[#07011f] hover:before:opacity-5"
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
                    className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-white transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity hover:bg-blue-400 checked:border-white checked:bg-blue-400 bg-[#07011f] hover:before:opacity-5"
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

        <div className="w-[15rem] flex items-center justify-center">
          <button className="w-full h-10 flex justify-center items-center text-white bg-gradient-to-r from-indigo-500 via-indigo-600-600 to-indigo-800 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-indigo-300 dark:focus:ring-indigo-800 shadow-lg shadow-indigo-500/50 dark:shadow-lg dark:shadow-indigo-800/80 font-medium rounded-lg px-5 py-2.5 text-center mb-2">
            {loding === false ? (
              "Registrar el nuevo usuaria"
            ) : (
              <span className="relative flex justify-center items-center">
                <FaRegCircle className="absolute text-3xl text-gray-400" />
                <VscLoading className="absolute font-extrabold text-[2rem] animate-rotate-360 animate-iteration-count-infinite animate-duration-700ms" />
              </span>
            )}
          </button>
        </div>
      </form>

      <div className="fixed bottom-10 w-full h-4 ">
        {errorAuth === "Te falto enviar algún campo" && (
          <AlertError errorAuth={errorAuth} />
        )}
        {errorAuth === "Email no valido" && (
          <AlertError errorAuth={errorAuth} />
        )}
        {errorAuth === "Las contraseñas no coinciden" && (
          <AlertError errorAuth={errorAuth} />
        )}
        {errorAuth === "Ya existe un usuario con ese correo" && (
          <AlertError errorAuth={errorAuth} />
        )}
        {errorAuth === "Ocurrió un error" && (
          <AlertError errorAuth={errorAuth} />
        )}

        {errorAuth === "Usuario creado correctamente" && (
          <AlertSuccess errorAuth={errorAuth} />
        )}
      </div>
    </div>
  );
};

export default FormRegister;

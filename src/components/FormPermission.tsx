"use client";
import usePermissionFetch from "@/hooks/usePermissionFetch";
import useToken from "@/hooks/useToken";
import useStore from "@/store/storeGlobals";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AlertError, AlertSuccess } from "./AlertInfor";
import { FaRegUser, FaRegAddressCard, FaRegCircle } from "react-icons/fa";
import { TbMessageQuestion } from "react-icons/tb";
import { IoMdTime } from "react-icons/io";
import { PermissionFormProps } from "@/interfaces/interfaces";
import { VscLoading } from "react-icons/vsc";

const FormPermission: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PermissionFormProps>();
  const { postPermission } = usePermissionFetch();
  const { errorPermission } = useStore();
  const token = useToken();
  const [valueTime, setValueTime] = useState<string>("");
  const [loding, setLoding] = useState<boolean>(false);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.checked ? e.target.value : "";
    setValueTime(newValue);
  };

  const onSubmit = async (data: PermissionFormProps) => {
    try {
      setLoding(true);
      if (token) {
        await postPermission({
          formData: {
            idUser: token?.data._id,
            name: token?.data.fullUserName,
            doc: Number(token?.data.doc),
            date: data.date,
            unidad: valueTime,
            time: Number(data.time),
            description: data.description,
            email: token?.data.email,
          },
        });
        reset();
      }
    } catch (error) {
      setLoding(false);
    } finally {
      setLoding(false);
    }
  };

  return (
    <div className="w-full sm:h-[100vh] flex justify-center items-center animate-fade-in animate-duration-1000 animate-iteration-count-one">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="text-white w-[36rem] p-4 flex flex-col justify-center items-center  px-8 py-4 sm:mb-4 "
      >
        <div className="mb-4 text-center text-pretty">
          <h2 className="text-2xl">
            Rellena todo el formulario para tu solicitud de permiso.
          </h2>
          <div className="text-xs mt-4">
            <p>
              Recuerda que para que tu solicitud de permiso laboral sea
              aprobada, el tiempo transcurrido desde que la solicitaste hasta el
              día o hora del permiso debe ser mayor a tres días.
            </p>
          </div>
        </div>

        <div className="flex-col sm:flex sm:flex-row  gap-8">
          <div className="gap-4 w-[15rem]">
            <div className="relative mb-8">
              <h2 className="w-full pr-8 focus:border-l-2 focus:border-r-2 focus:border-t-2 focus:border-b-2 focus:border-white  placeholder:text-white bg-transparent p-2 border-l-2 border-r-2 border-t-2 border-b-2 border-white text-white rounded-lg">
                {token?.data.fullUserName}
              </h2>
              <FaRegUser className="absolute right-2 top-2 text-white text-xl" />
              <div className="font-semibold h-2 text-sm text-green-500">
                Este campo esta lleno
              </div>
            </div>

            <div className="relative mb-8">
              <h2 className="w-full pr-8 focus:border-l-2 focus:border-r-2 focus:border-t-2 focus:border-b-2 focus:border-white  placeholder:text-white bg-transparent p-2 border-l-2 border-r-2 border-t-2 border-b-2 border-white text-white rounded-lg">
                {token?.data.doc}
              </h2>
              <FaRegAddressCard className="absolute right-2 top-2 text-white text-2xl" />
              <div className="font-semibold h-2 text-sm text-green-500">
                Este campo esta lleno
              </div>
            </div>

            <div className="relative mb-8">
              <input
                placeholder="Descripción"
                type="text"
                id="description"
                {...register("description", {
                  required: "Este campo es obligatorio",
                })}
                className="w-full pr-8 focus:border-l-2 focus:border-r-2 focus:border-t-2 focus:border-b-2 focus:border-white  placeholder:text-white bg-transparent p-2 border-l-2 border-r-2 border-t-2 border-b-2 border-white text-white rounded-lg"
              />
              <TbMessageQuestion className="absolute right-2 top-2 text-white text-2xl" />
              <div className="h-2">
                {errors.description && (
                  <span className="font-semibold text-sm text-red-500">
                    {errors.description.message}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="w-[15rem] gap-4">
            <div className="relative mb-[1.8rem]">
              <input
                placeholder="Tiempos"
                type="number"
                min={0}
                id="time"
                {...register("time", {
                  required: "Este campo es obligatorio",
                })}
                className="[-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none w-full pr-8 focus:border-l-2 focus:border-r-2 focus:border-t-2 focus:border-b-2 focus:border-white  placeholder:text-white bg-transparent p-2 border-l-2 border-r-2 border-t-2 border-b-2 border-white text-white rounded-lg"
              />
              <IoMdTime className="absolute right-2 top-2 text-white text-2xl" />
              <div className="h-2">
                {errors.time && (
                  <span className="font-semibold text-sm text-red-500">
                    {errors.time.message}
                  </span>
                )}
              </div>
            </div>
            <div className="mb-8">
              <input
                placeholder="Fecha"
                type="date"
                id="date"
                {...register("date", {
                  required: "Este campo es obligatorio",
                })}
                className="w-full focus:border-l-2 focus:border-r-2 focus:border-t-2 focus:border-b-2 focus:border-white  placeholder:text-white bg-transparent p-2 border-l-2 border-r-2 border-t-2 border-b-2 border-white text-white rounded-lg"
              />
              <div className="h-2">
                {errors.date && (
                  <span className="font-semibold text-sm text-red-500">
                    {errors.date.message}
                  </span>
                )}
              </div>
            </div>

            <div className="flex-col items-center h-24">
              <label htmlFor="" className="block text-sm font-bold mb-2">
                Elige una opción:
              </label>
              <div className="flex  gap-4">
                <div className=" flex items-center">
                  <input
                    className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-white transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity hover:bg-blue-400 checked:border-white checked:bg-blue-400 bg-[#07011f] hover:before:opacity-5"
                    type="checkbox"
                    value="horas"
                    id="checkboxHours"
                    checked={valueTime === "horas"}
                    onChange={handleCheckboxChange}
                  />

                  <label
                    className="inline-block pl-[0.15rem] hover:cursor-pointer"
                    htmlFor="checkboxHours"
                  >
                    Horas
                  </label>
                </div>

                <div className=" flex items-center mb-[0.125rem]  ">
                  <input
                    className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-white transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity hover:bg-blue-400 checked:border-white checked:bg-blue-400 bg-[#07011f] hover:before:opacity-5"
                    type="checkbox"
                    value="días"
                    id="checkboxDay"
                    defaultChecked
                    checked={valueTime === "días"}
                    onChange={handleCheckboxChange}
                  />
                  <label
                    className="inline-block pl-[0.15rem] hover:cursor-pointer"
                    htmlFor="checkboxDay"
                  >
                    Días
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className=" flex items-center justify-center w-full">
          <button className="w-60 h-10 flex justify-center items-center text-white bg-gradient-to-r from-indigo-500 via-indigo-600-600 to-indigo-800 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-indigo-300 dark:focus:ring-indigo-800 shadow-lg shadow-indigo-500/50 dark:shadow-lg dark:shadow-indigo-800/80 font-medium rounded-lg px-5 py-2.5 text-center mb-2">
            {loding === false ? (
              "Enviar la solicitud"
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
        {errorPermission === "Te falto enviar algún campo" && (
          <AlertError errorAuth={errorPermission} />
        )}
        {errorPermission === "Ocurrió un error" && (
          <AlertError errorAuth={errorPermission} />
        )}

        {errorPermission === "A sido creado correctamente la solicitud" && (
          <AlertSuccess errorAuth={errorPermission} />
        )}
      </div>
    </div>
  );
};

export default FormPermission;

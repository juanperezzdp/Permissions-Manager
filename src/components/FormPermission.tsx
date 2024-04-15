"use client";
import usePermissionFetch from "@/hooks/usePermissionFetch";
import useToken from "@/hooks/useToken";
import useStore from "@/store/storeGlobals";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface PermissionFormProps {
  idUser: string | null | undefined;
  name: string;
  doc: number;
  date: string;
  unidad: string;
  time: number;
  description: string;
  email: string;
}

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

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.checked ? e.target.value : "";
    setValueTime(newValue);
  };

  const onSubmit = async (data: PermissionFormProps) => {
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
  };

  return (
    <div className="w-full sm:h-[100vh] flex justify-center items-center animate-fade-in animate-duration-1000 animate-iteration-count-one">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[50rem] p-4 flex flex-col justify-center items-center bg-white shadow-teal-950 shadow-2xl sm:rounded px-8 py-4 sm:mb-4 "
      >
        <div className="mb-4 text-center">
          <h2 className="text-2xl">
            Rellena todo el formulario para tu solicitud de permiso.
          </h2>
          <div className="text-xs">
            <p>
              Recuerda que para que tu solicitud de permiso laboral sea
              aprobada, el tiempo transcurrido desde que la solicitaste hasta el
              día o hora del permiso debe ser mayor a tres días.
            </p>
          </div>
        </div>

        <div className="flex-col sm:flex sm:flex-row  gap-8">
          <div className="gap-4 w-[15rem]">
            <div className="mb-4">
              <p className="block text-gray-700 text-sm font-bold mb-2">
                Nombre:
              </p>
              <h2 className="cursor-not-allowed shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                {token?.data.fullUserName}
              </h2>
              <div className="h-2 text-xs text-green-700">
                Este campo esta lleno por defecto
              </div>
            </div>

            <div className="mb-4">
              <p className=" block text-gray-700 text-sm font-bold mb-2">
                Documento:
              </p>

              <h2 className="cursor-not-allowed shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                {token?.data.doc}
              </h2>
              <div className="h-2 text-xs text-green-700">
                Este campo esta lleno por defecto
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Descripción:
              </label>
              <input
                type="text"
                id="description"
                {...register("description", {
                  required: "Este campo es obligatorio",
                })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <div className="h-2">
                {errors.description && (
                  <span className="text-xs text-red-500">
                    {errors.description.message}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="w-[15rem] gap-4">
            <div className="mb-4">
              <label
                htmlFor="time"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Tiempos:
              </label>
              <input
                type="number"
                min={0}
                id="time"
                {...register("time", {
                  required: "Este campo es obligatorio",
                })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <div className="h-2">
                {errors.time && (
                  <span className="text-xs text-red-500">
                    {errors.time.message}
                  </span>
                )}
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="date"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Fecha:
              </label>
              <input
                type="date"
                id="date"
                {...register("date", {
                  required: "Este campo es obligatorio",
                })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <div className="h-2">
                {errors.date && (
                  <span className="text-xs text-red-500">
                    {errors.date.message}
                  </span>
                )}
              </div>
            </div>

            <div className="flex-col items-center h-24">
              <label
                htmlFor=""
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Elige una opción:
              </label>
              <div className="flex  gap-4">
                <div className=" flex items-center">
                  <input
                    className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-green-800 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity hover:bg-green-500 checked:border-green-700 checked:bg-green-500 checked:before:bg-green-500 hover:before:opacity-10"
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
                    className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-green-800 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity hover:bg-green-500 checked:border-green-700 checked:bg-green-500 checked:before:bg-green-500 hover:before:opacity-10"
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

        <div className="mb-4 h-6 font-bold text-blue-700 text-center">
          {errorPermission && <span>{errorPermission}</span>}
        </div>

        <div className=" flex items-center justify-between">
          <button className="w-60  bg-teal-800 hover:bg-teal-600  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Solicitar
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormPermission;

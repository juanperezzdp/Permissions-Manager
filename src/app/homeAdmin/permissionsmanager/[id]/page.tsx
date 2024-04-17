"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import usePermissionFetch from "@/hooks/usePermissionFetch";
import useStore from "@/store/storeGlobals";
import Image from "next/image";
import Illustration from "@/SVG/Illustration(11).svg";

interface Permission {
  _id: string;
  idUser: string;
  name: string;
  doc: number;
  date: string;
  unidad: string;
  time: number;
  description: string;
  status: boolean;
  email: string;
  createdAt: string;
  updatedAt: string;
}

interface PermissionsResponse {
  permissions: Permission[];
  message: string;
}

const UpdateStatusPage = () => {
  const [filteredPermissions, setFilteredPermissions] = useState<Permission[]>(
    []
  );
  const [status, setStatus] = useState<boolean | undefined>(undefined);
  const [Hidden, setHidden] = useState<boolean>(false);
  const [HiddenAccept, setHiddenAccept] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [id, setId] = useState<string>("");
  const { putPermission } = usePermissionFetch();
  const params = useParams();
  const { errorPermission } = useStore();

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get<PermissionsResponse>(
        "http://localhost:3000/api/permission"
      );

      if (params) {
        const userPermissions = response.data.permissions.filter(
          (permission) => permission.idUser === params.id
        );
        setFilteredPermissions(userPermissions);
      }
    } catch (error) {
      console.error(error);
    }
  }, [params]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const onSubmit = async () => {
    await putPermission({
      formData: {
        _id: id as string,
        idUser: params.id as string,
        status: status as boolean,
        email: email as string,
        date: date as string,
        name: name as string,
      },
    });
    setTimeout(() => {
      setHiddenAccept(false);
      fetchData();
    }, 2000);
  };

  return (
    <div>
      <div
        style={{ display: Hidden === true ? "flex" : "none" }}
        className="fixed z-10 bg-opacity-50 bg-black w-full h-[100vh]  justify-center items-center"
      >
        <div className="w-[30rem]  bg-white rounded-lg p-10 animate-zoom-in animate-duration-1000 animate-iteration-count-one">
          <div
            className="cursor-pointer text-2xl absolute top-2 right-5"
            onClick={() => setHidden(false)}
          >
            x
          </div>
          <div className="text-sm mb-4">
            <p className="mb-4">
              Por favor, selecciona una de las siguientes opciones:
            </p>
            <p className="mb-4">
              <span className="font-semibold text-green-700">Aceptar:</span> Si
              estás de acuerdo con la solicitud de permiso laboral, selecciona
              esta opción. Esto indicará que estás aprobando la ausencia del
              empleado durante el período solicitado.
            </p>
            <p className="mb-4">
              <span className="font-semibold text-red-700">Denegar:</span> Si no
              puedes aprobar la solicitud de permiso laboral, selecciona esta
              opción. Esto indicará que la solicitud ha sido rechazada y el
              empleado deberá revisar otras opciones.
            </p>
          </div>
          <div className=" flex gap-4 justify-center items-center">
            <button
              onClick={() => {
                setStatus(true);
                setHidden(false);
                setHiddenAccept(true);
              }}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Aprovado
            </button>
            <button
              onClick={() => {
                setStatus(false);
                setHidden(false);
                setHiddenAccept(true);
              }}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Denegado
            </button>
          </div>
        </div>
      </div>
      <div
        style={{ display: HiddenAccept === true ? "flex" : "none" }}
        className="fixed z-10 bg-opacity-50 bg-black w-full h-[110vh] justify-center items-center"
      >
        <div className="w-[30rem]  bg-white rounded-lg p-10 animate-zoom-in animate-duration-1000 animate-iteration-count-one">
          <div
            className="cursor-pointer text-2xl absolute top-2 right-5"
            onClick={() => setHiddenAccept(false)}
          >
            x
          </div>

          <div className="text-sm">
            <p className="mb-4">
              ¿Estás seguro de que deseas realizar el cambio en el estado de la
              solicitud de permiso?
            </p>
            <p>
              <span className="font-semibold">Nota: </span>Una vez que se toma
              una decisión, no se puede deshacer.
            </p>
          </div>

          <p className="mt-4 h-10 text-center text-green-600">
            {errorPermission}
          </p>
          <div className=" flex justify-center items-center gap-4">
            <button
              onClick={() => {
                onSubmit();
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Aceptar
            </button>
            <button
              onClick={() => {
                setHiddenAccept(false), setHidden(true);
              }}
              className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col px-4 sm:flex-row justify-center items-center">
        <Image
          className="w-[50rem] sm:w-[500px]"
          src={Illustration}
          alt="Team Work Illustration"
        />

        <div className="px-10 text-center text-pretty sm:text-left w-80 animate-fade-in-left animate-duration-1000 animate-iteration-count-one">
          <p className="text-white mb-2 ">
            En este espacio, tendrás la capacidad de aprobar o denegar las
            solicitudes. Recuerda que una vez que hayas marcado como aprobada o
            denegada la solicitud de permiso laboral, ya no podrás cambiar su
            estado.
          </p>
        </div>
      </div>
      <section className="container mb-4 px-4 mx-auto">
        <div className="flex flex-col mt-6">
          <div className="rounded-lg overflow-x-auto ">
            <div className="inline-block min-w-full  align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200  md:rounded-lg">
                <table className="w-full divide-y divide-gray-200 ">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500"
                      >
                        Nombre
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 "
                      >
                        Documento
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 "
                      >
                        Descripción
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 "
                      >
                        Fecha
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 "
                      >
                        Tiempos
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 "
                      >
                        Unidad
                      </th>
                      <th
                        scope="col"
                        className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 "
                      >
                        Estado
                      </th>
                    </tr>
                  </thead>

                  {filteredPermissions.length === 0 ? (
                    <tbody className="sm:w-full bg-white divide-y divide-gray-200">
                      <tr className="cursor-pointer hover:bg-teal-100">
                        <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                          No se encontraron solicitudes
                        </td>
                        <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                          ...
                        </td>
                        <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                          ...
                        </td>
                        <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                          ...
                        </td>
                        <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                          ...
                        </td>
                        <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                          ...
                        </td>
                        <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                          ...
                        </td>
                      </tr>
                    </tbody>
                  ) : (
                    <>
                      {filteredPermissions
                        .slice()
                        .reverse()
                        .map((permission) => (
                          <tbody
                            key={permission._id}
                            className="sm:w-full bg-white divide-y divide-gray-200"
                          >
                            <tr
                              className="cursor-pointer hover:bg-teal-100"
                              onClick={() => {
                                permission.status === null && setHidden(true);
                                setId(permission._id);
                                setEmail(permission.email);
                                setName(permission.name);
                                setDate(permission.date);
                              }}
                            >
                              <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                <h2 className="font-medium text-gray-800  ">
                                  {permission.name}
                                </h2>
                              </td>

                              <td className="px-4 py-4 text-sm whitespace-nowrap">
                                <h2 className="text-gray-700 ">
                                  {permission.doc}
                                </h2>
                              </td>
                              <td className=" sm:w-80 px-4 py-4 text-sm ">
                                <h2 className="flex items-center">
                                  {permission.description}
                                </h2>
                              </td>

                              <td className="px-4 py-4 text-sm whitespace-nowrap">
                                <h2>{permission.date}</h2>
                              </td>
                              <td className="px-4 py-4 text-sm whitespace-nowrap">
                                <h2>{permission.time}</h2>
                              </td>
                              <td className="px-4 py-4 text-sm whitespace-nowrap">
                                <h2>{permission.unidad}</h2>
                              </td>
                              <td className="px-12 py-4 text-sm font-medium whitespace-nowrap">
                                <div>
                                  {(permission.status === null && (
                                    <p className="animate-swing  animate-iteration-count-infinite inline px-3 py-2 text-sm font-normal rounded-full cursor-pointer hover:text-orange-500  hover:bg-orange-100/60 text-orange-700  bg-orange-200/80">
                                      Cambiar el estado de la solicitud
                                    </p>
                                  )) ||
                                    (permission.status === true && (
                                      <p className="inline px-3 py-2 text-sm font-normal rounded-full text-green-600  bg-green-100/60">
                                        Aprovado
                                      </p>
                                    )) ||
                                    (permission.status === false && (
                                      <p className="inline px-3 py-2 text-sm font-normal rounded-full text-red-500  bg-red-100/60">
                                        Denegada
                                      </p>
                                    ))}
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        ))}
                    </>
                  )}
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UpdateStatusPage;

"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import useToken from "@/hooks/useToken";

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
  createdAt: string;
  updatedAt: string;
}

interface PermissionsResponse {
  permissions: Permission[];
  message: string;
}

const TableUser: React.FC = () => {
  const [filteredPermissions, setFilteredPermissions] = useState<Permission[]>(
    []
  );

  const token = useToken();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<PermissionsResponse>(
          "http://localhost:3000/api/permission"
        );

        if (token?.data._id) {
          const userPermissions = response.data.permissions.filter(
            (permission) => permission.idUser === token.data._id
          );
          setFilteredPermissions(userPermissions);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [token]);
  return (
    <>
      <section className="w-full container mx-auto mb-10">
        <div className=" flex flex-col mt-6 shadow-teal-950 shadow-xl">
          <div className=" rounded-lg -my-2 overflow-x-auto ">
            <div className="inline-block min-w-full  align-middle">
              <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                <table className="w-full divide-y divide-gray-200 ">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 "
                      >
                        Empleado
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
                        className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
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
                            <tr className="cursor-pointer hover:bg-teal-100">
                              <td className="px-4 py-4 text-sm whitespace-nowrap">
                                <h2 className="font-medium text-gray-800">
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
                                    <p className="inline px-3 py-2 text-sm font-normal rounded-full text-orange-500  bg-orange-100/60">
                                      En Proceso
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
    </>
  );
};

export default TableUser;

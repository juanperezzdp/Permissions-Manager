"use client";
import React from "react";
import { TableUserProps } from "@/interfaces/interfaces";

const TableUser: React.FC<TableUserProps> = ({ filteredPermissions }) => {
  return (
    <>
      <section className="w-full container mx-auto mb-10">
        <div className="flex flex-col mt-6 shadow-black shadow-xl">
          <div className="rounded-lg -my-2 overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                <table className="w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500"
                      >
                        Empleado
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500"
                      >
                        Documento
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                      >
                        Descripción
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                      >
                        Fecha
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                      >
                        Tiempos
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
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
                      <tr className="cursor-pointer hover:bg-blue-100">
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
                            <tr className="cursor-pointer hover:bg-indigo-200 hover:-translate-y-1 hover:scale-100 duration-150 shadow-slate-600 shadow-2xl">
                              <td className="px-4 py-4 text-sm whitespace-nowrap">
                                <h2>{permission.name}</h2>
                              </td>
                              <td className="px-4 py-4 text-sm whitespace-nowrap">
                                <h2>{permission.doc}</h2>
                              </td>
                              <td className="sm:w-80 px-4 py-4 text-sm">
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
                                  {permission.status === null && (
                                    <p className="inline px-3 py-2 text-sm font-normal rounded-full text-orange-700 bg-orange-300/60">
                                      En Proceso
                                    </p>
                                  )}
                                  {permission.status === true && (
                                    <p className="inline px-3 py-2 text-sm font-normal rounded-full text-green-700 bg-green-300/60">
                                      Aprobado
                                    </p>
                                  )}
                                  {permission.status === false && (
                                    <p className="inline px-3 py-2 text-sm font-normal rounded-full text-red-700 bg-red-300/60">
                                      Denegada
                                    </p>
                                  )}
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

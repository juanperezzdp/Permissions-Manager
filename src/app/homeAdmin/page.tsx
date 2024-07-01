"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useToken from "@/hooks/useToken";
import Image from "next/image";
import IllustrationI from "@/SVG/Illustration(2).svg";
import TableAdmin from "@/components/TableAdmin";
import Radial from "@/components/Radial";
import AreaChartPermissions from "@/components/AreaChartPermissions";
import { Permission, PermissionsResponse } from "@/interfaces/interfaces";
import axios from "axios";

const HomeAdmin: React.FC = () => {
  const [filteredPermissions, setFilteredPermissions] = useState<Permission[]>(
    []
  );
  const navigate = useRouter();
  const token = useToken();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<PermissionsResponse>(
          "/api/permission"
        );
        const permissions = response.data.permissions;

        setFilteredPermissions(permissions);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="px-4">
      <div className="mb-4  flex-col sm:flex sm:flex-row justify-center items-center">
        <Image
          className="sm:w-[20rem] md:w-[30rem] lg:w-[40rem]"
          width={600}
          height={600}
          src={IllustrationI}
          alt="Team Work Illustration"
        />

        <div className="-mt-8 sm:-mt-0 w-full sm:w-[30rem] flex flex-col gap-10 text-white  animate-fade-in-left animate-duration-1000 animate-iteration-count-one">
          <div className="flex flex-col gap-4">
            <div>
              <h2 className="text-2xl mb-4 text-center sm:text-left">
                {`¡Bienvenido, ${
                  token?.data.fullUserName === undefined
                    ? ""
                    : token?.data.fullUserName
                }!`}
              </h2>
              <p className="text-center sm:text-left">
                Estamos encantados de que utilices nuestra aplicación web para
                manejar eficientemente las solicitudes de permisos laborales de
                nuestros valiosos empleados. Estamos comprometidos a
                proporcionarte una plataforma intuitiva y eficaz que simplifique
                este proceso, permitiéndote gestionar las solicitudes de manera
                rápida y precisa, optimizando así la gestión de recursos humanos
                en tu organización.
              </p>
            </div>
            <div className="w-full sm:w-auto py-4 sm:py-0 flex justify-between sm:justify-start items-center gap-6 ">
              <button
                onClick={() => navigate.push("/homeAdmin/permissions")}
                className=" text-white bg-gradient-to-r from-indigo-500 via-indigo-600-600 to-indigo-800 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-indigo-300 dark:focus:ring-indigo-800 shadow-lg shadow-indigo-500/50 dark:shadow-lg dark:shadow-indigo-800/80 font-medium rounded-lg px-5 py-2.5 text-center"
              >
                Crea tu solicitud
              </button>
              <button
                onClick={() => navigate.push("/homeAdmin/register")}
                className="text-white bg-gradient-to-r from-indigo-500 via-indigo-600-600 to-indigo-800 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-indigo-300 dark:focus:ring-indigo-800 shadow-lg shadow-indigo-500/50 dark:shadow-lg dark:shadow-indigo-800/80 font-medium rounded-lg px-5 py-2.5 text-center "
              >
                Agregar nuevo usuario
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-8 ">
        <div className="gap-8 flex flex-col sm:flex-row">
          <Radial permissions={filteredPermissions} />
          <AreaChartPermissions permissions={filteredPermissions} />
        </div>
        <TableAdmin />
      </div>
    </section>
  );
};

export default HomeAdmin;

"use client";
import TableUser from "@/components/TableUser";
import Image from "next/image";
import IllustrationI from "@/SVG/Illustration(18).svg";
import useToken from "@/hooks/useToken";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Permission, PermissionsResponse } from "@/interfaces/interfaces";
import axios from "axios";
import Radial from "@/components/Radial";
import AreaChartPermissions from "@/components/AreaChartPermissions";

const HomeUser = () => {
  const token = useToken();
  const navigation = useRouter();

  const [filteredPermissions, setFilteredPermissions] = useState<Permission[]>(
    []
  );

  console.log(filteredPermissions);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<PermissionsResponse>(
          "/api/permission"
        );
        const permissions = response.data.permissions;

        if (token?.data._id) {
          const userPermissions = permissions.filter(
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
    <section className="m-4">
      <div className="mb-4 w-full flex-col-reverse sm:flex-row p-4 sm:h-[25rem] sm:flex justify-center items-center">
        <div className="flex justify-center">
          <Image
            className="sm:w-[20rem] md:w-[30rem] lg:w-[40rem]"
            src={IllustrationI}
            alt="Team Work Illustration"
          />
        </div>
        <div className="sm:w-[30rem] text-center sm:text-left sm:h-auto flex flex-col gap-10 text-white  animate-fade-in-left animate-duration-1000 animate-iteration-count-one">
          <div>
            <h2 className="text-2xl sm:mb-4 h-16 sm:h-7">
              {`¡Bienvenido, ${
                token?.data.fullUserName === undefined
                  ? ""
                  : token?.data.fullUserName
              }!`}
            </h2>
            <p>
              Estamos encantados de que utilices nuestra aplicación web para
              gestionar tus solicitudes de permisos laborales. Queremos
              recordarte que el proceso de aprobación de tus solicitudes seguirá
              un flujo específico: primero, tu líder de área revisará y aprobará
              tu solicitud, y luego será revisada por el departamento de
              Recursos Humanos para su aprobación final.
            </p>
          </div>
          <div>
            <button
              onClick={() => navigation.push("/homeUser/Permissions")}
              className="sm:min-w-maxtext-white bg-gradient-to-r from-indigo-500 via-indigo-600-600 to-indigo-800 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-indigo-300 dark:focus:ring-indigo-800 shadow-lg shadow-indigo-500/50 dark:shadow-lg dark:shadow-indigo-800/80 font-medium rounded-lg px-5 py-2.5 text-center me-2 mb-2"
            >
              Click aqui para ir al formulario de solicitud
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-8">
        <div className="gap-8 flex flex-col sm:flex-row">
          <Radial permissions={filteredPermissions} />
          <AreaChartPermissions permissions={filteredPermissions} />
        </div>
        <div>
          <TableUser filteredPermissions={filteredPermissions} />
        </div>
      </div>
    </section>
  );
};

export default HomeUser;

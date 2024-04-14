"use client";
import TableUser from "@/components/TableUser";
import Image from "next/image";
import IllustrationI from "@/SVG/Illustration (18).svg";

import useToken from "@/hooks/useToken";
import { useRouter } from "next/navigation";

const HomeUser = () => {
  const token = useToken();
  const navigation = useRouter();

  return (
    <section className="m-4">
      <div className="w-full flex-col-reverse sm:flex-row p-4 sm:h-[25rem] sm:flex justify-center items-center">
        <Image
          className=""
          width={300}
          height={300}
          src={IllustrationI}
          alt="Team Work Illustration"
        />
        <div className="sm:w-[30rem] text-center sm:text-left sm:h-auto flex flex-col gap-10 text-white  animate-fade-in-left animate-duration-1000 animate-iteration-count-one">
          <div>
            <h2 className="text-2xl sm:mb-4 h-20 sm:h-7">
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
              className="sm:min-w-max bg-teal-800 hover:bg-teal-700 border-2 border-teal-800 hover:border-teal-800 hover:border-2 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Click aqui para ir al formulario de solicitud
            </button>
          </div>
        </div>
      </div>
      <TableUser />
    </section>
  );
};

export default HomeUser;

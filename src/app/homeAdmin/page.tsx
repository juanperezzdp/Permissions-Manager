"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useToken from "@/hooks/useToken";
import Image from "next/image";
import IllustrationI from "@/SVG/Illustration(2).svg";

interface User {
  _id: string;
  fullUserName: string;
  doc: number;
  email: string;
  address: string;
  phoneNumber: number;
  workArea: string;
  rol: string;
  createdAt: string;
}

const HomeAdmin: React.FC = () => {
  const [userData, setUserData] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const navigate = useRouter();
  const token = useToken();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/users");
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await res.json();
        setUserData(data.users);
      } catch (error: any) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);

  const filteredUsers = userData.filter(
    (user) =>
      user.fullUserName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.doc.toString().includes(searchTerm)
  );

  const handleNavigate = (data: string) => {
    navigate.push(`/homeAdmin/permissionsmanager/${data}`);
  };

  return (
    <section className="px-4">
      <div className="w-full sm:w-auto py-4 sm:py-0 flex justify-around items-center sm:px-0 sm:absolute sm:top-4 sm:right-4 gap-6 ">
        <button
          onClick={() => navigate.push("/homeAdmin/permissions")}
          className="  bg-teal-800 hover:bg-teal-700 border-2 border-teal-800 hover:border-teal-800 hover:border-2 text-white font-bold p-1 sm:py-2 sm:px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Crea tu solicitud
        </button>
        <button
          onClick={() => navigate.push("/homeAdmin/register")}
          className="  bg-teal-800 hover:bg-teal-700 border-2 border-teal-800 hover:border-teal-800 hover:border-2 text-white font-bold p-1 sm:py-2 sm:px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Agregar nuevo usuario
        </button>
      </div>

      <div className="  flex-col sm:flex sm:flex-row justify-center items-center">
        <Image
          className=""
          width={600}
          height={600}
          src={IllustrationI}
          alt="Team Work Illustration"
        />

        <div className="-mt-8 sm:-mt-0 w-full sm:w-[30rem] flex flex-col gap-10 text-white  animate-fade-in-left animate-duration-1000 animate-iteration-count-one">
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
        </div>
      </div>

      <input
        type="text"
        placeholder="Buscar por nombre o documento"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="shadow-teal-800 shadow-lg focus:border-green-100 focus:outline-none focus:ring focus:ring-green-300 focus:ring-opacity-40 w-full sm:w-[20rem] sm:m-[1rem] p-2 border border-gray-300 rounded-lg"
      />

      <div className="container px-4 mx-auto mb-10">
        <div className="flex flex-col mt-6 shadow-teal-950 shadow-xl">
          <div className="rounded-lg -mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full  align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                <table className="w-full divide-y divide-gray-200 ">
                  <thead className="bg-gray-50 ">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 "
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
                        Dirección
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 "
                      >
                        Correo
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 "
                      >
                        Celular
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 "
                      >
                        Área
                      </th>
                      <th
                        scope="col"
                        className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 "
                      >
                        rol
                      </th>
                    </tr>
                  </thead>
                  {filteredUsers.map((dataUser) => (
                    <tbody
                      key={dataUser._id}
                      className="sm:w-full bg-white divide-y divide-gray-20"
                    >
                      <tr
                        className="cursor-pointer hover:bg-teal-100"
                        onClick={() => {
                          handleNavigate(dataUser._id);
                        }}
                      >
                        <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                          <h2 className="font-medium text-gray-800 ">
                            {dataUser.fullUserName}
                          </h2>
                        </td>

                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          <h2 className="text-gray-700 ">{dataUser.doc}</h2>
                        </td>
                        <td className=" sm:w-80 px-4 py-4 text-sm ">
                          <h2 className="flex items-center">
                            {dataUser.address}
                          </h2>
                        </td>

                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          <h2>{dataUser.email}</h2>
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          <h2>{dataUser.phoneNumber}</h2>
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          <h2>{dataUser.workArea}</h2>
                        </td>
                        <td className="px-12 py-4 text-sm font-medium whitespace-nowrap">
                          <h2>{dataUser.rol}</h2>
                        </td>
                      </tr>
                    </tbody>
                  ))}
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeAdmin;

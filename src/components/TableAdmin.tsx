import { User } from "@/interfaces/interfaces";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";

const TableAdmin: React.FC = () => {
  const [userData, setUserData] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const navigate = useRouter();

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

  useEffect(() => {
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
    <div>
      <div className=" w-full sm:w-80 flex items-center relative ">
        <input
          type="text"
          placeholder="Buscar por nombre o documento"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-80 pr-8 focus:border-l-2 focus:border-r-2 focus:border-t-2 focus:border-b-2 focus:border-white  placeholder:text-white bg-transparent p-2 border-l-2 border-r-2 border-t-2 border-b-2 border-white text-white rounded-lg"
        />
        <IoSearchSharp className=" absolute right-0 mr-2 text-white text-2xl" />
      </div>

      <div className="container px-4 sm:px-0 mb-10">
        <div className="flex flex-col mt-6 shadow-xl shadow-black">
          <div className="rounded-lg -mx-4 -my-2 overflow-x-auto px-0 sm:px-4 ">
            <div className="inline-block min-w-full  align-middle">
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
                  {filteredUsers.length === 0 ? (
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
                      {filteredUsers.map((dataUser) => (
                        <tbody
                          key={dataUser._id}
                          className="sm:w-full bg-white divide-y divide-gray-20"
                        >
                          <tr
                            className="cursor-pointer hover:bg-violet-200 hover:-translate-y-1 hover:scale-100  duration-150 shadow-slate-600 shadow-2xl"
                            onClick={() => {
                              handleNavigate(dataUser._id);
                            }}
                          >
                            <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                              <h2>{dataUser.fullUserName}</h2>
                            </td>

                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                              <h2>{dataUser.doc}</h2>
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
                    </>
                  )}
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableAdmin;

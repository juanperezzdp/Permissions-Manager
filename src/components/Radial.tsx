"use client";
import React, { useEffect, useState } from "react";
import { ProgressCircle } from "@tremor/react";
import { RadialProps } from "@/interfaces/interfaces";

const Radial: React.FC<RadialProps> = ({ permissions }) => {
  const [statusCounts, setStatusCounts] = useState({
    true: 0,
    false: 0,
    null: 0,
  });

  useEffect(() => {
    const currentYear = new Date().getFullYear();

    const currentYearPermissions = permissions.filter((permission) => {
      const permissionYear = new Date(permission.date).getFullYear();
      return permissionYear === currentYear;
    });

    const counts = currentYearPermissions.reduce(
      (acc, permission) => {
        if (permission.status === true) {
          acc.true += 1;
        } else if (permission.status === false) {
          acc.false += 1;
        } else {
          acc.null += 1;
        }
        return acc;
      },
      { true: 0, false: 0, null: 0 }
    );

    setStatusCounts(counts);
  }, [permissions]);

  return (
    <div className="shadow-lg shadow-black p-4  relative flex items-center justify-center h-[24rem] w-full sm:w-[30rem] bg-white rounded-lg">
      <div className="absolute top-4 font-semibold  sm:text-lg">
        <h2>Estados de las solicitudes</h2>
      </div>

      <div className="flex items-center justify-center">
        <ProgressCircle
          className="absolute cursor-pointer"
          value={Math.min(statusCounts.true, 100)}
          radius={120}
          strokeWidth={20}
          tooltip={"Aprovadas"}
          color={"green"}
        />

        <ProgressCircle
          className="absolute cursor-pointer "
          value={Math.min(statusCounts.false, 100)}
          radius={95}
          strokeWidth={20}
          tooltip={"Denegadas"}
          color={"red"}
        />

        <ProgressCircle
          className="absolute cursor-pointer"
          value={Math.min(statusCounts.null, 100)}
          radius={70}
          strokeWidth={20}
          tooltip={"En proceso"}
          color={"orange"}
        />
      </div>

      <div className="absolute bottom-4 flex gap-1 sm:gap-1">
        <div className="flex justify-center items-center text-[0.7rem] w-24 rounded-full text-green-700  bg-green-300/60">
          <span className="text-green-700 text-3xl">•</span>
          Aprovado {statusCounts.true}
        </div>
        <div className="flex justify-center items-center text-[0.7rem]  w-24 rounded-full text-red-700  bg-red-300/60">
          <span className="text-red-700  text-3xl">•</span>Denegada{" "}
          {statusCounts.false}
        </div>
        <div className="flex justify-center items-center text-[0.7rem] w-24 rounded-full text-orange-700  bg-orange-300/60">
          <span className="text-orange-700  text-3xl">•</span>En Proceso{" "}
          {statusCounts.null}
        </div>
      </div>
    </div>
  );
};

export default Radial;

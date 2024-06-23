import React from "react";
import { LineChart } from "@tremor/react";
import { RadialProps, Permission } from "@/interfaces/interfaces";

const AreaChartPermissions: React.FC<RadialProps> = ({ permissions }) => {
  const currentYear = new Date().getFullYear();

  const permissionsByMonth: { [month: string]: number } = {};
  permissions.forEach((permission: Permission) => {
    const createdAtDate = new Date(permission.createdAt);
    const createdAtMonth = createdAtDate.toLocaleString("en-US", {
      month: "short",
    });
    const createdAtYear = createdAtDate.getFullYear();

    if (createdAtYear === currentYear) {
      const key = createdAtMonth;
      if (permissionsByMonth[key]) {
        permissionsByMonth[key]++;
      } else {
        permissionsByMonth[key] = 1;
      }
    }
  });

  const chartData = Object.keys(permissionsByMonth).map((key) => ({
    date: key,
    [currentYear]: permissionsByMonth[key],
  }));

  return (
    <div className="w-full h-[24rem] bg-white p-4 rounded-lg shadow-black shadow-lg">
      <h3 className="text-lg font-medium">{`Gráficos de solicitudes realizadas en el años ${currentYear}`}</h3>

      <LineChart
        className="mt-4 h-72"
        data={chartData}
        index="date"
        categories={[currentYear.toString()]}
        colors={["green"]}
        yAxisWidth={30}
        connectNulls={true}
      />
    </div>
  );
};

export default AreaChartPermissions;

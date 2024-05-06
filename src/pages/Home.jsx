import BasicTable from "@/components/BasicTable";
import { Button } from "@/components/ui/button";
import { pendingFeeColumns } from "@/utils/columns/pendingFee";
import { dashboardQuery } from "@/utils/queries/dashboard";
import { useQuery } from "@tanstack/react-query";
import jsPDF from "jspdf";
import React from "react";
import "jspdf-autotable";
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { PrinterIcon } from "lucide-react";
const Home = () => {
  const { data, error, isLoadingError, isLoading } = useQuery({
    queryKey: ["home"],
    queryFn: dashboardQuery,
    select: (data) => data.data.data,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isLoadingError || error) {
    return <div>Error: {error?.message}</div>;
  }
  return (
    <div>
      <div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-8">
              Sum of Total Fee Amount by Month
            </h2>
            <ResponsiveContainer width="100%" height={400}>
              <ComposedChart
                width={500}
                height={400}
                data={data?.feeSum}
                margin={{
                  top: 20,
                  right: 20,
                  bottom: 20,
                  left: 20,
                }}
              >
                <CartesianGrid stroke="#f5f5f5" />
                <XAxis dataKey="month" scale="band" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="_sum.amount"
                  name={"Total Amount"}
                  barSize={20}
                  fill="#01aac1"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-8">
              Sum of Total Expanses Amount by Month
            </h2>
            <ResponsiveContainer width="100%" height={400}>
              <ComposedChart
                width={500}
                height={400}
                data={data?.inventorySum}
                margin={{
                  top: 20,
                  right: 20,
                  bottom: 20,
                  left: 20,
                }}
              >
                <CartesianGrid stroke="#f5f5f5" />
                <XAxis dataKey="month" scale="band" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="total_price"
                  name={"Total Amount"}
                  barSize={20}
                  fill="#01aac1"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className="my-4">
        <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
            <dt className="truncate text-sm font-medium text-gray-500">
              No. of Users
            </dt>
            <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
              {data?.users}
            </dd>
          </div>
          <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
            <dt className="truncate text-sm font-medium text-gray-500">
              No. of Rooms
            </dt>
            <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
              {data?.rooms}
            </dd>
          </div>
          <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
            <dt className="truncate text-sm font-medium text-gray-500">
              No. of Pending Complaints
            </dt>
            <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
              {data?.complaints}
            </dd>
          </div>
        </dl>
      </div>
      <div className="block max-w-max mr-0 ml-auto my-8">
        <Button
          onClick={() => {
            const unit = "pt";
            const size = "A4"; // Use A1, A2, A3 or A4
            const orientation = "portrait"; // portrait or landscape

            const marginLeft = 40;
            const doc = new jsPDF(orientation, unit, size);

            doc.setFontSize(15);

            const title = "Pending Fees Report";
            const headers = [
              [
                "NAME",
                "FATHER NAME",
                "ROOM NUMBER",
                "PHONE",
                "MONTH STARTS FROM",
              ],
            ];

            const body = data?.pendingFees.map((row) => [
              row.name,
              row.profile.fatherName,
              row.room.roomNumber,
              row.profile.phone,
              new Date(row.createdAt).toDateString(),
            ]);

            let content = {
              startY: 50,
              head: headers,
              body: body,
            };

            doc.text(title, marginLeft, 40);
            doc.autoTable(content);
            doc.save("Pending Fees Report.pdf");
          }}
          variant="outline"
          className="max-w-max mx-auto"
        >
          <PrinterIcon className="w-4 h-4 mr-2" />
          Export
        </Button>
      </div>
      {data?.pendingFees && (
        <BasicTable data={data?.pendingFees} columns={pendingFeeColumns} />
      )}
    </div>
  );
};

export default Home;

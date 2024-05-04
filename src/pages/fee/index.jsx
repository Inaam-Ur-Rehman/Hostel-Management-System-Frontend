import BasicTable from "@/components/BasicTable";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import api from "@/http/api";
import { feeColumns } from "@/utils/columns/fee";
import { useQuery } from "@tanstack/react-query";
import { PencilIcon, PlusIcon } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const Fee = () => {
  const { data, error, isError, isLoadingError, isLoading } = useQuery({
    queryKey: ["fee"],
    queryFn: () => api.get("/fee"),
    select: (data) => data.data.data,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError || isLoadingError) {
    return <p>Error: {error?.message}</p>;
  }
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Fees</CardTitle>
            <CardDescription className="mt-2">
              List of all Fees in the system.
            </CardDescription>
          </div>
          <Link to="/fee/create">
            <Button variant="outline">
              <PlusIcon className="mr-2 h-4 w-4" />
              Add Fee
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <BasicTable data={data} columns={feeColumns} />
      </CardContent>
    </Card>
  );
};

export default Fee;

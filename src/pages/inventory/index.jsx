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
import { inventoryColumns } from "@/utils/columns/inventory";
import { useQuery } from "@tanstack/react-query";
import { PlusIcon } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const Inventory = () => {
  const { data, isLoading, isError, isLoadingError, error } = useQuery({
    queryKey: ["inventory"],
    queryFn: () => api.get("/inventory"),
    select: (data) => data.data.data,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isLoadingError || isError) {
    return <div>Error: {error}</div>;
  }
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-6">
          <div>
            <CardTitle>Inventory</CardTitle>
            <CardDescription className="mt-2">
              View inventory list in the system.
            </CardDescription>
          </div>
          <Link to="/inventory/create">
            <Button variant="outline">
              <PlusIcon className="mr-2 h-4 w-4" />
              Add Inventory
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <BasicTable data={data} columns={inventoryColumns} />
      </CardContent>
    </Card>
  );
};

export default Inventory;

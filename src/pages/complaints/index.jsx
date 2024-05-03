import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import api from "@/http/api";
import { useQuery } from "@tanstack/react-query";
import { createColumnHelper } from "@tanstack/react-table";
import React from "react";

const columnHelper = createColumnHelper();

const Complaints = () => {
  const {} = useQuery({
    queryKey: "complaints",
    queryFn: () => api.get("/complaints"),
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
        <CardTitle>Complaints</CardTitle>
        <CardDescription>List of all Complaints in the system.</CardDescription>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
};

export default Complaints;

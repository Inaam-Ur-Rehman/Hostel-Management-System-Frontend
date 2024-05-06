import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import api from "@/http/api";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { createColumnHelper } from "@tanstack/react-table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import BasicTable from "@/components/BasicTable";

const columnHelper = createColumnHelper();

const UsersRequests = () => {
  const columns = React.useMemo(() => [
    columnHelper.accessor("user.name", {
      cell: (info) => info.getValue(),
      header: "User Name",
    }),
    columnHelper.accessor("user.profile.phone", {
      cell: (info) => info.getValue(),
      header: "Phone",
    }),
    columnHelper.accessor("user.room.roomNumber", {
      cell: (info) => info.getValue(),
      enableGlobalFilter: true,
      header: "Room Number",
    }),
    columnHelper.accessor("type", {
      cell: (info) => info.getValue(),
      header: "Type",
    }),
    columnHelper.accessor("status", {
      cell: (info) => (
        <Badge
          className={`${
            info.getValue() === "PENDING"
              ? "bg-red-500"
              : info.getValue() === "ASSIGNED"
              ? "bg-yellow-500"
              : "bg-green-500"
          } hover:bg-theme-green cursor-pointer`}
        >
          {info.getValue()}
        </Badge>
      ),
      header: "Status",
    }),
    columnHelper.display({
      id: "actions",
      cell: (info) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              <Link to={`/user-requests/view/${info.row.original.id}`}>
                View
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    }),
  ]);

  const { data, error, isLoading, isLoadingError, isError } = useQuery({
    queryKey: ["user-requests"],
    queryFn: () => api.get("/user-requests"),
    select: (data) => data.data.data,
    refetchInterval: 60000, // 1 minute
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
        <CardTitle>View User Request</CardTitle>
        <CardDescription>
          List of all user requests will be displayed here.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <BasicTable columns={columns} data={data} />
      </CardContent>
    </Card>
  );
};

export default UsersRequests;

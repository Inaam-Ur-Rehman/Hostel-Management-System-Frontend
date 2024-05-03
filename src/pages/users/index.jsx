import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MoreHorizontal, PlusIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import api from "@/http/api";
import { toast } from "react-toastify";
import { queryClient } from "@/App";
import { Link } from "react-router-dom";
import { createColumnHelper } from "@tanstack/react-table";
import BasicTable from "@/components/BasicTable";

const columnHelper = createColumnHelper();
const Users = () => {
  const columns = React.useMemo(() => [
    columnHelper.accessor("profile.image", {
      cell: (info) => {
        return (
          <img
            alt="Product img"
            className="aspect-square rounded-md object-cover"
            height="64"
            src={info.getValue()}
            width="64"
          />
        );
      },
      header: "Image",
    }),
    columnHelper.accessor("name", {
      cell: (info) => info.getValue(),
      header: "Name",
    }),
    columnHelper.accessor("profile.phone", {
      cell: (info) => info.getValue(),
      header: "Phone",
    }),
    columnHelper.accessor("room.roomNumber", {
      cell: (info) => info.getValue(),
      header: "Room Number",
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
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            {!info?.row?.original?.profile && (
              <DropdownMenuItem>
                <Link
                  to={`/profile/create/${info?.row?.original?.id}`}
                  className="w-full"
                >
                  Create Profile
                </Link>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem>
              <Link
                to={`/users/view/${info?.row?.original?.id}`}
                className="w-full"
              >
                View
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                to={`/users/edit/${info?.row?.original?.id}`}
                className="w-full"
              >
                Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                // confirmation dialog
                const confirmation = window.confirm(
                  "Are you sure to delete user?"
                );

                if (!confirmation) return;

                // delete

                if (info?.profile) {
                  api
                    .delete(`/profile/${info?.row?.original?.profile?.id}`)
                    .then((res) => {
                      api
                        .delete(`/users/${info?.row?.original?.id}`)
                        .then((res) => {
                          toast.success("User deleted");
                          queryClient.invalidateQueries({
                            queryKey: ["users"],
                          });
                        })
                        .catch((err) => {
                          toast.error(
                            err?.response?.data?.message ||
                              "Error while deleting user"
                          );
                        });
                    })
                    .catch((err) => {
                      toast.error(
                        err?.response?.data?.message ||
                          "Failed to delete user profile"
                      );
                    });
                } else {
                  api
                    .delete(`/users/${info?.row?.original?.id}`)
                    .then((res) => {
                      toast.success("User deleted");
                      queryClient.invalidateQueries({
                        queryKey: ["users"],
                      });
                    })
                    .catch((err) => {
                      toast.error(
                        err?.response?.data?.message || "Failed to delete user"
                      );
                    });
                }
              }}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    }),
  ]);
  const { data, isError, isLoading, isLoadingError } = useQuery({
    queryKey: ["users"],
    queryFn: () => api.get("/users"),
    select: (data) => data.data.data,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || isLoadingError) {
    return <div>Error</div>;
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-8">
            <div>
              <CardTitle>Users</CardTitle>
              <CardDescription>Manage your users here.</CardDescription>
            </div>
            <Link to="/users/create">
              <Button variant="outline">
                <PlusIcon className="mr-2 h-4 w-4" />
                Add User
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <BasicTable data={data} columns={columns} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Users;

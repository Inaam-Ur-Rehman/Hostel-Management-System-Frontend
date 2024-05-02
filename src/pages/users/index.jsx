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

const Users = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: () => api.get("/users"),
    select: (data) => data.data,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                  <span className="sr-only">User Image</span>
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Room Number</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.data?.map((user) => {
                return (
                  <TableRow key={user?.id}>
                    <TableCell className="hidden sm:table-cell">
                      <img
                        alt="Product img"
                        className="aspect-square rounded-md object-cover"
                        height="64"
                        src={user.profile?.image}
                        width="64"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{user?.name}</TableCell>
                    <TableCell>
                      {user?.profile?.phone || (
                        <Badge variant="outline">No Phone</Badge>
                      )}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {user?.room?.roomNumber || (
                        <Badge variant="outline">No Room assigned</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            aria-haspopup="true"
                            size="icon"
                            variant="ghost"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          {!user?.profile && (
                            <DropdownMenuItem>
                              <Link
                                to={`/profile/create/${user.id}`}
                                className="w-full"
                              >
                                Create Profile
                              </Link>
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem>
                            <Link
                              to={`/users/view/${user.id}`}
                              className="w-full"
                            >
                              View
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Link
                              to={`/users/edit/${user.id}`}
                              className="w-full"
                            >
                              Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              // confirmation dialog
                              const confirmation =
                                window.confirm("Are you sure?");

                              if (!confirmation) return;

                              // delete
                              api
                                .delete(`/users/${user.id}`)
                                .then((res) => {
                                  toast.success("User deleted");
                                  queryClient.invalidateQueries({
                                    queryKey: ["users"],
                                  });
                                })
                                .catch((err) => {
                                  toast.error("Failed to delete user", {
                                    position: "top-right",
                                    autoClose: 3000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                  });
                                });
                            }}
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Users;

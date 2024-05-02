import { queryClient } from "@/App";
import { Button } from "@/components/ui/button";
import api from "@/http/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ReloadIcon } from "@radix-ui/react-icons";
import { TrashIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ViewRoom = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: () => api.delete(`/rooms/${id}`),
    onSuccess: () => {
      toast.success("Room deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
      navigate("/rooms", { replace: true });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || error.message);
    },
  });
  const { data, error, isLoading, isLoadingError } = useQuery({
    queryKey: [`room-${id}`],
    queryFn: () => api.get(`/rooms/${id}`),
    select: (data) => data.data.data,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isLoadingError || error) {
    return <div>Error</div>;
  }

  return (
    <div>
      <h1 className="text-3xl mb-4 font-bold">Room View</h1>
      <h2 className="text-2xl">
        Room Number: <span className="font-bold">{data?.roomNumber}</span>
      </h2>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">
            No. of Users
          </dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
            {data?.users?.length}
          </dd>
        </div>
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">
            Total Capacity
          </dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
            {data?.capacity}
          </dd>
        </div>
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">
            Available Capacity
          </dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
            {Number(data?.capacity) - Number(data?.users?.length)}
          </dd>
        </div>
      </dl>
      <Card className="mt-8">
        {data?.users?.length > 0 && (
          <>
            <CardHeader>
              <CardTitle>Users</CardTitle>
              <CardDescription>List of users in this room</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {data?.users?.map((user) => (
                  <Card>
                    <CardHeader>
                      <CardTitle>{user.name}</CardTitle>
                      <CardDescription>
                        <div className="flex flex-col gap-2 mt-2">
                          <p>
                            <span className="font-bold">Email:</span>{" "}
                            {user.email}
                          </p>
                          <p>
                            <span className="font-bold">Phone: </span>{" "}
                            {user?.profile?.phone || "N/A"}
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          className="mt-4"
                          onClick={() => navigate(`/users/view/${user.id}`)}
                        >
                          View Profile
                        </Button>
                      </CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </CardContent>
          </>
        )}
        <CardFooter>
          <Button
            onClick={() => mutation.mutate()}
            disabled={mutation.isPending}
            loading={mutation.isPending}
            variant="destructive"
            className="mt-4"
          >
            {mutation.status === "pending" && (
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            )}
            <TrashIcon className="mr-2 h-4 w-4" />
            Delete Room
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ViewRoom;

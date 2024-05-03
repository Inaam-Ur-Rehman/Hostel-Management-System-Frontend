import UpdateUserRequest from "@/components/UpdateRequest";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import api from "@/http/api";
import { useQuery } from "@tanstack/react-query";
import { PencilIcon } from "lucide-react";
import React from "react";
import { Link, useParams } from "react-router-dom";

const ViewUserRequest = () => {
  const { id } = useParams();
  const { data, isLoading, error, isLoadingError, isError } = useQuery({
    queryKey: [`user-request-${id}`],
    queryFn: () => api.get(`/user-requests/${id}`),
    select: (data) => data.data.data,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isLoadingError || isError) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>View User Request</CardTitle>
        <CardDescription>
          You can see the content of the user request here.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <h2 className="text-lg border  p-2 rounded-md">{data?.user?.name}</h2>
        <p className="text-lg border  p-2 rounded-md">{data?.user?.email}</p>
        <p className="text-lg border  p-2 rounded-md py-4">{data?.message}</p>
        <p className="text-lg border  p-2 rounded-md">{data?.status}</p>
        <p className="text-lg border  p-2 rounded-md">
          {new Date(data?.createdAt)
            .toISOString()
            .replace(/T/, " ")
            .replace(/\..+/, "")}
        </p>
        <p className="text-lg border  p-2 rounded-md">{data?.type}</p>
        <p className="text-lg border  p-2 rounded-md">
          Room No. {data?.user?.room?.roomNumber}
        </p>
        <p className="text-lg border  p-2 rounded-md">
          Floor No. {data?.user?.room?.floor}
        </p>
      </CardContent>
      <CardFooter>
        <UpdateUserRequest userRequest={data} />
      </CardFooter>
    </Card>
  );
};

export default ViewUserRequest;

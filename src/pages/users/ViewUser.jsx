import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import api from "@/http/api";
import { useQuery } from "@tanstack/react-query";
import { PencilIcon } from "lucide-react";
import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const ViewUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, error, isLoading, isLoadingError } = useQuery({
    queryKey: [`user-${id}`],
    queryFn: () => api.get(`/users/user/${id}`),
    select: (data) => data.data.data,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isLoadingError || error) {
    return navigate("/users", { replace: true });
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-4">
          <div>
            <CardTitle>View User</CardTitle>
            <CardDescription>View User Details</CardDescription>
          </div>
          <Link to={`/users/edit/${data?.id}`}>
            <Button variant="outline">
              <PencilIcon className="w-4 h-4 mr-2" />
              Edit
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <Card>
            <CardHeader>
              <CardTitle>User Details</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                <dt className="truncate text-sm font-medium text-gray-500">
                  Name
                </dt>
                <dd className="mt-1 text-xl font-semibold tracking-tight text-gray-900">
                  {data?.name}
                </dd>
              </div>
              <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                <dt className="truncate text-sm font-medium text-gray-500">
                  Email
                </dt>
                <dd className="mt-1 text-xl font-semibold tracking-tight text-gray-900">
                  {data?.email}
                </dd>
              </div>
              <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                <dt className="truncate text-sm font-medium text-gray-500">
                  Phone
                </dt>
                <dd className="mt-1 text-xl font-semibold tracking-tight text-gray-900">
                  {data?.profile?.phone}
                </dd>
              </div>
              <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                <dt className="truncate text-sm font-medium text-gray-500">
                  Address
                </dt>
                <dd className="mt-1 text-xl font-semibold tracking-tight text-gray-900">
                  {data?.profile?.address}
                </dd>
              </div>
              <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                <dt className="truncate text-sm font-medium text-gray-500">
                  Emergency Contact
                </dt>
                <dd className="mt-1 text-xl font-semibold tracking-tight text-gray-900">
                  {data?.profile?.emergencyContact}
                </dd>
              </div>
              <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                <dt className="truncate text-sm font-medium text-gray-500">
                  Blood Group
                </dt>
                <dd className="mt-1 text-xl font-semibold tracking-tight text-gray-900">
                  {data?.profile?.bloodGroup}
                </dd>
              </div>
              <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                <dt className="truncate text-sm font-medium text-gray-500">
                  CNIC No.
                </dt>
                <dd className="mt-1 text-xl font-semibold tracking-tight text-gray-900">
                  {data?.profile?.cnic}
                </dd>
              </div>
              <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                <dt className="truncate text-sm font-medium text-gray-500">
                  Father Name
                </dt>
                <dd className="mt-1 text-xl font-semibold tracking-tight text-gray-900">
                  {data?.profile?.fatherName}
                </dd>
              </div>
              <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                <dt className="truncate text-sm font-medium text-gray-500">
                  User Type
                </dt>
                <dd className="mt-1 text-xl font-semibold tracking-tight text-gray-900">
                  {data?.profile?.userType}
                </dd>
              </div>
              <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                <dt className="truncate text-sm font-medium text-gray-500">
                  Joining Date
                </dt>
                <dd className="mt-1 text-xl font-semibold tracking-tight text-gray-900">
                  {new Date(data?.createdAt).toDateString({
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </dd>
              </div>
              <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                <dt className="truncate text-sm font-medium text-gray-500">
                  Role
                </dt>
                <dd className="mt-1 text-xl font-semibold tracking-tight text-gray-900">
                  {data?.role}
                </dd>
              </div>
            </CardContent>
          </Card>
          {data?.roomId && (
            <Card>
              <CardHeader>
                <CardTitle>Room Details</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                  <dt className="truncate text-sm font-medium text-gray-500">
                    Room Number
                  </dt>
                  <dd className="mt-1 text-xl font-semibold tracking-tight text-gray-900">
                    {data?.room?.roomNumber}
                  </dd>
                </div>
                <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                  <dt className="truncate text-sm font-medium text-gray-500">
                    Floor
                  </dt>
                  <dd className="mt-1 text-xl font-semibold tracking-tight text-gray-900">
                    {data?.room?.floor}
                  </dd>
                </div>
                <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                  <dt className="truncate text-sm font-medium text-gray-500">
                    Capacity
                  </dt>
                  <dd className="mt-1 text-xl font-semibold tracking-tight text-gray-900">
                    {data?.room?.capacity}
                  </dd>
                </div>
              </CardContent>
            </Card>
          )}
          <Card>
            <CardHeader>
              <CardTitle>Attachments</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-4">
              <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                <dt className="truncate text-sm font-medium text-gray-500 mb-4">
                  Profile Image
                </dt>
                <dd className="mt-1 text-xl font-semibold tracking-tight text-gray-900">
                  <img
                    src={data?.profile?.image}
                    alt="Profile Image"
                    className="w-44 h-44 object-cover rounded-full"
                  />
                </dd>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                  <dt className="truncate text-sm font-medium text-gray-500 mb-4">
                    CNIC Front
                  </dt>
                  <dd className="mt-1 text-xl font-semibold tracking-tight text-gray-900">
                    <img
                      src={data?.profile?.cnicFront}
                      alt="Profile Image"
                      className="max-w-72 w-full h-54 object-cover"
                    />
                  </dd>
                </div>
                <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                  <dt className="truncate text-sm font-medium text-gray-500 mb-4">
                    CNIC Back
                  </dt>
                  <dd className="mt-1 text-xl font-semibold tracking-tight text-gray-900">
                    <img
                      src={data?.profile?.cnicBack}
                      alt="Profile Image"
                      className="max-w-72 w-full h-54 object-cover"
                    />
                  </dd>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

export default ViewUser;

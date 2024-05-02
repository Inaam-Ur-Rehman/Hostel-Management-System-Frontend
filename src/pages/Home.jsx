import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store";
import { dashboardQuery } from "@/utils/queries/dashboard";
import { useQuery } from "@tanstack/react-query";
import React from "react";
const Home = () => {
  const { data, error, isLoadingError, isLoading } = useQuery({
    queryKey: ["home"],
    queryFn: dashboardQuery,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isLoadingError || error) {
    return <div>Error</div>;
  }

  const {
    data: {
      data: { users, rooms },
    },
  } = data;

  return (
    <div>
      <div>
        <div className="my-4">
          <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
            <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
              <dt className="truncate text-sm font-medium text-gray-500">
                No. of Users
              </dt>
              <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                {users}
              </dd>
            </div>
            <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
              <dt className="truncate text-sm font-medium text-gray-500">
                No. of Rooms
              </dt>
              <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                {rooms}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Home;

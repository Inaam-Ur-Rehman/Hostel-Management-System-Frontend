import { queryClient } from "@/App";
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
import { useMutation, useQuery } from "@tanstack/react-query";
import { EyeIcon, PencilIcon, PlusIcon, TrashIcon } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Menu = () => {
  const { data, isLoading, isLoadingError, error } = useQuery({
    queryKey: ["menu"],
    queryFn: () => api.get("/menu"),
    select: (data) => data.data.data,
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => api.delete(`/menu/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["menu"] });
      toast.success("Menu deleted successfully");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || error.message);
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isLoadingError || error) {
    return <div>Error: {error?.message}</div>;
  }
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center gap-6">
          <div>
            <CardTitle className="mb-2">Menu</CardTitle>
            <CardDescription>List of all available menus</CardDescription>
          </div>
          <Link to="/menu/create">
            <Button variant="outline">
              <PlusIcon className="w-4 h-4 mr-2" />
              Add Menu
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {data?.map((menu) => (
          <Card key={menu.id}>
            <CardHeader>
              <CardTitle className="capitalize">
                {menu.day?.toLowerCase()}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                <span className="font-bold">Breakfast:</span> {menu.breakfast}
              </p>
              <p>
                <span className="font-bold">Lunch:</span> {menu.lunch}
              </p>
              <p>
                <span className="font-bold">Dinner:</span> {menu.dinner}
              </p>
            </CardContent>
            <CardFooter className="space-x-2">
              <Link to={`/menu/edit/${menu.id}`}>
                <Button variant="outline">
                  <PencilIcon className="w-4 h-4 mr-2" />
                  Edit Menu
                </Button>
              </Link>
              <Button
                variant="outline"
                onClick={() => {
                  const confirmation = confirm(
                    "Are you sure you want to delete this menu?"
                  );
                  if (confirmation) {
                    deleteMutation.mutate(menu.id);
                  }
                  return;
                }}
              >
                <TrashIcon className="w-4 h-4 mr-2" />
                Delete Menu
              </Button>
            </CardFooter>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
};

export default Menu;

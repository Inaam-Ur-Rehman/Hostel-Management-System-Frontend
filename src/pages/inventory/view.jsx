import { queryClient } from "@/App";
import UpdateInventoryForm from "@/components/UpdateInventoryForm";
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
import { TrashIcon } from "lucide-react";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ViewInventory = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const deleteMutation = useMutation({
    mutationFn: (id) => api.delete(`/inventory/${id}`),
    onSuccess: () => {
      toast.success("Inventory deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["inventory"] });
      navigate("/inventory", { replace: true });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || error.message);
    },
  });
  const { data, isLoading, error, isLoadingError, isError } = useQuery({
    queryKey: [`inventory-${id}`],
    queryFn: () => api.get(`/inventory/${id}`),
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
        <h2 className="text-lg border  p-2 rounded-md">{data?.item}</h2>
        <p className="text-lg border  p-2 rounded-md">
          {data?.quantity} {data?.unit}
        </p>
        <p className="text-lg border  p-2 rounded-md py-4">{data?.price}</p>
        <p className="text-lg border  p-2 rounded-md py-4">
          {data?.note ? data?.note : "Note is empty."}
        </p>
        <p className="text-lg border  p-2 rounded-md">
          {new Date(data?.createdAt)
            .toISOString()
            .replace(/T/, " ")
            .replace(/\..+/, "")}
        </p>
      </CardContent>
      <CardFooter className="flex items-center gap-2">
        <UpdateInventoryForm item={data} />
        <Button
          variant="outline"
          onClick={() => {
            const confirmation = window.confirm(
              "Are you sure you want to delete this item?"
            );
            if (confirmation) {
              deleteMutation.mutate(id);
            }
          }}
        >
          <TrashIcon className="w-4 h-4 mr-2" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ViewInventory;

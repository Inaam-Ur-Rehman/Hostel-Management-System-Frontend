import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "./ui/button";
import { useMutation, useQuery } from "@tanstack/react-query";
import api from "@/http/api";
import { toast } from "react-toastify";
import { queryClient } from "@/App";
import { PencilIcon } from "lucide-react";
import { updateUserRequestValidationSchema } from "@/validations/userRequest.validation.js";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useNavigate } from "react-router-dom";

const UpdateUserRequest = ({ userRequest }) => {
  const navigate = useNavigate();
  const ref = React.useRef();
  if (!userRequest) return null;
  const mutation = useMutation({
    mutationKey: [`user-request-${userRequest?.id}`],
    mutationFn: (data) =>
      api.put(`/user-requests/status/${userRequest?.id}`, data),
    onSuccess: () => {
      toast.success("Request status updated successfully");
      form.reset();
      ref.current?.click();
      queryClient.invalidateQueries({ queryKey: ["user-requests"] });
      navigate("/user-requests", { replace: true });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || error.message);
    },
  });

  const onSubmit = async (data) => {
    mutation.mutate(data);
  };

  const form = useForm({
    resolver: zodResolver(updateUserRequestValidationSchema),
    defaultValues: {
      status: "",
    },
    values: {
      status: userRequest?.status,
    },
  });

  return (
    <Dialog>
      <DialogTrigger ref={ref}>
        <Button variant="outline">
          <PencilIcon className="w-4 h-4 mr-2" />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit User Request</DialogTitle>
          <DialogDescription>
            This action will update the user request.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>

                  <Select
                    onValueChange={field.onChange}
                    value={userRequest?.status}
                    {...field}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="PENDING">Pending</SelectItem>
                      <SelectItem value="ASSIGNED">Assigned</SelectItem>
                      <SelectItem value="COMPLETED">Completed</SelectItem>
                    </SelectContent>
                  </Select>

                  <FormDescription>
                    Select the status of the user request.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="mt-2">
              <PencilIcon className="w-4 h-4 mr-2" />
              Update
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateUserRequest;

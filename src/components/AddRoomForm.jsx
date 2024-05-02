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
import roomValidationSchema from "@/validations/room.validation";
import { useMutation } from "@tanstack/react-query";
import api from "@/http/api";
import { toast } from "react-toastify";
import { queryClient } from "@/App";
import { PlusIcon } from "lucide-react";

const AddRoomForm = () => {
  const ref = React.useRef();
  const mutation = useMutation({
    mutationKey: ["add-room"],
    mutationFn: (data) => api.post("/rooms", data),
    onSuccess: () => {
      toast.success("Room added successfully");
      form.reset();
      ref.current?.click();
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || error.message);
    },
  });
  const form = useForm({
    resolver: zodResolver(roomValidationSchema),
    defaultValues: {
      roomNumber: "",
      capacity: "",
      floor: "",
      status: "AVAILABLE",
    },
  });

  const onSubmit = async (data) => {
    mutation.mutate(data);
  };
  return (
    <Dialog>
      <DialogTrigger ref={ref}>
        <Button variant="outline">
          <PlusIcon className="w-4 h-4 mr-2" />
          Add Room
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new room</DialogTitle>
          <DialogDescription>
            This action will create a new room.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="roomNumber"
              render={({ field }) => (
                <div className="space-y-1 mb-2">
                  <FormItem>
                    <FormLabel>Room Number</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Room Number"
                        {...field}
                        onChange={(e) => {
                          field.onChange(parseInt(e.target.value));
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </div>
              )}
            />
            <FormField
              control={form.control}
              name="capacity"
              render={({ field }) => (
                <div className="space-y-1 mb-2">
                  <FormItem>
                    <FormLabel>Capacity</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Capacity"
                        {...field}
                        type="number"
                        onChange={(e) => {
                          field.onChange(parseInt(e.target.value));
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </div>
              )}
            />
            <FormField
              control={form.control}
              name="floor"
              render={({ field }) => (
                <div className="space-y-1 mb-2">
                  <FormItem>
                    <FormLabel>Floor</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Floor"
                        {...field}
                        type="number"
                        onChange={(e) => {
                          field.onChange(parseInt(e.target.value));
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </div>
              )}
            />
            <Button type="submit" className="mt-2">
              Create Room
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddRoomForm;

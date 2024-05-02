import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Select from "react-select";

import api from "@/http/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueries } from "@tanstack/react-query";
import { SendHorizonalIcon } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "react-toastify";
import { queryClient } from "@/App";
import { useNavigate } from "react-router-dom";

const assignRoomSchema = z.object({
  userId: z.string().uuid(),
  roomId: z.string().uuid(),
});

const AssignRoom = () => {
  const [selectedUser, setSelectedUser] = React.useState(null);
  const [selectedRoom, setSelectedRoom] = React.useState(null);
  const navigate = useNavigate();

  const mutaion = useMutation({
    mutationKey: ["assign-room"],
    mutationFn: (data) => api.post("/rooms/assign", data),
    onSuccess: () => {
      toast.success("Room assigned successfully");
      queryClient.invalidateQueries({ queryKey: ["assign-room"] });
      navigate("/users", { replace: true });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || error.message);
    },
  });
  const form = useForm({
    resolver: zodResolver(assignRoomSchema),
    defaultValues: {
      userId: "",
      roomId: "",
    },
  });
  const handleSubmit = (data) => {
    mutaion.mutate(data);
  };
  const response = useQueries({
    queries: [
      {
        queryKey: ["users"],
        queryFn: () => api.get("/users"),
        select: (data) => data.data.data,
      },
      {
        queryKey: ["rooms"],
        queryFn: () => api.get("/rooms"),
        select: (data) => data.data.data,
      },
    ],
  });

  if (response.some((res) => res.isLoading)) {
    return <div>Loading...</div>;
  }

  if (response.some((res) => res.isError)) {
    return <div>Error</div>;
  }

  const { data: users } = response[0];
  const { data: rooms } = response[1];

  //   const userSelectData =
  // map throuh user and create an array of users that dont have any assigned room
  const userSelectData = users
    .filter((user) => user.roomId === null)
    .map((user) => ({
      value: user.id,
      label: user.name,
    }));

  const roomSelectData = rooms
    .filter((room) => room.users.length < room.capacity)
    .sort((a, b) => a.roomNumber - b.roomNumber)
    .map((room) => ({
      value: room.id,
      label: room.roomNumber,
    }));
  return (
    <Card>
      <CardHeader>
        <CardTitle>Assign Room</CardTitle>
        <CardDescription>Assign a room to a user</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col gap-4"
          >
            <Select
              value={selectedUser}
              onChange={(option) => {
                setSelectedUser(option);
                form.setValue("userId", option?.value);
              }}
              options={userSelectData}
              placeholder="Select a user"
            />
            <Select
              value={selectedRoom}
              onChange={(option) => {
                setSelectedRoom(option);
                form.setValue("roomId", option?.value);
              }}
              options={roomSelectData}
              placeholder="Select a room"
            />
            <Button type="submit" className="max-w-max">
              Submit
              <SendHorizonalIcon className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default AssignRoom;

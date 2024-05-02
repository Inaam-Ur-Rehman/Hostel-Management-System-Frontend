import AddRoomForm from "@/components/AddRoomForm";
import RoomCard from "@/components/RoomCard";
import api from "@/http/api";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const Rooms = () => {
  const { data, error, isLoading, isLoadingError } = useQuery({
    queryKey: ["rooms"],
    queryFn: () => api.get("/rooms"),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isLoadingError || error) {
    return <div>Error</div>;
  }

  const {
    data: { data: rooms },
  } = data;

  return (
    <div>
      <div className="flex justify-between gap-8 items-center mb-6">
        <h1 className="text-3xl font-bold">Rooms</h1>
        <AddRoomForm btnText="Add Room" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rooms.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>
    </div>
  );
};

export default Rooms;

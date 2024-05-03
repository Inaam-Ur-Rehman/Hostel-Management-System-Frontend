import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { Badge } from "./ui/badge";
import { EyeIcon } from "lucide-react";
import UpdateRoomForm from "./UpdateRoomForm";

const RoomCard = ({ room }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Room Number : {room.roomNumber}</CardTitle>
        <div className="mt-2">
          <Badge
            variant={
              room.status === "occupied" ||
              room?.users?.length === room?.capacity
                ? "destructive"
                : "outline"
            }
          >
            {room?.users?.length === room?.capacity ? "Room Full" : room.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p>
          Capacity : <span className="font-bold">{room.capacity}</span>
        </p>
        <p>
          Floor : <span className="font-bold">{room.floor}</span>
        </p>
        <p>
          No. of Persons :{" "}
          <span className="font-bold">{room.users.length}</span>
        </p>
      </CardContent>
      <CardFooter className="flex items-center gap-4">
        <Link to={`/rooms/view/${room.id}`}>
          <Button variant="outline">
            <EyeIcon className="mr-2 h-4 w-4" />
            View
          </Button>
        </Link>
        <UpdateRoomForm room={room} />
      </CardFooter>
    </Card>
  );
};

export default RoomCard;

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { createColumnHelper } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Link } from "react-router-dom";

const columnHelper = createColumnHelper();
export const feeColumns = [
  columnHelper.accessor("user.name", {
    header: "User Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("month", {
    header: "Fee Month",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("user.room.roomNumber", {
    header: "Room Number",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("user.profile.phone", {
    header: "Phone",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("createdAt", {
    header: "Paid At",
    cell: (info) => new Date(info.getValue()).toLocaleString(),
  }),
  columnHelper.display({
    id: "actions",
    cell: (info) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button aria-haspopup="true" size="icon" variant="ghost">
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem>
            <Link to={`/fee/view/${info.row.original.id}`}>View</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  }),
];

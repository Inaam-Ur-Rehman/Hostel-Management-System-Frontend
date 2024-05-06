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
export const pendingFeeColumns = [
  columnHelper.accessor("name", {
    header: "User Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("profile.fatherName", {
    header: "Father name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("room.roomNumber", {
    header: "Room Number",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("profile.phone", {
    header: "Phone",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("createdAt", {
    header: "Month started",
    cell: (info) => new Date(info.getValue()).toDateString(),
  }),
];

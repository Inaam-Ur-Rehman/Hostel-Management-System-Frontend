import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper();
export const complaintsColumns = [columnHelper.accessor("id", {})];

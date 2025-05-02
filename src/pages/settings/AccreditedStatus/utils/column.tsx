import {
  Checkbox
} from "@/ComponentModule";
import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { AccreditionStatus } from "@/shared/interfaces/accredition-status.interface";
import type { ColumnDef } from "@tanstack/react-table";
import { StatusRowActions } from "./row-actions";

export const accreditedStatusColumn = (
  refetchaccreditedStatus: () => void
): ColumnDef<AccreditionStatus>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
  },
  {
    id: "actions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Actions" />
    ),
    cell: ({ row }) => (
      <StatusRowActions row={row} refetchaccreditedStatus={refetchaccreditedStatus} />
    ),
  },
];

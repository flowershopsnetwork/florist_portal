import { Checkbox } from "@/ComponentModule";
import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { Town } from "@/shared/interfaces/town.interface";
import type { ColumnDef } from "@tanstack/react-table";
import { TownRowActions } from "./row-actions";

export const townColumn = (refetchTowns: () => void): ColumnDef<Town>[] => [
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
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Town" />
    ),
  },
  {
    accessorKey: "page_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Page" />
    ),
    enableSorting: false,
  },
  {
    id: "actions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Actions" />
    ),
    cell: ({ row }) => (
      <div onClick={(e) => e.stopPropagation()}>
        <TownRowActions row={row} refetchTowns={refetchTowns} />
      </div>
    ),
  },
];

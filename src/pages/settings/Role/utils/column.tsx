import {
  Checkbox
} from "@/ComponentModule";
import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { Role } from "@/shared/interfaces/role.interface";
import type { ColumnDef } from "@tanstack/react-table";
import { RoleRowActions } from "./row-actions";

export const roleColumn = (
  refetchRoles: () => void
): ColumnDef<Role>[] => [
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
      <DataTableColumnHeader column={column} title="Roles" />
    ),
  },
  {
    id: "actions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Actions" />
    ),
    cell: ({ row }) => (
      <RoleRowActions row={row} refetchRoles={refetchRoles} />
    ),
  },
];

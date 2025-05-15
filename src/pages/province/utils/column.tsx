import { Checkbox } from "@/ComponentModule";
import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { Province } from "@/shared/interfaces/province.interface";
import type { ColumnDef } from "@tanstack/react-table";
import { ProvinceRowActions } from "./row-actions";

export const provinceColumn = (
  refetchProvinces: () => void
): ColumnDef<Province>[] => [
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
      <DataTableColumnHeader column={column} title="Province" />
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
        <ProvinceRowActions row={row} refetchProvinces={refetchProvinces} />
      </div>
    ),
  },
];

import { Checkbox } from "@/ComponentModule";
import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { Product } from "@/shared/interfaces/product.interface";
import type { ColumnDef } from "@tanstack/react-table";
import { ProductRowActions } from "./row-actions";

export const productColumn = (
  refetchProducts: () => void
): ColumnDef<Product>[] => [
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
    accessorKey: "image1_url",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Image" />
    ),
    cell: ({ row }) => {
      const imageUrl = row.getValue<string>("image1_url");
      return (
        <div className="w-10 h-10 overflow-hidden rounded-md border">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="Product"
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="flex items-center justify-center text-2xl text-gray-500 w-full h-full">
              🌸
            </div>
          )}
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Product" />
    ),
  },
  {
    accessorKey: "handle",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Handle" />
    ),
    enableSorting: false,
  },
  {
    id: "floristid",
    enableSorting: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Florist" />
    ),
    accessorFn: (row) => row.florist_name,
    filterFn: (row, id, value) => {
      return row.getValue(id) === value;
    },
    cell: ({ row }) => {
      const floristName = row.original.florist_name;
      return <div>{floristName || ""}</div>;
    },
  },
  {
    id: "actions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Actions" />
    ),
    cell: ({ row }) => (
      <div onClick={(e) => e.stopPropagation()}>
        <ProductRowActions row={row} refetchProducts={refetchProducts} />
      </div>
    ),
  },
];

import { API_CONFIG } from "@/api/apiConfig";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Checkbox,
} from "@/ComponentModule";
import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { Florist } from "@/shared/interfaces/florist.interface";
import type { ColumnDef } from "@tanstack/react-table";
import { FloristRowActions } from "./row-actions";
import { useEffect, useState } from "react";
import { GET } from "@/api/restRequest";

export const floristColumn = (
  refetchFlorists: () => void
): ColumnDef<Florist>[] => [
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
    accessorKey: "photo",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Logo" />
    ),
    enableSorting: false,
    cell: ({ row }) => {
      const photoUrl = row.original.photo_url;
      const [imageSrc, setImageSrc] = useState<string | null>(null);

      useEffect(() => {
        let objectUrl: string;

        const fetchImage = async () => {
          try {
            const res = await GET(`/photo/florists/${photoUrl}`, {
              responseType: "blob",
            });
            const blob = res.data;
            objectUrl = URL.createObjectURL(blob);
            setImageSrc(objectUrl);
          } catch (err) {
            console.error("Failed to fetch image", err);
          }
        };

        if (photoUrl) {
          fetchImage();
        }

        return () => {
          if (objectUrl) URL.revokeObjectURL(objectUrl);
        };
      }, [photoUrl]);

      return (
        <Avatar>
          {imageSrc ? (
            <AvatarImage src={imageSrc} alt="logo" />
          ) : (
            <AvatarFallback>🌸</AvatarFallback>
          )}
        </Avatar>
      );
    },
  },
  {
    accessorKey: "floristcode",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Code" />
    ),
  },
  {
    accessorKey: "floristname",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Florist" />
    ),
  },
  {
    accessorKey: "contactnumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Contact" />
    ),
  },
  {
    id: "city",
    enableSorting: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="City" />
    ),
    accessorFn: (row) => row.city,
    filterFn: (row, id, value) => {
      return row.getValue(id) === value;
    },
    cell: ({ row }) => {
      const cityName = row.original.city_name;
      return <div>{cityName || ""}</div>;
    },
  },
  {
    id: "province",
    enableSorting: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Province" />
    ),
    accessorFn: (row) => row.province,
    filterFn: (row, id, value) => {
      return row.getValue(id) === value;
    },
    cell: ({ row }) => {
      const provinceName = row.original.province_name;
      return <div>{provinceName || ""}</div>;
    },
  },
  {
    id: "floristrep",
    enableSorting: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Florist Rep" />
    ),
    accessorFn: (row) => row.floristrep,
    filterFn: (row, id, value) => {
      return row.getValue(id) === value;
    },
    cell: ({ row }) => {
      const floristRepName = row.original.floristrep_name;
      return <div>{floristRepName || ""}</div>;
    },
  },
  {
    id: "status",
    enableSorting: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    accessorFn: (row) => row.status,
    filterFn: (row, id, value) => {
      return row.getValue(id) === value;
    },
    cell: ({ row }) => {
      const statusName = row.original.status_name;
      return (
        <Badge
          variant={
            statusName === "New"
              ? "default"
              : statusName === "Accepted"
              ? "success"
              : "secondary"
          }
        >
          {statusName}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Actions" />
    ),
    cell: ({ row }) => (
      <FloristRowActions row={row} refetchFlorists={refetchFlorists} />
    ),
  },
];

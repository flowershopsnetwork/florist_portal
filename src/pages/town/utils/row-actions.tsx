import { deleteTown } from "@/api/services/townService";
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/ComponentModule";
import type { Row } from "@tanstack/react-table";
import { MoreHorizontal, Pen, Trash } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

interface TownRowActionsProps {
  row: Row<any>;
  refetchTowns: () => void;
}

export function TownRowActions({
  row,
  refetchTowns,
}: TownRowActionsProps) {
  const handleDelete = async () => {
    try {
      const res = await deleteTown(row.original.id);
      toast.success(res.data.message, {
        style: { backgroundColor: "#28a745", color: "#fff" },
      });
      refetchTowns();
    } catch (error) {
      toast.error("Failed to delete town.", {
        style: { backgroundColor: "#dc3545", color: "#fff" },
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <Link to={`/towns/edit/${row.original.id}`}>
          <DropdownMenuItem>
            <Pen className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem onClick={handleDelete}>
          <Trash className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

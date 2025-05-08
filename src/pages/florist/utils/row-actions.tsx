import { deleteFlorist } from "@/api/services/floristService";
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/ComponentModule";
import type { Row } from "@tanstack/react-table";
import { MoreHorizontal, Trash } from "lucide-react";
import { toast } from "sonner";

interface FloristRowActionsProps {
  row: Row<any>;
  refetchFlorists: () => void;
}

export function FloristRowActions({
  row,
  refetchFlorists,
}: FloristRowActionsProps) {
  const handleDelete = async () => {
    try {
      const res = await deleteFlorist(row.original.id);
      toast.success(res.data.message, {
        style: { backgroundColor: "#28a745", color: "#fff" },
      });
      refetchFlorists();
    } catch (error) {
      toast.error("Failed to delete florist.", {
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
        {/* <Link to={`/florists/edit/${row.original.id}`}>
          <DropdownMenuItem>
            <Pen className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenuItem>
        </Link> */}
        <DropdownMenuItem onClick={handleDelete}>
          <Trash className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

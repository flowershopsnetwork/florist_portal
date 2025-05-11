import { deleteCollection } from "@/api/services/collectionService";
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/ComponentModule";
import type { Row } from "@tanstack/react-table";
import { MoreHorizontal, Trash } from "lucide-react";
import { toast } from "sonner";

interface CollectionRowActionsProps {
  row: Row<any>;
  refetchCollections: () => void;
}

export function CollectionRowActions({
  row,
  refetchCollections,
}: CollectionRowActionsProps) {
  const handleDelete = async () => {
    try {
      const res = await deleteCollection(row.original.id);
      toast.success(res.data.message, {
        style: { backgroundColor: "#28a745", color: "#fff" },
      });
      refetchCollections();
    } catch (error) {
      toast.error("Failed to delete collection.", {
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
        {/* <Link to={`/collections/edit/${row.original.id}`}>
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

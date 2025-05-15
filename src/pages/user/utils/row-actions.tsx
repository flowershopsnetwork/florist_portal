import { deleteUser } from "@/api/services/userService";
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/ComponentModule";
import type { Row } from "@tanstack/react-table";
import { MoreHorizontal, Trash, Unlock } from "lucide-react";
import { toast } from "sonner";

interface UserRowActionsProps {
  row: Row<any>;
  refetchUsers: () => void;
}

export function UserRowActions({
  row,
  refetchUsers,
}: UserRowActionsProps) {
  const handleDelete = async () => {
    try {
      const res = await deleteUser(row.original.id);
      toast.success(res.data.message, {
        style: { backgroundColor: "#28a745", color: "#fff" },
      });
      refetchUsers();
    } catch (error) {
      toast.error("Failed to delete user.", {
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
        <DropdownMenuItem disabled>
            <Unlock className="mr-2 h-4 w-4" />
            Reset
          </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDelete} disabled>
          <Trash className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

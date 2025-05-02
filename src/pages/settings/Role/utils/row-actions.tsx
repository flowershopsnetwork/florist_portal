import { deleteRole } from "@/api/services/roleService";
import {
  Button
} from "@/ComponentModule";
import { Role } from "@/shared/interfaces/role.interface";
import type { Row } from "@tanstack/react-table";
import { Trash } from "lucide-react";
import { toast } from "sonner";
import { RoleAdd } from "../RoleAdd";

interface RoleRowActionsProps {
  row: Row<Role>;
  refetchRoles: () => void;
}

export function RoleRowActions({ row, refetchRoles }: RoleRowActionsProps) {
  const handleDelete = async () => {
    const id = row.original.id;
    if (id === undefined) {
      toast.error("Role ID is undefined. Unable to delete.", {
        style: { backgroundColor: "#dc3545", color: "#fff" },
      });
      return;
    }

    try {
      const res = await deleteRole(id);
      toast.success(res.data.message, {
        style: { backgroundColor: "#28a745", color: "#fff" },
      });
      refetchRoles();
    } catch (error) {
      toast.error("Failed to delete role.", {
        style: { backgroundColor: "#dc3545", color: "#fff" },
      });
    }
  };

  return (
    <div className="flex gap-2">
      <RoleAdd
        mode="edit"
        role={row.original}
        onSuccess={() => {
          refetchRoles();
        }}
        triggerButton={null} 
      />
      <Button size="sm" onClick={handleDelete} variant='outline'>
        <Trash color="#FF2056"/>
      </Button>
    </div>
  );
}

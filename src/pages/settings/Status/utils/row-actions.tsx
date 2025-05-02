import { deleteStatus } from "@/api/services/statusService";
import {
  Button
} from "@/ComponentModule";
import { Status } from "@/shared/interfaces/status.interface";
import type { Row } from "@tanstack/react-table";
import { Trash } from "lucide-react";
import { toast } from "sonner";
import { StatusAdd } from "../StatusAdd";

interface StatusRowActionsProps {
  row: Row<Status>;
  refetchStatus: () => void;
}

export function StatusRowActions({ row, refetchStatus }: StatusRowActionsProps) {
  const handleDelete = async () => {
    const id = row.original.id;
    if (id === undefined) {
      toast.error("Status ID is undefined. Unable to delete.", {
        style: { backgroundColor: "#dc3545", color: "#fff" },
      });
      return;
    }

    try {
      const res = await deleteStatus(id);
      toast.success(res.data.message, {
        style: { backgroundColor: "#28a745", color: "#fff" },
      });
      refetchStatus();
    } catch (error) {
      toast.error("Failed to delete status.", {
        style: { backgroundColor: "#dc3545", color: "#fff" },
      });
    }
  };

  return (
    <div className="flex gap-2">
      <StatusAdd
        mode="edit"
        status={row.original}
        onSuccess={() => {
          refetchStatus();
        }}
        triggerButton={null} 
      />
      <Button size="sm" onClick={handleDelete} variant='outline'>
        <Trash color="#FF2056"/>
      </Button>
    </div>
  );
}

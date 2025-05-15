import { deleteAccreditionStatuses } from "@/api/services/accreditionStatusService";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
} from "@/ComponentModule";
import { Status } from "@/shared/interfaces/status.interface";
import type { Row } from "@tanstack/react-table";
import { Trash } from "lucide-react";
import { toast } from "sonner";
import { AccreditedStatusAdd } from "../AccreditedStatusAdd";

interface StatusRowActionsProps {
  row: Row<Status>;
  refetchaccreditedStatus: () => void;
}

export function StatusRowActions({
  row,
  refetchaccreditedStatus,
}: StatusRowActionsProps) {
  const handleDelete = async () => {
    const id = row.original.id;
    if (id === undefined) {
      toast.error("Status ID is undefined. Unable to delete.", {
        style: { backgroundColor: "#dc3545", color: "#fff" },
      });
      return;
    }

    try {
      const res = await deleteAccreditionStatuses(id);
      toast.success(res.data.message, {
        style: { backgroundColor: "#28a745", color: "#fff" },
      });
      refetchaccreditedStatus();
    } catch (error) {
      toast.error("Failed to delete status.", {
        style: { backgroundColor: "#dc3545", color: "#fff" },
      });
    }
  };

  return (
    <div className="flex gap-2">
      <AccreditedStatusAdd
        mode="edit"
        accreditedStatus={row.original}
        onSuccess={() => {
          refetchaccreditedStatus();
        }}
        triggerButton={null}
      />
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button size="sm" variant="outline">
            <Trash color="#FF2056" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will delete the accredited status.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

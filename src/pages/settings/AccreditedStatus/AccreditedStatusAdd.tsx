import { createAccreditionStatuses, updateAccreditionStatuses } from "@/api/services/accreditionStatusService";
import { Button } from "@/ComponentModule";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { AccreditionStatus } from "@/shared/interfaces/accredition-status.interface";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Pencil, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import * as Yup from "yup";

interface AccreditedStatusAddFormProps {
  mode: "add" | "edit";
  triggerButton?: React.ReactNode;
  accreditedStatus?: AccreditionStatus;
  onSuccess?: () => void;
}

export function AccreditedStatusAdd({
  mode,
  triggerButton,
  accreditedStatus,
  onSuccess,
}: AccreditedStatusAddFormProps) {
  const [open, setOpen] = useState(false);

  const initialValues = {
    status: accreditedStatus?.status || "",
  };

  const validationSchema = Yup.object({
    status: Yup.string().required("Status name is required"),
  });

  const handleSubmit = async (
    values: typeof initialValues,
    { resetForm }: any
  ) => {
    try {
      if (mode === "add") {
        const res = await createAccreditionStatuses(values);
        toast.success(res.data.message, {
          style: { backgroundColor: "#28a745", color: "#fff" },
        });
      } else if (mode === "edit" && accreditedStatus?.id) {
        const res = await updateAccreditionStatuses(accreditedStatus.id, values);
        toast.success(res.data.message, {
          style: { backgroundColor: "#28a745", color: "#fff" },
        });
      }
      resetForm();
      setOpen(false);
      onSuccess?.();
    } catch (error: any) {
      console.error("Failed to submit status:", error);
      if (error.status == 422) {
        toast.error(error.response.data.message, {
          style: { backgroundColor: "#dc3545", color: "#fff" },
        });
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {triggerButton ?? (
          <Button size="sm" variant="outline">
            {mode === "add" ? (
              <>
                <Plus className="mr-2 h-4 w-4" />
                Add New Status
              </>
            ) : (
              <>
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </>
            )}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {mode === "add" ? "Add New Accredited Status" : "Edit Accredited Status"}
          </DialogTitle>
          <DialogDescription>
            {mode === "add"
              ? "Enter a name to create a new status."
              : "Update the status name."}
          </DialogDescription>
        </DialogHeader>

        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <Field
                  as={Input}
                  name="status"
                  placeholder="Enter status name"
                />
                <ErrorMessage
                  name="status"
                  component="div"
                  className="text-sm text-red-500 mt-1"
                />
              </div>
              <div className="flex justify-end">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting
                    ? mode === "add"
                      ? "Adding..."
                      : "Updating..."
                    : mode === "add"
                    ? "Add Status"
                    : "Update Status"}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}

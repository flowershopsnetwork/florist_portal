import { createRole, updateRole } from "@/api/services/roleService";
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
import { Role } from "@/shared/interfaces/role.interface";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Pencil, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import * as Yup from "yup";

interface RoleFormProps {
  mode: "add" | "edit";
  triggerButton?: React.ReactNode;
  role?: Role;
  onSuccess?: () => void;
}

export function RoleAdd({
  mode,
  triggerButton,
  role,
  onSuccess,
}: RoleFormProps) {
  const [open, setOpen] = useState(false);

  const initialValues = {
    name: role?.name || "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Role name is required"),
  });

  const handleSubmit = async (
    values: typeof initialValues,
    { resetForm }: any
  ) => {
    try {
      if (mode === "add") {
        const res = await createRole(values);
        toast.success(res.data.message, {
          style: { backgroundColor: "#28a745", color: "#fff" },
        });
      } else if (mode === "edit" && role?.id) {
        const res = await updateRole(role.id, values);
        toast.success(res.data.message, {
          style: { backgroundColor: "#28a745", color: "#fff" },
        });
      }
      resetForm();
      setOpen(false);
      onSuccess?.();
    } catch (error: any) {
      console.error("Failed to submit role:", error);
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
                Add New Role
              </>
            ) : (
              <>
                <Pencil color="#FFC107"/>
              </>
            )}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {mode === "add" ? "Add New Role" : "Edit Role"}
          </DialogTitle>
          <DialogDescription>
            {mode === "add"
              ? "Enter a name to create a new role."
              : "Update the role name."}
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
                  name="name"
                  placeholder="Enter role name"
                />
                <ErrorMessage
                  name="name"
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
                    ? "Add Role"
                    : "Update Role"}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}

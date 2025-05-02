import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ErrorMessage, useField } from "formik";

const ProvinceDetails = () => {
  const [nameField, nameMeta] = useField("name");
  const [pageidField] = useField("pageid");

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <div className="space-y-1">
        <Label>Province</Label>
        <Input
          {...nameField}
          className={`border p-2 w-full mt-1 ${
            nameMeta.touched && nameMeta.error
              ? "border-red-500"
              : "border-gray-300"
          }`}
        />
        <ErrorMessage
          name="name"
          component="p"
          className="text-red-500 text-sm mt-1 italic"
        />
      </div>
      <div className="space-y-1">
        <Label>Page</Label>
        <Input
          {...pageidField}
        />
      </div>
    </div>
  );
};

export default ProvinceDetails;

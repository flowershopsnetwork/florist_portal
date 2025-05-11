import { Textarea } from "@/ComponentModule";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ErrorMessage, useField } from "formik";

const CollectionDetails = () => {
  const [titleField, titleMeta] = useField("title");
  const [handleField, handleMeta] = useField("handle");
  const [descriptionField] = useField("description");
  const [shopifygidField] = useField("shopifygid");

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <div className="space-y-1">
        <Label>Title</Label>
        <Input
          {...titleField}
          className={`border p-2 w-full mt-1 ${
            titleMeta.touched && titleMeta.error
              ? "border-red-500"
              : "border-gray-300"
          }`}
        />
        <ErrorMessage
          name="title"
          component="p"
          className="text-red-500 text-sm mt-1 italic"
        />
      </div>
      <div className="space-y-1">
        <Label>Handle</Label>
        <Input
          {...handleField}
          className={`border p-2 w-full mt-1 ${handleMeta.touched && handleMeta.error
              ? "border-red-500"
              : "border-gray-300"
            }`}
        />
        <ErrorMessage
          name="handle"
          component="p"
          className="text-red-500 text-sm mt-1 italic"
        />
      </div>
      <div className="space-y-1">
        <Label>Description</Label>
        <Textarea
          {...descriptionField}
        />
      </div>
      <div className="space-y-1">
        <Label>Shopify GID</Label>
        <Input
          {...shopifygidField}
          disabled
        />
      </div>
    </div>
  );
};

export default CollectionDetails;

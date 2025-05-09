import { Textarea } from "@/ComponentModule";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ErrorMessage, useField } from "formik";

const ProductDetails = () => {
  const [titleField, titleMeta] = useField("title");
  const [handleField] = useField("handle");
  const [descriptionField] = useField("description");
  const [vendorField] = useField("vendor");
  const [shopifyGidField] = useField("shopifygid");
  const [metaTitleField] = useField("metatitle");
  const [metaDescriptionField] = useField("metadescription");
  const [tagsField] = useField("tags");

  return (
    <>
      <div>
        <h3 className="text-xl font-medium text-gray-500 mb-4">Product Info</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
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
            <Input {...handleField} />
          </div>
          <div className="space-y-1">
            <Label>Description</Label>
            <Input {...descriptionField} />
          </div>
          <div className="space-y-1">
            <Label>Vendor</Label>
            <Input {...vendorField} />
          </div>
          <div className="space-y-1">
            <Label>Shopify GID</Label>
            <Input {...shopifyGidField} disabled/>
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-xl font-medium text-gray-500 mb-4">Page Info</h3>
        <div className="space-y-2 mb-2">
          <Label htmlFor="page_title">Page Title</Label>
          <Input {...metaTitleField} />
        </div>
        <div className="space-y-2 mb-2">
          <Label htmlFor="meta_description">Meta Description</Label>
          <Textarea {...metaDescriptionField} />
        </div>
        <div className="space-y-2 mb-2">
          <Label htmlFor="description">Tags</Label>
          <Textarea {...tagsField} />
        </div>
      </div>
    </>
  );
};

export default ProductDetails;

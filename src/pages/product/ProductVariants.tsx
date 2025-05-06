import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useField } from "formik";

const ProductVariants = () => {
  const variantGroups = [1, 2, 3].map((num) => ({
    id: useField(`variant${num}id`)[0],
    title: useField(`variant${num}title`)[0],
    price: useField(`variant${num}price`)[0],
    sku: useField(`variant${num}sku`)[0],
    sale: useField(`variant${num}sale`)[0],
    cost: useField(`variant${num}cost`)[0],
    key: `variant${num}`,
  }));

  return (
    <div className="space-y-5">
      <h3 className="text-xl font-medium text-gray-500 mb-4">Product Variants</h3>
      {variantGroups.map((variant, index) => (
        <div
          key={variant.key}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4 rounded-md bg-white border"
        >
          <div className="space-y-1">
            <Label htmlFor={`variant${index + 1}id`}>ID</Label>
            <Input id={`variant${index + 1}id`} {...variant.id} />
          </div>
          <div className="space-y-1">
            <Label htmlFor={`variant${index + 1}title`}>Title</Label>
            <Input id={`variant${index + 1}title`} {...variant.title} />
          </div>
          <div className="space-y-1">
            <Label htmlFor={`variant${index + 1}sku`}>SKU</Label>
            <Input id={`variant${index + 1}sku`} {...variant.sku} />
          </div>
          <div className="space-y-1">
            <Label htmlFor={`variant${index + 1}sale`}>Sale</Label>
            <Input
              id={`variant${index + 1}sale`}
              value={
                variant.sale.value === true || variant.sale.value === "true"
                  ? "Yes"
                  : "No"
              }
              readOnly
              className="bg-gray-100 cursor-not-allowed"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor={`variant${index + 1}price`}>Price</Label>
            <Input id={`variant${index + 1}price`} {...variant.price} />
          </div>
          <div className="space-y-1">
            <Label htmlFor={`variant${index + 1}cost`}>Cost</Label>
            <Input id={`variant${index + 1}cost`} {...variant.cost} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductVariants;

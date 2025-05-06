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
    <>
      <div>
        <h3 className="text-xl font-medium text-gray-500 mb-4">Variants</h3>
        <div className="space-y-4">
          {variantGroups.map((variant) => (
            <div key={variant.key} className="flex flex-wrap gap-4">
              <div className="flex flex-col w-[120px]">
                <Label>ID</Label>
                <Input {...variant.id} />
              </div>
              <div className="flex flex-col w-[160px]">
                <Label>Title</Label>
                <Input {...variant.title} />
              </div>
              <div className="flex flex-col w-[120px]">
                <Label>SKU</Label>
                <Input {...variant.sku} />
              </div>
              <div className="flex flex-col w-[100px]">
                <Label>Sale</Label>
                <Input {...variant.sale} />
              </div>
              <div className="flex flex-col w-[100px]">
                <Label>Price</Label>
                <Input {...variant.price} />
              </div>
              <div className="flex flex-col w-[100px]">
                <Label>Cost</Label>
                <Input {...variant.cost} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductVariants;

import { useField } from "formik";

const ProductImages = () => {
  const imageFields = [
    "image1_url",
    "image2_url",
    "image3_url",
    "image4_url",
    "image5_url",
  ];

  return (
    <div className="space-y-5">
      <h3 className="text-xl font-medium text-gray-500 mb-4">Product Images</h3>
      <div className="flex flex-wrap gap-4">
        {imageFields.map((fieldName) => {
          const [field] = useField(fieldName);
          return (
            field.value && (
              <div
                key={fieldName}
                className="w-48 overflow-hidden rounded-lg border shadow-sm transition-shadow duration-300 hover:shadow-md"
              >
                <img
                  src={field.value}
                  alt="Product"
                  className="object-contain h-48 w-full transition-transform duration-300 hover:scale-105"
                />
              </div>
            )
          );
        })}
      </div>
    </div>
  );
};

export default ProductImages;

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
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Product Images</h2>
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

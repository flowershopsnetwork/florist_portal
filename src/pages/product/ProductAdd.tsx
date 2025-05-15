import { createProduct, fetchProductById, updateProduct } from "@/api/services/productService";
import {
  Button,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/ComponentModule";
import { Product } from "@/shared/interfaces/product.interface";
import { Form, Formik } from "formik";
import { ArrowLeft, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import * as Yup from "yup";
import ProductDetails from "./ProductDetails";
import ProductImages from "./ProductImages";
import ProductVariants from "./ProductVariants";
import ProductFlorist from "./ProductFlorist";

const ProductAdd = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const productId = Number(id);
  const [initialValues, setInitialValues] = useState<Product>({
    title: "",
    handle: "",
    description: "",
    vendor: "",
    shopifygid: "",
    image1_url: "",
    image1_alt: "",
    image2_url: "",
    image2_alt: "",
    image3_url: "",
    image3_alt: "",
    image4_url: "",
    image4_alt: "",
    image5_url: "",
    image5_alt: "",
    variant1id: "",
    variant1title: "",
    variant1price: "",
    variant1sku: "",
    variant1sale: "",
    variant1cost: "",
    variant1currency: "",
    variant2id: "",
    variant2title: "",
    variant2price: "",
    variant2sku: "",
    variant2sale: "",
    variant2cost: "",
    variant2currency: "",
    variant3id: "",
    variant3title: "",
    variant3price: "",
    variant3sku: "",
    variant3sale: "",
    variant3cost: "",
    variant3currency: "",
    metatitle: "",
    metadescription: "",
    productid: "",
    tags: "",
  });

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
  });

  useEffect(() => {
    if (id) {
      (async () => {
        try {
          const res = await fetchProductById(productId);
          const sanitized = {
            ...initialValues,
            ...Object.fromEntries(
              Object.entries(res.data).map(([key, value]) => [key, value ?? ""])
            ),
          };
          setInitialValues(sanitized);
        } catch (error) {
          console.error(error);
          toast.error("Failed to fetch product data.", {
            style: { backgroundColor: "#dc3545", color: "#fff" },
          });
        }
      })();
    }
  }, [id]);

  const handleSubmit = async (
    values: typeof initialValues,
    { resetForm }: any
  ) => {
    try {
      if (id) {
        const res = await updateProduct(productId, values);
        toast.success(res.data.message, {
          style: { backgroundColor: "#28a745", color: "#fff" },
        });
      } else {
        const res = await createProduct(values);
        toast.success(res.data.message, {
          style: { backgroundColor: "#28a745", color: "#fff" },
        });
      }
      resetForm();
      navigate("/products");
    } catch (error) {
      console.error(error);
      toast.error("Failed to save product. Please try again.", {
        style: { backgroundColor: "#dc3545", color: "#fff" },
      });
    }
  };

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {(formik) => (
        <Form>
          <div className="p-5">
            <div className="flex justify-between items-center mb-2">
              <Link to="/products">
                <Button type="button">
                  <ArrowLeft className="mr-2" />
                  Back
                </Button>
              </Link>
              <Button type="button" onClick={() => formik.submitForm()} disabled>
                <Save />
                Save
              </Button>
            </div>
            <Tabs defaultValue="detail">
              <TabsList className="grid grid-cols-4 w-full md:w-[600px]">
                <TabsTrigger value="detail">Basic</TabsTrigger>
                <TabsTrigger value="variant">Variants</TabsTrigger>
                <TabsTrigger value="images">Images</TabsTrigger>
                <TabsTrigger value="florist">Florist</TabsTrigger>
              </TabsList>
              <TabsContent value="detail">
                <ProductDetails />
              </TabsContent>
              <TabsContent value="variant">
                <ProductVariants />
              </TabsContent>
              <TabsContent value="images">
                <ProductImages />
              </TabsContent>
              <TabsContent value="florist">
                <ProductFlorist />
              </TabsContent>
            </Tabs>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ProductAdd;

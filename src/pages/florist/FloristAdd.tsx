import {
  Button,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/ComponentModule";
import { Form, Formik } from "formik";
import { ArrowLeft, Save } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import FloristDetails from "./FloristDetails";
import FloristInfo from "./FloristInfo";
import FloristProducts from "./FloristProducts";
import { createFlorist } from "@/api/services/floristService";
import { toast } from "sonner";

const FloristAdd = () => {
  const navigate = useNavigate();
  const initialValues = {
    floristname: "",
    contactnumber: "",
    address: "",
    city: "",
    province: "",
    postcode: "",
    website: "",
    socialmedia: "",
    collection: "",
    floristrep: "",
    status: "",
    shopifygid: "",
    call_outcome: "",
    product_type: "",
    product_price: "",
    delivery_fee: "",
    sell_extras: "",
    popularity_trend: "",
    preferred_communication: "",
    member_of_other_networks: "",
    flower_supplier: "",
    interested_free_website: "",
    discout_offer: "",
    additional_info: "",
    page_title: "",
    meta_description: "",
    description: "",
  };

  const validationSchema = Yup.object({
    floristname: Yup.string().required("Florist name is required"),
    contactnumber: Yup.string().required("Contact number is required"),
    address: Yup.string().required("Address is required"),
    city: Yup.string().required("City is required"),
    province: Yup.string().required("Province is required"),
    postcode: Yup.string().required("Post Code is required"),
    floristrep: Yup.string().required("Florist Representative is required"),
    status: Yup.string().required("Status is required"),
    call_outcome: Yup.string().required("Call outcome is required"),
  });

  const handleSubmit = async (
    values: typeof initialValues,
    { resetForm }: any
  ) => {
    try {
      const res = await createFlorist(values);
      toast.success(res.data.message, {
        style: {
          backgroundColor: "#28a745",
          color: "#fff",
        },
      });
      navigate("/florists");
      resetForm();
    } catch (error) {
      console.error(error);
      toast.error("Failed to add florist. Please try again.", {
        style: {
          backgroundColor: "#dc3545",
          color: "#fff",
        },
      });
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {(formik) => (
        <Form>
          <div className="p-5">
            <div className="flex justify-between items-center mb-2">
              <Link to="/florists">
                <Button type="button">
                  <ArrowLeft className="mr-2" />
                  Back
                </Button>
              </Link>
              <Button
                type="button"
                onClick={async () => {
                  formik.handleSubmit();
                }}
              >
                <Save />
                Save
              </Button>
            </div>

            <Tabs defaultValue="detail">
              <TabsList className="grid grid-cols-3 w-full md:w-[600px]">
                <TabsTrigger value="detail">Basic</TabsTrigger>
                <TabsTrigger value="info">Marketing Info</TabsTrigger>
                <TabsTrigger value="product">Products</TabsTrigger>
              </TabsList>
              <TabsContent value="detail">
                <FloristDetails />
              </TabsContent>
              <TabsContent value="info">
                <FloristInfo />
              </TabsContent>
              <TabsContent value="product">
                <FloristProducts />
              </TabsContent>
            </Tabs>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default FloristAdd;

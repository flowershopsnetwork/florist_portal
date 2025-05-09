import {
  createFlorist,
  fetchFloristById,
  updateFlorist,
} from "@/api/services/floristService";
import {
  Button,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/ComponentModule";
import { Form, Formik } from "formik";
import { ArrowLeft, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import * as Yup from "yup";
import FloristDetails from "./FloristDetails";
import FloristInfo from "./FloristInfo";
import FloristPhoto from "./FloristPhoto";
import FloristProducts from "./FloristProducts";

const FloristAdd = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const floristId = Number(id);

  const [initialValues, setInitialValues] = useState({
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
    interested_in_free_website: "",
    discount_offer: "",
    additional_info: "",
    page_title: "",
    meta_description: "",
    description: "",
    accredition_status: "",
    floristcode: "",
    city_name: "",
    province_name: "",
  });

  const validationSchema = Yup.object({
    floristname: Yup.string()
      .required("Florist name is required")
      .min(3, "Florist name must be at least 3 characters long"),
    contactnumber: Yup.string().required("Contact number is required"),
    address: Yup.string().required("Address is required"),
    city: Yup.string().required("City is required"),
    province: Yup.string().required("Province is required"),
    postcode: Yup.string().required("Post Code is required"),
    floristrep: Yup.string().required("Florist Representative is required"),
    status: Yup.string().required("Status is required"),
    call_outcome: Yup.string().required("Call outcome is required"),
  });

  useEffect(() => {
    if (id && !isNaN(floristId)) {
      (async () => {
        try {
          const res = await fetchFloristById(floristId);
          const sanitized = {
            ...initialValues,
            ...Object.fromEntries(
              Object.entries(res.data).map(([key, value]) => [key, value ?? ""])
            ),
          };
          setInitialValues(sanitized);
        } catch (error) {
          console.error(error);
          toast.error("Failed to fetch florist data.", {
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
      if (id && !isNaN(floristId)) {
        const res = await updateFlorist(floristId, values);
        toast.success(res.data.message, {
          style: { backgroundColor: "#28a745", color: "#fff" },
        });
      } else {
        const res = await createFlorist(values);
        toast.success(res.data.message, {
          style: { backgroundColor: "#28a745", color: "#fff" },
        });
      }
      resetForm();
      navigate("/florists");
    } catch (error) {
      console.error(error);
      toast.error("Failed to save florist. Please try again.", {
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
              <div className="flex items-center gap-5">
                <Link to="/florists">
                  <Button type="button">
                    <ArrowLeft className="mr-2" />
                    Back
                  </Button>
                </Link>
                <h3 className="text-xl font-medium text-black">
                  {initialValues.floristcode && initialValues.floristcode}
                </h3>
              </div>
              <Button type="button" onClick={() => formik.submitForm()}>
                <Save />
                Save
              </Button>
            </div>
            <Tabs defaultValue="detail">
              <TabsList
                className={`grid ${
                  floristId ? "grid-cols-4" : "grid-cols-2"
                } w-full md:w-[600px]`}
              >
                <TabsTrigger value="detail">Basic</TabsTrigger>
                <TabsTrigger value="info">Marketing Info</TabsTrigger>
                {!isNaN(floristId) && floristId && (
                  <>
                    <TabsTrigger value="photo">Photo</TabsTrigger>
                    <TabsTrigger value="product">Products</TabsTrigger>
                  </>
                )}
              </TabsList>
              <TabsContent value="detail">
                <FloristDetails />
              </TabsContent>
              <TabsContent value="info">
                <FloristInfo />
              </TabsContent>
              {!isNaN(floristId) && floristId && (
                <>
                  <TabsContent value="photo">
                    <FloristPhoto />
                  </TabsContent>
                  <TabsContent value="product">
                    <FloristProducts />
                  </TabsContent>
                </>
              )}
            </Tabs>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default FloristAdd;

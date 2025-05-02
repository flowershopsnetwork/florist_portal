import { createProvince, fetchProvinceById, updateProvince } from "@/api/services/provinceService";
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
import ProvinceDetails from "./ProvinceDetails";

const ProvinceAdd = () => {
  const navigate = useNavigate();
  const { id } = useParams(); 
  const provinceId = Number(id);
  const [initialValues, setInitialValues] = useState({
    name: "",
    pageid: 0,
  });

  const validationSchema = Yup.object({
    name: Yup.string().required("Province is required"),
  });

  useEffect(() => {
    if (id) {
      (async () => {
        try {
          const res = await fetchProvinceById(provinceId);
          const sanitized = {
            ...initialValues,
            ...Object.fromEntries(
              Object.entries(res.data).map(([key, value]) => [
                key,
                value ?? "",
              ])
            ),
          };
          setInitialValues(sanitized);
        } catch (error) {
          console.error(error);
          toast.error("Failed to fetch province data.", {
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
        const res = await updateProvince(provinceId, values);
        toast.success(res.data.message, {
          style: { backgroundColor: "#28a745", color: "#fff" },
        });
      } else {
        const res = await createProvince(values);
        toast.success(res.data.message, {
          style: { backgroundColor: "#28a745", color: "#fff" },
        });
      }
      resetForm();
      navigate("/provinces");
    } catch (error) {
      console.error(error);
      toast.error("Failed to save province. Please try again.", {
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
              <Link to="/provinces">
                <Button type="button">
                  <ArrowLeft className="mr-2" />
                  Back
                </Button>
              </Link>
              <Button
                type="button"
                onClick={() => formik.submitForm()}
              >
                <Save />
                Save
              </Button>
            </div>
            <Tabs defaultValue="detail">
              <TabsList className="w-full md:w-[300px]">
                <TabsTrigger value="detail">Basic</TabsTrigger>
              </TabsList>
              <TabsContent value="detail">
                <ProvinceDetails />
              </TabsContent>
            </Tabs>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ProvinceAdd;

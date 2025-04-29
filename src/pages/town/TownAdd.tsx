import { createTown, fetchTownById, updateTown } from "@/api/services/townService";
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
import TownDetails from "./TownDetails";

const TownAdd = () => {
  const navigate = useNavigate();
  const { id } = useParams(); 
  const townId = Number(id);
  const [initialValues, setInitialValues] = useState({
    name: "",
    pageid: 0,
  });

  const validationSchema = Yup.object({
    name: Yup.string().required("Town is required"),
  });

  useEffect(() => {
    if (id) {
      (async () => {
        try {
          const res = await fetchTownById(townId);
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
          toast.error("Failed to fetch town data.", {
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
        const res = await updateTown(townId, values);
        toast.success(res.data.message, {
          style: { backgroundColor: "#28a745", color: "#fff" },
        });
      } else {
        const res = await createTown(values);
        toast.success(res.data.message, {
          style: { backgroundColor: "#28a745", color: "#fff" },
        });
      }
      resetForm();
      navigate("/towns");
    } catch (error) {
      console.error(error);
      toast.error("Failed to save town. Please try again.", {
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
              <Link to="/towns">
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
                <TownDetails />
              </TabsContent>
            </Tabs>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default TownAdd;

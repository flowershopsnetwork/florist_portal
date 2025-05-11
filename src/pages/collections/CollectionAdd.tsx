import { createCollection, fetchCollectionById, updateCollection } from "@/api/services/collectionService";
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
import CollectionDetails from "./CollectionDetails";

const CollectionAdd = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const collectionId = Number(id);
  const [initialValues, setInitialValues] = useState({
    title: "",
    handle: "",
    shopifygid: "",
  });

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    handle: Yup.string().required("Handle is required"),
  });

  useEffect(() => {
    if (id) {
      (async () => {
        try {
          const res = await fetchCollectionById(collectionId);
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
          toast.error("Failed to fetch collection data.", {
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
        const res = await updateCollection(collectionId, values);
        toast.success(res.data.message, {
          style: { backgroundColor: "#28a745", color: "#fff" },
        });
      } else {
        const res = await createCollection(values);
        toast.success(res.data.message, {
          style: { backgroundColor: "#28a745", color: "#fff" },
        });
      }
      resetForm();
      navigate("/collections");
    } catch (error: any) {
      console.error(error);
      if (error.status == 422) {
        toast.error(error.response.data.message, {
          style: { backgroundColor: "#dc3545", color: "#fff" },
        });
      }
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
              <Link to="/collections">
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
                <CollectionDetails />
              </TabsContent>
            </Tabs>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CollectionAdd;

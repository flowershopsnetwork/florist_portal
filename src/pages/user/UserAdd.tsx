import { createUser, fetchUserById, updateUser } from "@/api/services/userService";
import {
  Button,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/ComponentModule";
import { User } from "@/shared/interfaces/user.interface";
import { Form, Formik } from "formik";
import { ArrowLeft, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import * as Yup from "yup";
import UserDetails from "./UserDetails";

const UserAdd = () => {
  const navigate = useNavigate();
  const { id } = useParams(); 
  const userId = Number(id);
  const [initialValues, setInitialValues] = useState<User>({
    username: "",
    role: "",
    password: "",
    password_confirmation: "",
    can_login: true,
    locked: false
  });

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    role: Yup.string().required("Role is required"),
    ...(userId
      ? {} 
      : {
          password: Yup.string().required("Password is required"),
          password_confirmation: Yup.string().required("Confirm password is required"),
        }),
  });
  

  useEffect(() => {
    if (id) {
      (async () => {
        try {
          const res = await fetchUserById(userId);
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
          toast.error("Failed to fetch user data.", {
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
        const res = await updateUser(userId, values);
        toast.success(res.data.message, {
          style: { backgroundColor: "#28a745", color: "#fff" },
        });
      } else {
        const res = await createUser(values);
        toast.success(res.data.message, {
          style: { backgroundColor: "#28a745", color: "#fff" },
        });
      }
      resetForm();
      navigate("/users");
    } catch (error: any) {
      console.error(error);
      if (error.status == 422) {
        toast.error(error.response.data.message, {
          style: { backgroundColor: "#dc3545", color: "#fff" },
        });
      } else {
        toast.error("Failed to save user. Please try again.", {
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
              <Link to="/users">
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
                <UserDetails userId={userId} />
              </TabsContent>
            </Tabs>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default UserAdd;

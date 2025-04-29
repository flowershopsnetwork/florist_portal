import { fetchRoles } from "@/api/services/roleService";
import { Input, Label, Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/ComponentModule";
import { Role } from "@/shared/interfaces/role.interface";
import { ErrorMessage, useField, useFormikContext } from "formik";
import { useEffect, useState } from "react";

interface UserDetailsProps {
  userId?: number;
}

const UserDetails = ({ userId }: UserDetailsProps) => {
  const { setFieldValue } = useFormikContext();
  const [roles, setRoles] = useState<Role[]>([])

  const [usernameField, usernameMeta] = useField("username");
  const [roleField, roleMeta] = useField("role");
  const [passwordField, passwordMeta] = useField("password");
  const [confirmPasswordField, confirmPasswordMeta] = useField("password_confirmation");
  const [canLoginField] = useField("can_login");
  const [lockedField] = useField("locked");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchRoles({
          page: 0,
          per_page: 10000,
          sort: "name",
          order: "asc",
          search: "",
        });
        setRoles(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <div className="space-y-1">
        <Label>Username</Label>
        <Input
          {...usernameField}
          className={`border p-2 w-full mt-1 ${
            usernameMeta.touched && usernameMeta.error
              ? "border-red-500"
              : "border-gray-300"
          }`}
        />
        <ErrorMessage
          name="username"
          component="p"
          className="text-red-500 text-sm mt-1 italic"
        />
      </div>
      <div className="space-y-1">
        <Label>Role</Label>
        <Select
          onValueChange={(value) => setFieldValue("role", value)}
          value={roleField.value}
        >
          <SelectTrigger
            className={`w-full p-2 mt-1 border ${
              roleMeta.touched && roleMeta.error
                ? "border-red-500"
                : "border-gray-300"
            }`}
          >
            <SelectValue placeholder="Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Select</SelectLabel>
              {roles.map((item) => (
                <SelectItem key={item.id} value={item.id!.toString()}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <ErrorMessage
          name="role"
          component="p"
          className="text-red-500 text-sm mt-1 italic"
        />
      </div>
      {!userId && (
        <>
          <div className="space-y-1">
            <Label>Password</Label>
            <Input
              type="password"
              {...passwordField}
              className={`border p-2 w-full mt-1 ${
                passwordMeta.touched && passwordMeta.error
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            <ErrorMessage
              name="password"
              component="p"
              className="text-red-500 text-sm mt-1 italic"
            />
          </div>
          <div className="space-y-1">
            <Label>Confirm Password</Label>
            <Input
              type="password"
              {...confirmPasswordField}
              className={`border p-2 w-full mt-1 ${
                confirmPasswordMeta.touched && confirmPasswordMeta.error
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            <ErrorMessage
              name="password_confirmation"
              component="p"
              className="text-red-500 text-sm mt-1 italic"
            />
          </div>
        </>
      )}

      <div className="space-y-1">
        <Label>Can login?</Label>
        <Select
          onValueChange={(value) => setFieldValue("can_login", value === "true")}
          value={canLoginField.value?.toString()}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Can login?" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Select</SelectLabel>
              <SelectItem value="true">Yes</SelectItem>
              <SelectItem value="false">No</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1">
        <Label>Locked?</Label>
        <Select
          onValueChange={(value) => setFieldValue("locked", value === "true")}
          value={lockedField.value?.toString()}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="locked?" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Select</SelectLabel>
              <SelectItem value="true">Yes</SelectItem>
              <SelectItem value="false">No</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default UserDetails;

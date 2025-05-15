import { fetchFloristReps, fetchUserById } from "@/api/services/userService";
import {
  Input,
  Label,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/ComponentModule";
import { useDebounce } from "@/hooks/useDebounce";
import { User } from "@/shared/interfaces/user.interface";
import { useField, useFormikContext } from "formik";
import { useEffect, useState } from "react";

interface FloristRepSelectProps {
  id?: number;
}

const FloristRepSelect = ({ id }: FloristRepSelectProps) => {
  const { setFieldValue } = useFormikContext();
  const [floristRepField] = useField("floristrep");
  const [users, setUsers] = useState<User[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [searchUser, setSearchUser] = useState<string>("");
  const debouncedSearchUser = useDebounce(searchUser, 300);
  const filteredUsers = users;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchFloristReps({
          page: 0,
          per_page: 20,
          sort: "username",
          order: "asc",
          search: debouncedSearchUser,
        });
        setUsers(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [debouncedSearchUser]);

  useEffect(() => {
    if (floristRepField.value) {
      const fetchData = async () => {
        try {
          const res = await fetchUserById(floristRepField.value);
          setUser(res.data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }
  }, [floristRepField.value]);
  return (
    <div>
      {id ? (
        <div className="space-y-1">
          <Label htmlFor="floristrep">Florist Representative</Label>
          {user?.id ? (
            <Select
              onValueChange={(value) => setFieldValue("floristrep", value)}
              value={floristRepField.value || ""}
            >
              <SelectTrigger
                id="floristrep"
                name="floristrep"
                className="w-full"
              >
                <SelectValue placeholder="Florist Representative">
                  {user?.username}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <div className="p-2">
                  <Input
                    type="text"
                    placeholder="Search florist representative..."
                    value={searchUser}
                    onChange={(e) => setSearchUser(e.target.value)}
                  />
                </div>
                <SelectGroup>
                  <SelectLabel>Select</SelectLabel>
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((item) =>
                      item.id ? (
                        <SelectItem key={item.id} value={item.id.toString()}>
                          {item.username}
                        </SelectItem>
                      ) : null
                    )
                  ) : (
                    <SelectItem value="no-users" disabled>
                      No florist representative found
                    </SelectItem>
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
          ) : (
            <Select
              onValueChange={(value) =>
                setFieldValue("floristrep", Number(value))
              }
              value={floristRepField.value?.toString() || ""}
            >
              <SelectTrigger
                id="floristrep"
                name="floristrep"
                className="w-full"
              >
                <SelectValue placeholder="Florist Representative">
                  {user?.username || ""}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Select</SelectLabel>
                  {users.length > 0 ? (
                    users.map((item) => (
                      <SelectItem key={item.id} value={item.id!.toString()}>
                        {item.username}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="no-floristrep" disabled>
                      No user found
                    </SelectItem>
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        </div>
      ) : (
        <div className="space-y-1">
          <Label htmlFor="province">Florist Representative</Label>
          <Select
            onValueChange={(value) => setFieldValue("floristrep", value)}
            value={floristRepField.value}
          >
            <SelectTrigger id="floristrep" name="floristrep" className="w-full">
              <SelectValue placeholder="Florist Representative" />
            </SelectTrigger>
            <SelectContent>
              <div className="p-2">
                <Input
                  type="text"
                  placeholder="Search florist representative..."
                  value={searchUser}
                  onChange={(e) => setSearchUser(e.target.value)}
                />
              </div>
              <SelectGroup>
                <SelectLabel>Select</SelectLabel>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((item) => (
                    <SelectItem key={item.id} value={item.id!.toString()}>
                      {item.username}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="no-users" disabled>
                    No florist representative found
                  </SelectItem>
                )}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
};

export default FloristRepSelect;

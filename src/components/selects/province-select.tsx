import {
  fetchProvinceById,
  fetchProvinces,
} from "@/api/services/provinceService";
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
import { Province } from "@/shared/interfaces/province.interface";
import { ErrorMessage, useField, useFormikContext } from "formik";
import { useEffect, useState } from "react";

interface ProvinceSelectProps {
  id?: number;
}

const ProvinceSelect = ({ id }: ProvinceSelectProps) => {
  const { setFieldValue } = useFormikContext();
  const [provinceField, provinceMeta] = useField("province");
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [province, setProvince] = useState<Province | null>(null);
  const [searchProvince, setSearchProvince] = useState<string>("");
  const debouncedSearchProvince = useDebounce(searchProvince, 300);

  useEffect(() => {
    const fetchProvincesData = async () => {
      try {
        const res = await fetchProvinces({
          page: 0,
          per_page: 20,
          sort: "name",
          order: "asc",
          search: debouncedSearchProvince,
        });
        setProvinces(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProvincesData();
  }, [debouncedSearchProvince]);

  useEffect(() => {
    if (provinceField.value) {
      const fetchData = async () => {
        try {
          const res = await fetchProvinceById(provinceField.value);
          setProvince(res.data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }
  }, [provinceField.value]);

  return (
    <div>
      {id ? (
        <div className="space-y-1">
          <Label htmlFor="province">Province</Label>
          {province?.id ? (
            <Select
              onValueChange={(value) =>
                setFieldValue("province", Number(value))
              }
              value={provinceField.value?.toString() || ""}
            >
              <SelectTrigger
                id="province"
                name="province"
                className={`w-full p-2 mt-1 border ${
                  provinceMeta.touched && provinceMeta.error
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              >
                <SelectValue placeholder="Province">
                  {province?.name}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <div className="p-2">
                  <Input
                    type="text"
                    placeholder="Search provinces..."
                    value={searchProvince}
                    onChange={(e) => setSearchProvince(e.target.value)}
                  />
                </div>
                <SelectGroup>
                  <SelectLabel>Select</SelectLabel>
                  {provinces.length > 0 ? (
                    provinces.map((item) => (
                      <SelectItem key={item.id} value={item.id!.toString()}>
                        {item.name}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="no-provinces" disabled>
                      No provinces found
                    </SelectItem>
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
          ) : (
            <Select
              onValueChange={(value) =>
                setFieldValue("province", Number(value))
              }
              value={provinceField.value?.toString() || ""}
            >
              <SelectTrigger
                id="province"
                name="province"
                className={`w-full p-2 mt-1 border ${
                  provinceMeta.touched && provinceMeta.error
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              >
                <SelectValue placeholder="Province">
                  {province?.name || ""}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <div className="p-2">
                    <Input
                      type="text"
                      placeholder="Search provinces..."
                      value={searchProvince}
                      onChange={(e) => setSearchProvince(e.target.value)}
                    />
                  </div>
                  <SelectLabel>Select</SelectLabel>
                  {provinces.length > 0 ? (
                    provinces.map((item) => (
                      <SelectItem key={item.id} value={item.id!.toString()}>
                        {item.name}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="no-provinces" disabled>
                      No provinces found
                    </SelectItem>
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
          <ErrorMessage
            name="province"
            component="p"
            className="text-red-500 text-sm mt-1 italic"
          />
        </div>
      ) : (
        <div className="space-y-1">
          <Label htmlFor="province">Province</Label>
          <Select
            onValueChange={(value) => setFieldValue("province", Number(value))}
            value={provinceField.value?.toString() || ""}
          >
            <SelectTrigger
              id="province"
              name="province"
              className={`w-full p-2 mt-1 border ${
                provinceMeta.touched && provinceMeta.error
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            >
              <SelectValue placeholder="Province">
                {provinces.find(
                  (item) => item.id === Number(provinceField.value)
                )?.name ||
                  province?.name ||
                  ""}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <div className="p-2">
                <Input
                  type="text"
                  placeholder="Search provinces..."
                  value={searchProvince}
                  onChange={(e) => setSearchProvince(e.target.value)}
                />
              </div>
              <SelectGroup>
                <SelectLabel>Select</SelectLabel>
                {provinces.length > 0 ? (
                  provinces.map((item) => (
                    <SelectItem key={item.id} value={item.id!.toString()}>
                      {item.name}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="no-provinces" disabled>
                    No provinces found
                  </SelectItem>
                )}
              </SelectGroup>
            </SelectContent>
          </Select>
          <ErrorMessage
            name="province"
            component="p"
            className="text-red-500 text-sm mt-1 italic"
          />
        </div>
      )}
    </div>
  );
};

export default ProvinceSelect;

import { fetchTownById, fetchTowns } from "@/api/services/townService";
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
import { Town } from "@/shared/interfaces/town.interface";
import { ErrorMessage, useField, useFormikContext } from "formik";
import { useEffect, useState } from "react";

interface TownSelectProps {
  id?: number;
}

const TownSelect = ({ id }: TownSelectProps) => {
  const { setFieldValue } = useFormikContext();
  const [cityField, cityMeta] = useField("city");
  const [cities, setCities] = useState<Town[]>([]);
  const [city, setCity] = useState<Town | null>(null);
  const [searchCity, setSearchCity] = useState<string>("");
  const debouncedCitySearch = useDebounce(searchCity, 300);
  const filteredCities = cities;

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await fetchTowns({
          page: 0,
          per_page: 20,
          sort: "name",
          order: "asc",
          search: debouncedCitySearch,
        });
        setCities(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCities();
  }, [debouncedCitySearch]);

  useEffect(() => {
    if (cityField.value) {
      const fetchData = async () => {
        try {
          const res = await fetchTownById(cityField.value);
          setCity(res.data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }
  }, [cityField.value]);

  return (
    <div>
      {id ? (
        <div className="space-y-1">
          <Label htmlFor="city">City</Label>
          {city?.id ? (
            <Select
              onValueChange={(value) => setFieldValue("city", value)}
              value={cityField.value || ""}
            >
              <SelectTrigger
                id="city"
                name="city"
                className={`w-full p-2 mt-1 border ${
                  cityMeta.touched && cityMeta.error
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              >
                <SelectValue placeholder="City">{city?.name}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <div className="p-2">
                  <Input
                    type="text"
                    placeholder="Search cities..."
                    value={searchCity}
                    onChange={(e) => setSearchCity(e.target.value)}
                  />
                </div>
                <SelectGroup>
                  <SelectLabel>Select</SelectLabel>
                  {filteredCities.length > 0 ? (
                    filteredCities.map((item) =>
                      item.id ? (
                        <SelectItem key={item.id} value={item.id.toString()}>
                          {item.name}
                        </SelectItem>
                      ) : null
                    )
                  ) : (
                    <SelectItem value="no-cities" disabled>
                      No cities found
                    </SelectItem>
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
          ) : (
            <Select>
              <SelectTrigger
                className={`w-full p-2 mt-1 border ${
                  cityMeta.touched && cityMeta.error
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              >
                <SelectValue placeholder="City"></SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Select</SelectLabel>
                  <SelectItem value="0" disabled>
                    No results
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
          <ErrorMessage
            name="city"
            component="p"
            className="text-red-500 text-sm mt-1 italic"
          />
        </div>
      ) : (
        <div className="space-y-1">
          <Label htmlFor="city">City</Label>
          <Select
            onValueChange={(value) => setFieldValue("city", value)}
            value={cityField.value || ""}
          >
            <SelectTrigger
              id="city"
              name="city"
              className={`w-full p-2 mt-1 border ${
                cityMeta.touched && cityMeta.error
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            >
              <SelectValue placeholder="City" />
            </SelectTrigger>
            <SelectContent>
              <div className="p-2">
                <Input
                  type="text"
                  placeholder="Search cities..."
                  value={searchCity}
                  onChange={(e) => setSearchCity(e.target.value)}
                />
              </div>
              <SelectGroup>
                <SelectLabel>Select</SelectLabel>
                {filteredCities.length > 0 ? (
                  filteredCities.map((item) =>
                    item.id ? (
                      <SelectItem key={item.id} value={item.id.toString()}>
                        {item.name}
                      </SelectItem>
                    ) : null
                  )
                ) : (
                  <SelectItem value="no-cities" disabled>
                    No cities found
                  </SelectItem>
                )}
              </SelectGroup>
            </SelectContent>
          </Select>
          <ErrorMessage
            name="city"
            component="p"
            className="text-red-500 text-sm mt-1 italic"
          />
        </div>
      )}
    </div>
  );
};

export default TownSelect;

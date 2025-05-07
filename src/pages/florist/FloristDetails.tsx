import { fetchAccreditionStatuses } from "@/api/services/accreditionStatusService";
import { fetchCollections } from "@/api/services/collectionService";
import { fetchProvinces } from "@/api/services/provinceService";
import { fetchStatuses } from "@/api/services/statusService";
import { fetchTowns } from "@/api/services/townService";
import { fetchFloristReps } from "@/api/services/userService";
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
  Textarea,
} from "@/ComponentModule";
import { useDebounce } from "@/hooks/useDebounce";
import { AccreditionStatus } from "@/shared/interfaces/accredition-status.interface";
import { Collection } from "@/shared/interfaces/collection.interface";
import { Province } from "@/shared/interfaces/province.interface";
import { Status } from "@/shared/interfaces/status.interface";
import { Town } from "@/shared/interfaces/town.interface";
import { User } from "@/shared/interfaces/user.interface";
import { ErrorMessage, useField, useFormikContext } from "formik";
import { useEffect, useState } from "react";

const FloristDetails = () => {
  const { setFieldValue } = useFormikContext();

  const [cities, setCities] = useState<Town[]>([]);
  const [searchCity, setSearchCity] = useState<string>("");
  const debouncedCitySearch = useDebounce(searchCity, 300);
  const filteredCities = cities;

  const [provinces, setProvinces] = useState<Province[]>([]);
  const [searchProvince, setSearchProvince] = useState<string>("");
  const debouncedSearchProvince = useDebounce(searchProvince, 300);
  const filteredProvinces = provinces;

  const [status, setStatus] = useState<Status[]>([]);
  const [floristRep, setFloristRep] = useState<User[]>([]);
  const [accreditions, setAccreditions] = useState<AccreditionStatus[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);

  const [floristNameField, floristNameMeta] = useField("floristname");
  const [contactNumberField, contactNumberMeta] = useField("contactnumber");
  const [addressField, addressMeta] = useField("address");
  const [cityField, cityMeta] = useField("city");
  const [provinceField, provinceMeta] = useField("province");
  const [postcodeField, postcodeMeta] = useField("postcode");
  const [websiteField] = useField("website");
  const [socialMediaField] = useField("socialmedia");
  const [collectionField] = useField("collection");
  const [floristRepField, floristRepMeta] = useField("floristrep");
  const [statusField, statusMeta] = useField("status");
  const [shopifyGidField] = useField("shopifygid");
  const [pageTitleField] = useField("page_title");
  const [metaDescriptionField] = useField("meta_description");
  const [descriptionField] = useField("description");
  const [accreditionStatusField] = useField("accredition_status");
  const [cityNameField] = useField("city_name");
  const [provinceNameField] = useField("province_name");

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetchStatuses({
          page: 0,
          per_page: 100,
          sort: "statusname",
          order: "asc",
          search: "",
        });
        setStatus(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchStatus();
  }, []);

  useEffect(() => {
    const fetchFloristRep = async () => {
      try {
        const res = await fetchFloristReps({
          page: 0,
          per_page: 1000,
          sort: "username",
          order: "asc",
          search: "",
        });
        setFloristRep(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchFloristRep();
  }, []);

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
    const fetchData = async () => {
      try {
        const res = await fetchAccreditionStatuses({
          page: 0,
          per_page: 1000,
          sort: "id",
          order: "asc",
          search: "",
        });
        setAccreditions(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchCollections({
          page: 0,
          per_page: 10000,
          sort: "id",
          order: "asc",
          search: "",
        });
        setCollections(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="mt-5 space-y-8">
      <div>
        <h3 className="text-xl font-medium text-gray-500 mb-4">Basic Info</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          <div>
            <Label htmlFor="floristname">Florist Name</Label>
            <Input
              {...floristNameField}
              id="floristname"
              name="floristname"
              className={`border p-2 w-full mt-1 ${
                floristNameMeta.touched && floristNameMeta.error
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            <ErrorMessage
              name="floristname"
              component="p"
              className="text-red-500 text-sm mt-1 italic"
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="contactnumber">Contact</Label>
            <Input
              {...contactNumberField}
              id="contactnumber"
              name="contactnumber"
              className={`border p-2 w-full mt-1 ${
                contactNumberMeta.touched && contactNumberMeta.error
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            <ErrorMessage
              name="contactnumber"
              component="p"
              className="text-red-500 text-sm mt-1 italic"
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="address">Address</Label>
            <Input
              {...addressField}
              id="address"
              name="address"
              className={`border p-2 w-full mt-1 ${
                addressMeta.touched && addressMeta.error
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            <ErrorMessage
              name="address"
              component="p"
              className="text-red-500 text-sm mt-1 italic"
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="city">City</Label>
            <Select
              onValueChange={(value) => setFieldValue("city", value)}
              value={cityField.value}
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
                <SelectValue placeholder="City">
                  {cityNameField.value || "City"}
                </SelectValue>
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

          <div className="space-y-1">
            <Label htmlFor="province">Province</Label>
            <Select
              onValueChange={(value) => setFieldValue("province", value)}
              value={provinceField.value}
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
                  {provinceNameField.value || "Province"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <div className="p-2">
                  <Input
                    type="text"
                    placeholder="Search province..."
                    value={searchProvince}
                    onChange={(e) => setSearchProvince(e.target.value)}
                  />
                </div>
                <SelectGroup>
                  <SelectLabel>Select</SelectLabel>
                  {filteredProvinces.length > 0 ? (
                    filteredProvinces.map((item) => (
                      <SelectItem key={item.id} value={item.id!.toString()}>
                        {item.name}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="No provinces found" disabled>
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

          <div className="space-y-1">
            <Label htmlFor="postcode">Post Code</Label>
            <Input
              {...postcodeField}
              id="postcode"
              name="postcode"
              className={`border p-2 w-full mt-1 ${
                postcodeMeta.touched && postcodeMeta.error
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            <ErrorMessage
              name="postcode"
              component="p"
              className="text-red-500 text-sm mt-1 italic"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-medium text-gray-500 mb-4">Social Info</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          <div className="space-y-1">
            <Label htmlFor="website">Website</Label>
            <Select
              onValueChange={(value) => setFieldValue("website", value)}
              value={websiteField.value}
            >
              <SelectTrigger id="website" name="website" className="w-full">
                <SelectValue placeholder="Website" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Select</SelectLabel>
                  <SelectItem value="Yes">Yes</SelectItem>
                  <SelectItem value="No">No</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <Label htmlFor="socialmedia">Social Media</Label>
            <Input
              {...socialMediaField}
              id="socialmedia"
              name="socialmedia"
              placeholder="e.g., https://www.facebook.com/florist"
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="collection">Collection</Label>
            <Select
              onValueChange={(value) => setFieldValue("collection", value)}
              value={collectionField.value}
            >
              <SelectTrigger
                id="collection"
                name="collection"
                className="w-full"
              >
                <SelectValue placeholder="Collection" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Select</SelectLabel>
                  {collections.map((item) => (
                    <SelectItem key={item.id} value={item.id.toString()}>
                      {item.title}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-medium text-gray-500 mb-4">Other Info</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          <div className="space-y-1">
            <Label htmlFor="floristrep">Assign</Label>
            <Select
              onValueChange={(value) => setFieldValue("floristrep", value)}
              value={floristRepField.value}
            >
              <SelectTrigger
                id="floristrep"
                name="floristrep"
                className={`w-full p-2 mt-1 border ${
                  floristRepMeta.touched && floristRepMeta.error
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              >
                <SelectValue placeholder="Florist Representative" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Select</SelectLabel>
                  {floristRep.map((item) => (
                    <SelectItem key={item.id} value={item.id!.toString()}>
                      {item.username}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <ErrorMessage
              name="floristrep"
              component="p"
              className="text-red-500 text-sm mt-1 italic"
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="status">Status</Label>
            <Select
              onValueChange={(value) => setFieldValue("status", value)}
              value={statusField.value}
            >
              <SelectTrigger
                id="status"
                name="status"
                className={`w-full p-2 mt-1 border ${
                  statusMeta.touched && statusMeta.error
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              >
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Select</SelectLabel>
                  {status.map((item) => (
                    <SelectItem key={item.id} value={item.id!.toString()}>
                      {item.statusname}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <ErrorMessage
              name="status"
              component="p"
              className="text-red-500 text-sm mt-1 italic"
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="accredition_status">Accredited Status</Label>
            <Select
              onValueChange={(value) =>
                setFieldValue("accredition_status", value)
              }
              value={accreditionStatusField.value}
            >
              <SelectTrigger
                id="accredition_status"
                name="accredition_status"
                className="w-full"
              >
                <SelectValue placeholder="Accredited Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Select</SelectLabel>
                  {accreditions.map((item) => (
                    <SelectItem key={item.id} value={item.id!.toString()}>
                      {item.status}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <Label htmlFor="shopifygid">Shopify GID</Label>
            <Input
              {...shopifyGidField}
              id="shopifygid"
              name="shopifygid"
              disabled
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-medium text-gray-500 mb-4">Page Info</h3>
        <div className="space-y-2 mb-2">
          <Label htmlFor="page_title">Page Title</Label>
          <Input {...pageTitleField} id="page_title" name="page_title" />
        </div>

        <div className="space-y-2 mb-2">
          <Label htmlFor="meta_description">Meta Description</Label>
          <Textarea
            {...metaDescriptionField}
            id="meta_description"
            name="meta_description"
            placeholder="Enter any meta description here..."
          />
        </div>

        <div className="space-y-2 mb-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            {...descriptionField}
            id="description"
            name="description"
            placeholder="Enter any additional notes or info here..."
          />
        </div>
      </div>
    </div>
  );
};

export default FloristDetails;

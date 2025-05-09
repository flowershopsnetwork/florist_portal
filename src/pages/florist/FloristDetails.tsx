import { fetchCollections } from "@/api/services/collectionService";
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
import AccreditionStatusSelect from "@/components/selects/accredited-status-select";
import FloristRepSelect from "@/components/selects/florist-rep-select";
import ProvinceSelect from "@/components/selects/province-select";
import StatusSelect from "@/components/selects/status-select";
import TownSelect from "@/components/selects/town-select";
import { Collection } from "@/shared/interfaces/collection.interface";
import { ErrorMessage, useField, useFormikContext } from "formik";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const FloristDetails = () => {
  const { setFieldValue } = useFormikContext();
  const { id } = useParams();
  const floristId = Number(id);
  

  const [collections, setCollections] = useState<Collection[]>([]);

  const [floristNameField, floristNameMeta] = useField("floristname");
  const [contactNumberField, contactNumberMeta] = useField("contactnumber");
  const [addressField, addressMeta] = useField("address");
  const [postcodeField, postcodeMeta] = useField("postcode");
  const [websiteField] = useField("website");
  const [socialMediaField] = useField("socialmedia");
  const [collectionField] = useField("collection");
  const [shopifyGidField] = useField("shopifygid");
  const [pageTitleField] = useField("page_title");
  const [metaDescriptionField] = useField("meta_description");
  const [descriptionField] = useField("description");

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

          <TownSelect id={floristId}/>
          <ProvinceSelect id={floristId}/>

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

          <FloristRepSelect id={floristId}/>
          <StatusSelect id={floristId}/>
          <AccreditionStatusSelect id={floristId} />

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

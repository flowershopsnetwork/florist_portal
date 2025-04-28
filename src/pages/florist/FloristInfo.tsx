import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ErrorMessage, useField, useFormikContext } from "formik";

const FloristInfo = () => {
  const { setFieldValue } = useFormikContext();
  const [callOutcomeField, callOutcomeMeta] = useField("call_outcome");
  const [productPriceField] = useField("product_price");
  const [productTypeField] = useField("product_type");
  const [deliveryFeeField] = useField("delivery_fee");
  const [sellExtrasField] = useField("sell_extras");
  const [popularityTrendField] = useField("popularity_trend");
  const [preferredCommunicationField] = useField("preferred_communication");
  const [memberOfOtherNetworksField] = useField("member_of_other_networks");
  const [flowerSupplierField] = useField("flower_supplier");
  const [interestedFreeWebsiteField] = useField("interested_in_free_website");
  const [discountOfferField] = useField("discount_offer");
  const [additionalInfoField] = useField("additional_info");

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <div className="space-y-1">
        <Label>Call Outcome</Label>
        <Input
          {...callOutcomeField}
          placeholder="e.g., Reached out via FB"
          className={`border p-2 w-full mt-1 ${
            callOutcomeMeta.touched && callOutcomeMeta.error
              ? "border-red-500"
              : "border-gray-300"
          }`}
        />
        <ErrorMessage
          name="call_outcome"
          component="p"
          className="text-red-500 text-sm mt-1 italic"
        />
      </div>
      <div className="space-y-1">
        <Label>Product Type</Label>
        <Input
          {...productTypeField}
          placeholder="e.g., Bouquets, 6 Red Roses"
        />
      </div>
      <div className="space-y-1">
        <Label>Product Price</Label>
        <Input
          {...productPriceField}
          placeholder="e.g., Bouquets, 6 Red Roses"
        />
      </div>
      <div className="space-y-1">
        <Label>Delivery Fee</Label>
        <Input {...deliveryFeeField} placeholder="100 pesos within the city." />
      </div>
      <div className="space-y-1">
        <Label>Do they sell extras?</Label>
        <Input {...sellExtrasField} placeholder="e.g., Balloons, Chocolates" />
      </div>
      <div className="space-y-1">
        <Label>Are flowers becoming more popular?</Label>
        <Input
          {...popularityTrendField}
          placeholder="e.g., Yes, especially on holidays"
        />
      </div>
      <div className="space-y-1">
        <Label>Preferred Communication</Label>
        <Input
          {...preferredCommunicationField}
          placeholder="e.g., WhatsApp, Phone Call, Messenger"
        />
      </div>
      <div className="space-y-1">
        <Label>Member of Other Networks</Label>
        <Input
          {...memberOfOtherNetworksField}
          placeholder="e.g., NetFlorist, FlowerChimp"
        />
      </div>
      <div className="space-y-1">
        <Label>Flower Supplier</Label>
        <Input {...flowerSupplierField} />
      </div>
      <div className="space-y-1">
        <Label>Interested in Free Website?</Label>
        <Select
          onValueChange={(value) =>
            setFieldValue("interested_in_free_website", value)
          }
          value={interestedFreeWebsiteField.value}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Interested in Free Website?" />
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
        <Label>Discount Offer</Label>
        <Input {...discountOfferField} />
      </div>
      <div className="space-y-1">
        <Label>Additional Info</Label>
        <Textarea
          {...additionalInfoField}
          placeholder="Enter any additional notes or info here..."
        />
      </div>
    </div>
  );
};

export default FloristInfo;

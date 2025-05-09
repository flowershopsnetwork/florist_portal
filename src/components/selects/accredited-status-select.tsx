import {
  fetchAccreditionStatuses,
  fetchAccreditionStatusesById,
} from "@/api/services/accreditionStatusService";
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
import { AccreditionStatus } from "@/shared/interfaces/accredition-status.interface";
import { useField, useFormikContext } from "formik";
import { useEffect, useState } from "react";

interface AccreditedStatusSelectProps {
  id?: number;
}

const AccreditionStatusSelect = ({ id }: AccreditedStatusSelectProps) => {
  const { setFieldValue } = useFormikContext();
  const [accreditionStatusField] = useField("accredition_status");
  const [accreditions, setAccreditions] = useState<AccreditionStatus[]>([]);
  const [accredition, setAccredition] = useState<AccreditionStatus | null>(
    null
  );
  const [searchAccredition, setSearchAccredition] = useState<string>("");
  const debouncedSearchAccredition = useDebounce(searchAccredition, 300);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchAccreditionStatuses({
          page: 0,
          per_page: 20,
          sort: "id",
          order: "asc",
          search: debouncedSearchAccredition,
        });
        setAccreditions(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [debouncedSearchAccredition]);

  useEffect(() => {
    if (accreditionStatusField.value) {
      const fetchData = async () => {
        try {
          const res = await fetchAccreditionStatusesById(
            accreditionStatusField.value
          );
          setAccredition(res.data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }
  }, [accreditionStatusField.value]);

  return (
    <div>
      {id ? (
        <div className="space-y-1">
          <Label htmlFor="accredition_status">Accredited Status</Label>
          {accredition?.id ? (
            <Select
              onValueChange={(value) =>
                setFieldValue("accredition_status", Number(value))
              }
              value={accreditionStatusField.value?.toString() || ""}
            >
              <SelectTrigger
                id="accredition_status"
                name="accredition_status"
                className="w-full"
              >
                <SelectValue placeholder="Accredited Status">
                  {accredition?.status}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <div className="p-2">
                  <Input
                    type="text"
                    placeholder="Search accredited status..."
                    value={searchAccredition}
                    onChange={(e) => setSearchAccredition(e.target.value)}
                  />
                </div>
                <SelectGroup>
                  <SelectLabel>Select</SelectLabel>
                  {accreditions.length > 0 ? (
                    accreditions.map((item) => (
                      <SelectItem key={item.id} value={item.id!.toString()}>
                        {item.status}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="no-statuses" disabled>
                      No accredited status found
                    </SelectItem>
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
          ) : (
            <Select
              onValueChange={(value) =>
                setFieldValue("accredition_status", Number(value))
              }
              value={accreditionStatusField.value?.toString() || ""}
            >
              <SelectTrigger
                id="accredition_status"
                name="accredition_status"
                className="w-full"
              >
                <SelectValue placeholder="Accredited Status">
                  {accredition?.status || ""}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Select</SelectLabel>
                  {accreditions.length > 0 ? (
                    accreditions.map((item) => (
                      <SelectItem key={item.id} value={item.id!.toString()}>
                        {item.status}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="no-status" disabled>
                      No accredited status found
                    </SelectItem>
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        </div>
      ) : (
        <div className="space-y-1">
          <Label htmlFor="accredition_status">Accredited Status</Label>
          <Select
            onValueChange={(value) =>
              setFieldValue("accredition_status", Number(value))
            }
            value={accreditionStatusField.value?.toString() || ""}
          >
            <SelectTrigger
              id="accredition_status"
              name="accredition_status"
              className="w-full"
            >
              <SelectValue placeholder="Accredited Status">
                {accreditions.find(
                  (item) => item.id === Number(accreditionStatusField.value)
                )?.status ||
                  accredition?.status ||
                  ""}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <div className="p-2">
                <Input
                  type="text"
                  placeholder="Search accredited status..."
                  value={searchAccredition}
                  onChange={(e) => setSearchAccredition(e.target.value)}
                />
              </div>
              <SelectGroup>
                <SelectLabel>Select</SelectLabel>
                {accreditions.length > 0 ? (
                  accreditions.map((item) => (
                    <SelectItem key={item.id} value={item.id!.toString()}>
                      {item.status}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="no-status" disabled>
                    No accredited status found
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

export default AccreditionStatusSelect;

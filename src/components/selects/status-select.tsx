import { fetchStatusById, fetchStatuses } from "@/api/services/statusService";
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
import { Status } from "@/shared/interfaces/status.interface";
import { ErrorMessage, useField, useFormikContext } from "formik";
import { useEffect, useState } from "react";

interface StatusSelectProps {
  id?: number;
}

const StatusSelect = ({ id }: StatusSelectProps) => {
  const { setFieldValue } = useFormikContext();
  const [statusField, statusMeta] = useField("status");
  const [statuses, setStatuses] = useState<Status[]>([]);
  const [status, setStatus] = useState<Status | null>(null);
  const [searchStatus, setSearchStatus] = useState<string>("");
  const debouncedSearchStatus = useDebounce(searchStatus, 300);
  const filteredStatuses = statuses;

  useEffect(() => {
    const fetchStatusesData = async () => {
      try {
        const res = await fetchStatuses({
          page: 0,
          per_page: 20,
          sort: "statusname",
          order: "asc",
          search: debouncedSearchStatus,
        });
        setStatuses(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchStatusesData();
  }, [debouncedSearchStatus]);

  useEffect(() => {
    if (statusField.value) {
      const fetchData = async () => {
        try {
          const res = await fetchStatusById(statusField.value);
          setStatus(res.data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }
  }, [statusField.value]);

  return (
    <div>
      {id ? (
        <div className="space-y-1">
          <Label htmlFor="status">Status</Label>
          {status?.id ? (
            <Select
              onValueChange={(value) => setFieldValue("status", value)}
              value={statusField.value || ""}
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
                <SelectValue placeholder="Status">
                  {status?.statusname}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <div className="p-2">
                  <Input
                    type="text"
                    placeholder="Search status..."
                    value={searchStatus}
                    onChange={(e) => setSearchStatus(e.target.value)}
                  />
                </div>
                <SelectGroup>
                  <SelectLabel>Select</SelectLabel>
                  {filteredStatuses.length > 0 ? (
                    filteredStatuses.map((item) =>
                      item.id ? (
                        <SelectItem key={item.id} value={item.id.toString()}>
                          {item.statusname}
                        </SelectItem>
                      ) : null
                    )
                  ) : (
                    <SelectItem value="no-statuses" disabled>
                      No statuses found
                    </SelectItem>
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
          ) : (
            <Select>
              <SelectTrigger
                className={`w-full p-2 mt-1 border ${
                  statusMeta.touched && statusMeta.error
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              >
                <SelectValue placeholder="Status"></SelectValue>
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
            name="status"
            component="p"
            className="text-red-500 text-sm mt-1 italic"
          />
        </div>
      ) : (
        <div className="space-y-1">
          <Label htmlFor="status">Status</Label>
          <Select
            onValueChange={(value) => setFieldValue("status", value)}
            value={statusField.value || ""}
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
              <div className="p-2">
                <Input
                  type="text"
                  placeholder="Search status..."
                  value={searchStatus}
                  onChange={(e) => setSearchStatus(e.target.value)}
                />
              </div>
              <SelectGroup>
                <SelectLabel>Select</SelectLabel>
                {filteredStatuses.length > 0 ? (
                  filteredStatuses.map((item) =>
                    item.id ? (
                      <SelectItem key={item.id} value={item.id.toString()}>
                        {item.statusname}
                      </SelectItem>
                    ) : null
                  )
                ) : (
                  <SelectItem value="no-statuses" disabled>
                    No status found
                  </SelectItem>
                )}
              </SelectGroup>
            </SelectContent>
          </Select>
          <ErrorMessage
            name="status"
            component="p"
            className="text-red-500 text-sm mt-1 italic"
          />
        </div>
      )}
    </div>
  );
};

export default StatusSelect;

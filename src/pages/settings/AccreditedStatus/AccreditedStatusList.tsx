import { fetchAccreditionStatuses } from "@/api/services/accreditionStatusService";
import { DataTable } from "@/components/table/data-table";
import { useDebounce } from "@/hooks/useDebounce";
import { Status } from "@/shared/interfaces/status.interface";
import { SortingState } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { accreditedStatusColumn } from "./utils/column";
import { AccreditedStatusAdd } from "./AccreditedStatusAdd";

export default function AccreditedStatusList() {
  const [data, setData] = useState<Status[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(20);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [searchValue, setSearchValue] = useState<string>("");

  const debouncedSearchValue = useDebounce(searchValue, 300);

  const fetchData = async () => {
    const sortField = sorting[0]?.id;
    const order = sorting[0]?.desc ? "desc" : "asc";

    try {
      const res = await fetchAccreditionStatuses({
        page: pageIndex,
        per_page: pageSize,
        sort: sortField,
        order: sorting.length > 0 ? order : undefined,
        search: debouncedSearchValue,
      });
      setData(res.data);
      setTotal(res.total ?? res.data.length);
    } catch (error) {
      console.error("Failed to fetch status:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [pageIndex, pageSize, sorting, debouncedSearchValue]);

  const columns = accreditedStatusColumn(fetchData);

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Accredited Status</h3>
        </div>
        <AccreditedStatusAdd mode="add" onSuccess={fetchData} />
      </div>
      <div>
        <DataTable
          columns={columns}
          data={data}
          total={total}
          pageIndex={pageIndex}
          pageSize={pageSize}
          onPageChange={setPageIndex}
          onPageSizeChange={setPageSize}
          showCheckbox={false}
          sorting={sorting}
          onSortingChange={setSorting}
          searchValue={searchValue}
          onSearchChange={setSearchValue}
        />
      </div>
    </div>
  );
}

import { fetchFlorists } from "@/api/services/floristService";
import { fetchProvinces } from "@/api/services/provinceService";
import { fetchStatuses } from "@/api/services/statusService";
import { fetchTowns } from "@/api/services/townService";
import { fetchFloristReps } from "@/api/services/userService";
import { DataTable } from "@/components/table/data-table";
import { Button } from "@/components/ui/button";
import { useDebounce } from "@/hooks/useDebounce";
import { Florist } from "@/shared/interfaces/florist.interface";
import { SortingState } from "@tanstack/react-table";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { floristColumn } from "./utils/column";
import { floristFilters } from "./utils/filter";

const FloristList = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<Florist[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(20);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [filterValues, setFilterValues] = useState<{
    city?: string;
    province?: string;
    status?: string;
    floristrep?: string;
  }>({});

  const debouncedSearchValue = useDebounce(searchValue, 300);

  const [cityOptions, setCityOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const [provinceOptions, setProvinceOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const [statusOptions, setStatusOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const [floristRepOptions, setFloristRepOptions] = useState<
    { label: string; value: string }[]
  >([]);

  const handleRowClick = (florist: Florist) => {
    navigate(`/florists/edit/${florist.id}`);
  };

  const fetchData = async () => {
    const sortField = sorting[0]?.id;
    const order = sorting[0]?.desc ? "desc" : "asc";

    try {
      const res = await fetchFlorists({
        page: pageIndex,
        per_page: pageSize,
        sort: sortField,
        order: sorting.length > 0 ? order : undefined,
        search: debouncedSearchValue,
        city: filterValues.city,
        province: filterValues.province,
        status: filterValues.status,
        floristrep: filterValues.floristrep,
      });
      setData(res.data);
      setTotal(res.total ?? res.data.length);
    } catch (error) {
      console.error("Failed to fetch florists:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [pageIndex, pageSize, sorting, debouncedSearchValue, filterValues]);

  useEffect(() => {
    setPageIndex(0);
  }, [debouncedSearchValue]);

  const columns = floristColumn(fetchData);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const [towns, provinces, statuses, floristReps] = await Promise.all([
          fetchTowns({
            page: 0,
            per_page: 10000,
            sort: "name",
            order: "asc",
            search: "",
          }),
          fetchProvinces({
            page: 0,
            per_page: 10000,
            sort: "name",
            order: "asc",
            search: "",
          }),
          fetchStatuses({
            page: 0,
            per_page: 10000,
            sort: "id",
            order: "asc",
            search: "",
          }),
          fetchFloristReps({
            page: 0,
            per_page: 10000,
            sort: "username",
            order: "asc",
            search: "",
          }),
        ]);

        const mappedCities = towns.data.map((item: any) => ({
          label: item.name,
          value: item.id,
        }));

        const mappedProvinces = provinces.data.map((item: any) => ({
          label: item.name,
          value: item.id,
        }));

        const mappedStatuses = statuses.data.map((item: any) => ({
          label: item.statusname,
          value: item.id,
        }));

        const mappedFloristReps = floristReps.data.map((user: any) => ({
          label: user.username,
          value: user.id,
        }));

        setCityOptions(mappedCities);
        setProvinceOptions(mappedProvinces);
        setStatusOptions(mappedStatuses);
        setFloristRepOptions(mappedFloristReps);
      } catch (error: any) {
        console.error("Error in fetchFilters:", error?.message || error);
      }
    };

    fetchFilters();
  }, []);

  const handleFilterChange = (columnId: string, value: string | undefined) => {
    setFilterValues((prev) => ({
      ...prev,
      [columnId]: value,
    }));
    setPageIndex(0);
  };

  const handleResetFilters = () => {
    setFilterValues({});
    setPageIndex(0);
  };

  const updatedFilters = floristFilters.map((filter) => {
    if (filter.id === "city") {
      return {
        ...filter,
        options: cityOptions,
        value: filterValues.city,
      };
    }

    if (filter.id === "province") {
      return {
        ...filter,
        options: provinceOptions,
        value: filterValues.province,
      };
    }

    if (filter.id === "status") {
      return {
        ...filter,
        options: statusOptions,
        value: filterValues.status,
      };
    }

    if (filter.id === "floristrep") {
      return {
        ...filter,
        options: floristRepOptions,
        value: filterValues.floristrep,
      };
    }

    return filter;
  });

  return (
    <div className="p-5">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold tracking-tight">Florists</h1>
        <Link to="/florists/create">
          <Button>
            <Plus />
            Add New Florist
          </Button>
        </Link>
      </div>

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
        filterableColumns={updatedFilters}
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        onFilterChange={handleFilterChange}
        onResetFilters={handleResetFilters}
        onRowClick={handleRowClick}
      />
    </div>
  );
};

export default FloristList;

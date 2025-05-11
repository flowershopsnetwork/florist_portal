import { fetchCollections } from "@/api/services/collectionService";
import { DataTable } from "@/components/table/data-table";
import { Button } from "@/components/ui/button";
import { useDebounce } from "@/hooks/useDebounce";
import { Collection } from "@/shared/interfaces/collection.interface";
import { SortingState } from "@tanstack/react-table";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { collectionColumn } from "./utils/column";

const CollectionList = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<Collection[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(20);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [searchValue, setSearchValue] = useState<string>("");

  const debouncedSearchValue = useDebounce(searchValue, 300);

    const handleRowClick = (florist: Collection) => {
    navigate(`/collections/edit/${florist.id}`);
  };

  const fetchData = async () => {
    const sortField = sorting[0]?.id;
    const order = sorting[0]?.desc ? "desc" : "asc";

    try {
      const res = await fetchCollections({
        page: pageIndex,
        per_page: pageSize,
        sort: sortField,
        order: sorting.length > 0 ? order : undefined,
        search: debouncedSearchValue,
      });
      setData(res.data);
      setTotal(res.total ?? res.data.length);
    } catch (error) {
      console.error("Failed to fetch collections:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [pageIndex, pageSize, sorting, debouncedSearchValue]);

  const columns = collectionColumn(fetchData);

  return (
    <div className="p-5">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold tracking-tight">Collections</h1>
        <Link to="/collections/create">
          <Button>
            <Plus />
            Add New Collection
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
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        onRowClick={handleRowClick}
      />
    </div>
  );
};

export default CollectionList;

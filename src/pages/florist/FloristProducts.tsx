import { fetchFloristProducts } from "@/api/services/floristService";
import { DataTable } from "@/components/table/data-table";
import { useDebounce } from "@/hooks/useDebounce";
import { Product } from "@/shared/interfaces/product.interface";
import { SortingState } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { productColumn } from "./utils/product-column";

const FloristProducts = () => {
  const { id } = useParams();
  const floristId = Number(id);
  const [data, setData] = useState<Product[]>([]);
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
      const res = await fetchFloristProducts(
        {
          page: pageIndex,
          per_page: pageSize,
          sort: sortField,
          order,
          search: debouncedSearchValue,
        },
        floristId
      );
      setData(res.data);
      setTotal(res.total ?? res.data.length);
    } catch (error) {
      console.error("Failed to fetch florist products:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [pageIndex, pageSize, sorting, debouncedSearchValue]);

  const columns = productColumn(fetchData);

  return (
    <div className="p-5">
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
  );
};

export default FloristProducts;

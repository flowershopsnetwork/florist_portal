import { fetchProducts } from "@/api/services/productService";
import { DataTable } from "@/components/table/data-table";
import { Button } from "@/components/ui/button";
import { useDebounce } from "@/hooks/useDebounce";
import { Product } from "@/shared/interfaces/product.interface";
import { SortingState } from "@tanstack/react-table";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { productColumn } from "./utils/column";

const ProductList = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<Product[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(20);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [searchValue, setSearchValue] = useState<string>("");

  const debouncedSearchValue = useDebounce(searchValue, 300);

  const handleRowClick = (florist: Product) => {
    navigate(`/products/edit/${florist.id}`);
  };

  const fetchData = async () => {
    const sortField = sorting[0]?.id;
    const order = sorting[0]?.desc ? "desc" : "asc";

    try {
      const res = await fetchProducts({
        page: pageIndex,
        per_page: pageSize,
        sort: sortField,
        order: sorting.length > 0 ? order : undefined,
        search: debouncedSearchValue,
      });
      setData(res.data);
      setTotal(res.total ?? res.data.length);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [pageIndex, pageSize, sorting, debouncedSearchValue]);

  const columns = productColumn(fetchData);

  return (
    <div className="p-5">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold tracking-tight">Products</h1>
        <Link to="/products/create">
          <Button>
            <Plus />
            Add New Product
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

export default ProductList;

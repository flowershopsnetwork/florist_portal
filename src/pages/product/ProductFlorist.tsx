import {
  createFloristProduct,
  fetchFloristsbyProduct,
} from "@/api/services/floristProductService";
import { fetchFlorists } from "@/api/services/floristService";
import {
  Button,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ComponentModule";
import { useDebounce } from "@/hooks/useDebounce";
import { Florist } from "@/shared/interfaces/florist.interface";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const ProductFlorist = () => {
  const { id } = useParams();
  const productId = Number(id);

  const [florists, setFlorists] = useState<Florist[]>([]);
  const [floristLists, setFloristLists] = useState<Florist[]>([]);
  const [searchFlorist, setSearchFlorist] = useState<string>("");
  const [selectedFlorist, setSelectedFlorist] = useState<string | undefined>();
  const debouncedCitySearch = useDebounce(searchFlorist, 300);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchFlorists({
          page: 0,
          per_page: 20,
          sort: "floristname",
          order: "asc",
          search: debouncedCitySearch,
        });
        setFlorists(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [debouncedCitySearch]);

  const fetchProductFlorists = async () => {
    try {
      const res = await fetchFloristsbyProduct(productId);
      setFloristLists(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProductFlorists();
  }, [fetchProductFlorists]);

  const handleAdd = async () => {
    if (!selectedFlorist) {
      toast.error("The florist field is required", {
        style: { backgroundColor: "#dc3545", color: "#fff" },
      });
      return;
    }

    const payload = {
      floristid: Number(selectedFlorist),
      productid: Number(productId),
    };

    try {
      const res = await createFloristProduct(payload);
      toast.success(res.data.message, {
        style: { backgroundColor: "#28a745", color: "#fff" },
      });
    } catch (error: any) {
      if (error.status == 422) {
        toast.error(error.response.data.message, {
          style: { backgroundColor: "#dc3545", color: "#fff" },
        });
      }
    }
  };

  return (
    <div className="space-y-5">
      <h3 className="text-xl font-medium text-gray-500 mb-4">Assigned Florist</h3>
      <div className="flex gap-2">
        <Select
          value={selectedFlorist}
          onValueChange={(value) => setSelectedFlorist(value)}
        >
          <SelectTrigger className="col-span-3">
            <SelectValue placeholder="Select a florist" />
          </SelectTrigger>
          <SelectContent>
            <div className="p-2">
              <Input
                type="text"
                placeholder="Search florists..."
                value={searchFlorist}
                onChange={(e) => setSearchFlorist(e.target.value)}
              />
            </div>
            {florists.length > 0 ? (
              florists.map((florist) => (
                <SelectItem key={florist.id} value={String(florist.id)}>
                  {florist.floristname}
                </SelectItem>
              ))
            ) : (
              <div className="p-2 text-sm text-gray-500">No florists found</div>
            )}
          </SelectContent>
        </Select>
        <Button type="button" onClick={handleAdd}>
          Save
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Florist</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {floristLists &&
            floristLists.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">
                  {item.floristcode} - {item.floristname}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductFlorist;

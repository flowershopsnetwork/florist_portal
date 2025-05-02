import { fetchProvinces } from "@/api/services/provinceService"
import { DataTable } from "@/components/table/data-table"
import { Button } from "@/components/ui/button"
import { useDebounce } from "@/hooks/useDebounce"
import { Province } from "@/shared/interfaces/province.interface"
import { SortingState } from "@tanstack/react-table"
import { Plus } from "lucide-react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { provinceColumn } from "./utils/column"

const ProvinceList = () => {
    const [data, setData] = useState<Province[]>([])
    const [total, setTotal] = useState<number>(0)
    const [pageIndex, setPageIndex] = useState<number>(0)
    const [pageSize, setPageSize] = useState<number>(20)
    const [sorting, setSorting] = useState<SortingState>([])
    const [searchValue, setSearchValue] = useState<string>("")

    const debouncedSearchValue = useDebounce(searchValue, 300)

    const fetchData = async () => {
        const sortField = sorting[0]?.id
        const order = sorting[0]?.desc ? "desc" : "asc"
    
        try {
            const res = await fetchProvinces({
                page: pageIndex,
                per_page: pageSize,
                sort: sortField,
                order: sorting.length > 0 ? order : undefined,
                search: debouncedSearchValue,
            })
            setData(res.data)
            setTotal(res.total ?? res.data.length)
        } catch (error) {
            console.error("Failed to fetch province:", error)
        }
    }
    
    useEffect(() => {
        fetchData()
    }, [pageIndex, pageSize, sorting, debouncedSearchValue])   

    const columns = provinceColumn(fetchData) 

    return (
        <div className="p-5">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold tracking-tight">Provinces</h1>
                <Link to="/provinces/create">
                    <Button>
                        <Plus />
                        Add New Province
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
            />
        </div>
    )
}

export default ProvinceList

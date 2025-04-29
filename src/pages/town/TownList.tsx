import { fetchTowns } from "@/api/services/townService"
import { DataTable } from "@/components/table/data-table"
import { Button } from "@/components/ui/button"
import { useDebounce } from "@/hooks/useDebounce"
import { Town } from "@/shared/interfaces/town.interface"
import { SortingState } from "@tanstack/react-table"
import { Plus } from "lucide-react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { townColumn } from "./utils/column"

const TownList = () => {
    const [data, setData] = useState<Town[]>([])
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
            const res = await fetchTowns({
                page: pageIndex,
                per_page: pageSize,
                sort: sortField,
                order: sorting.length > 0 ? order : undefined,
                search: debouncedSearchValue,
            })
            setData(res.data)
            setTotal(res.total ?? res.data.length)
        } catch (error) {
            console.error("Failed to fetch towns:", error)
        }
    }
    
    useEffect(() => {
        fetchData()
    }, [pageIndex, pageSize, sorting, debouncedSearchValue])   

    const columns = townColumn(fetchData) 

    return (
        <div className="p-5">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold tracking-tight">Towns</h1>
                <Link to="/towns/create">
                    <Button>
                        <Plus />
                        Add New Town
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

export default TownList

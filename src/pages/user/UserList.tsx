import { fetchUsers } from "@/api/services/userService"
import { DataTable } from "@/components/table/data-table"
import { Button } from "@/components/ui/button"
import { useDebounce } from "@/hooks/useDebounce"
import { User } from "@/shared/interfaces/user.interface"
import { SortingState } from "@tanstack/react-table"
import { Plus } from "lucide-react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { userColumn } from "./utils/column"

const UserList = () => {
    const [data, setData] = useState<User[]>([])
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
            const res = await fetchUsers({
                page: pageIndex,
                per_page: pageSize,
                sort: sortField,
                order: sorting.length > 0 ? order : undefined,
                search: debouncedSearchValue,
            })
            setData(res.data)
            setTotal(res.total ?? res.data.length)
        } catch (error) {
            console.error("Failed to fetch users:", error)
        }
    }
    
    useEffect(() => {
        fetchData()
    }, [pageIndex, pageSize, sorting, debouncedSearchValue])   

    const columns = userColumn(fetchData) 

    return (
        <div className="p-5">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold tracking-tight">Users</h1>
                <Link to="/users/create">
                    <Button>
                        <Plus />
                        Add New User
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

export default UserList

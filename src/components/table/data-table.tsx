import { DataTableFacetedFilter } from "@/components/table/data-table-faceted-filter"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
    type ColumnDef,
    type ColumnFiltersState,
    type FilterFn,
    type OnChangeFn,
    type SortingState,
    type VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Settings2, X } from "lucide-react"
import * as React from "react"

export interface FacetedFilterOption {
    label: string
    value: string
    icon?: React.ComponentType<{ className?: string }>
}

export interface FilterableColumn {
    id: string
    title: string
    options: FacetedFilterOption[]
}

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    total: number
    pageIndex: number
    pageSize: number
    onPageChange: (pageIndex: number) => void
    onPageSizeChange: (pageSize: number) => void
    showCheckbox?: boolean
    filterableColumns?: FilterableColumn[]
    sorting: SortingState
    onSortingChange: OnChangeFn<SortingState>
    searchValue: string // Search value prop
    onSearchChange: (searchValue: string) => void // Function to handle search changes
    onFilterChange?: (columnId: string, value: string | undefined) => void // Added for filter changes
    onResetFilters?: () => void // Added for resetting all filters at once
}

const includesSome: FilterFn<unknown> = (row, columnId, filterValue: string[]) => {
    const rowValue = row.getValue<string>(columnId)
    return filterValue.includes(rowValue)
}

export function DataTable<TData, TValue>({
    columns,
    data,
    total,
    pageIndex,
    pageSize,
    onPageChange,
    onPageSizeChange,
    showCheckbox = true,
    filterableColumns = [],
    // sorting,
    onSortingChange,
    searchValue,
    onSearchChange,
    onFilterChange,
    onResetFilters,
}: DataTableProps<TData, TValue>) {
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

    const filteredColumns = React.useMemo(() => {
        return showCheckbox ? columns : columns.filter((col) => col.id !== "select")
    }, [columns, showCheckbox])

    const table = useReactTable({
        data,
        columns: filteredColumns,
        filterFns: { includesSome },
        manualPagination: true,
        pageCount: Math.ceil(total / pageSize),
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            columnFilters,
            columnVisibility,
            rowSelection,
            pagination: {
                pageIndex,
                pageSize,
            },
        },
        onSortingChange: (newSorting) => {
            onSortingChange(newSorting)
        },
        onPaginationChange: (updater) => {
            const next = typeof updater === "function" ? updater({ pageIndex, pageSize }) : updater
            onPageChange(next.pageIndex)
            onPageSizeChange(next.pageSize)
        },
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        enableRowSelection: showCheckbox,
    })

    const isFiltered = table.getState().columnFilters.length > 0

    const handleResetFilters = () => {
        table.resetColumnFilters()

        if (onResetFilters) {
            onResetFilters()
        }
        else if (onFilterChange) {
            filterableColumns.forEach((col) => {
                onFilterChange(col.id, undefined)
            })
        }
    }

    const formatColumnLabel = (id: string): string => {
        return id
            .split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    const renderPagination = () => (
        <div className="flex items-center justify-between px-2">
            <div className="flex-1 text-sm text-muted-foreground">
                {table.options.enableRowSelection && (
                    <>
                        {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s)
                        selected.
                    </>
                )}
            </div>
            <div className="flex items-center space-x-6 lg:space-x-8">
                <div className="hidden md:flex items-center justify-center text-sm font-medium">
                    Items per page
                </div>
                <div className="flex items-center space-x-2">
                    <Select value={`${pageSize}`} onValueChange={(value) => onPageSizeChange(Number(value))}>
                        <SelectTrigger className="h-8 w-[70px]">
                            <SelectValue placeholder={pageSize} />
                        </SelectTrigger>
                        <SelectContent side="top">
                            {[10, 20, 30, 40, 50].map((size) => (
                                <SelectItem key={size} value={`${size}`}>
                                    {size}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="hidden md:flex items-center justify-center text-sm font-medium">
                    Showing {table.getState().pagination.pageIndex + 1} to {table.getPageCount()} of {total} results
                </div>
                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() => onPageChange(0)}
                        disabled={pageIndex === 0}
                    >
                        <ChevronsLeft className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() => onPageChange(pageIndex - 1)}
                        disabled={pageIndex === 0}
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    
                    <Button
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() => onPageChange(pageIndex + 1)}
                        disabled={(pageIndex + 1) * pageSize >= total}
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() => onPageChange(Math.ceil(total / pageSize) - 1)}
                        disabled={(pageIndex + 1) * pageSize >= total}
                    >
                        <ChevronsRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    )

    const renderViewOptions = () => (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="ml-auto h-8 lg:flex">
                    <Settings2 className="mr-2 h-4 w-4" />
                    View
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[150px]">
                <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {table
                    .getAllColumns()
                    .filter((col) => typeof col.accessorFn !== "undefined" && col.getCanHide())
                    .map((col) => (
                        <DropdownMenuCheckboxItem
                            key={col.id}
                            className="capitalize"
                            checked={col.getIsVisible()}
                            onCheckedChange={(value) => col.toggleVisibility(!!value)}
                        >
                            {formatColumnLabel(col.id)}
                        </DropdownMenuCheckboxItem>
                    ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex flex-wrap items-center space-x-2 space-y-2 md:space-y-0">
                    <div className="flex space-x-2">
                        <Input
                            placeholder="Search"
                            value={searchValue} 
                            onChange={(e) => onSearchChange(e.target.value)} 
                            className="h-8 md:w-[250px]"
                        />
                        {renderViewOptions()}
                    </div>
                    <div className="flex flex-wrap items-center space-x-2 space-y-2 md:space-y-0">
                        {filterableColumns.map((col) => {
                            const column = table.getColumn(col.id)
                            return (
                                column && (
                                    <DataTableFacetedFilter
                                        key={col.id}
                                        column={column}
                                        title={col.title}
                                        options={col.options}
                                        onFilterChange={(value) => onFilterChange?.(col.id, value)}
                                    />
                                )
                            )
                        })}
                        {isFiltered && (
                            <Button variant="ghost" onClick={handleResetFilters} className="h-8 px-2 lg:px-3">
                                Reset
                                <X className="ml-2 h-4 w-4" />
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            <div className="rounded-md border overflow-auto max-h-[600px]">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    {/* No results. */}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {renderPagination()}
        </div>
    )
}

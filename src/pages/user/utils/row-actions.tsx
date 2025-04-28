import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { Row } from "@tanstack/react-table"
import { MoreHorizontal, Pen, Trash } from "lucide-react"

interface UserRowActionsProps<TData> {
    row: Row<TData>
}

export function UserRowActions<TData>({ row }: UserRowActionsProps<TData>) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => navigator.clipboard.writeText(row.getValue("id"))}>Copy ID</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Pen className="mr-2 h-4 w-4" />
                    Edit
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Trash className="mr-2 h-4 w-4" />
                    Delete
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Trash className="mr-2 h-4 w-4" />
                    View
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

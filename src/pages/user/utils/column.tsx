import { Badge, Checkbox } from "@/ComponentModule"
import { DataTableColumnHeader } from "@/components/table/data-table-column-header"
import { User } from "@/shared/interfaces/user.interface"
import type { ColumnDef } from "@tanstack/react-table"
import { UserRowActions } from "./row-actions"

export const userColumn = (refetchUsers: () => void): ColumnDef<User>[] => [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "username",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Username" />,
    },
    {
        accessorKey: "role_name",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Role" />,
        enableSorting: false,
    },
    {
        accessorKey: "can_login",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Can Login" />,         
        cell: ({ row }) => {
            const canLogin = row.original.can_login 
            return (
                <Badge variant={canLogin === false ? "default" : canLogin === true ? "success" : "secondary"} className="text-white">
                    {canLogin === true ? 'Yes' : 'No'}
                </Badge>
            )
        },
    },
    {
        accessorKey: "locked",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Locked" />,         
        cell: ({ row }) => {
            const isLocked = row.original.locked 
            return (
                <Badge variant={isLocked === false ? "default" : isLocked === true ? "success" : "secondary"} className="text-white">
                    {isLocked === true ? 'Yes' : 'No'}
                </Badge>
            )
        },
    },
    {
        id: "actions",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Actions" />,
        cell: ({ row }) => <UserRowActions row={row} refetchUsers={refetchUsers} />,
    }
]

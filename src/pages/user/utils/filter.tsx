export type UserFilter = {
    id: string
    title: string
    options: UserOption[]
}

type UserOption = {
    label: string
    value: string
}

export const UserFilters: UserFilter[] = [
    {
        id: "status",
        title: "Status",
        options: [
            { label: "Active", value: "active" },
            { label: "Inactive", value: "inactive" },
            { label: "Pending", value: "pending" },
        ],
    },
    {
        id: "role",
        title: "Role",
        options: [
            { label: "Admin", value: "Admin" },
            { label: "Editor", value: "Editor" },
            { label: "User", value: "User" },
        ],
    },
]

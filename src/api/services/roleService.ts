import { PaginatedResponse } from "@/shared/interfaces/list.interface";
import { Role } from "@/shared/interfaces/role.interface";
import { DELETE, GET, POST, PUT } from "../restRequest";

interface RoleParams {
    page?: number;
    per_page?: number;
    sort?: string;
    order?: "asc" | "desc";
    search?: string;
}

export const fetchRoles = (
    params: RoleParams
): Promise<PaginatedResponse<Role>> => {
    const query = new URLSearchParams();

    if (params.page) query.append("page", String(params.page));
    if (params.per_page) query.append("per_page", String(params.per_page));
    if (params.sort) query.append("sort", params.sort);
    if (params.order) query.append("order", params.order);
    if (params.search) query.append("search", params.search);
    
    return GET<PaginatedResponse<Role>>(`/roles?${query.toString()}`).then(
        (res) => {
            return res.data;
        }
    );
};

export const createRole = (data: Role) => {
    return POST(`/roles`, data);
};

export const fetchRoleById = (id: number) => {
    return GET(`/roles/${id}`);
};

export const updateRole = (id: number, data: Partial<Role>) => {
    return PUT(`/roles/${id}`, data);
};

export const deleteRole = (id: number) => {
    return DELETE(`/roles/${id}`);
};


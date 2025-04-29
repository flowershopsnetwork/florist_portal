import { PaginatedResponse } from "@/shared/interfaces/list.interface";
import { User } from "@/shared/interfaces/user.interface";
import { DELETE, GET, POST, PUT } from "../restRequest";

interface UserParams {
    page?: number;
    per_page?: number;
    sort?: string;
    order?: "asc" | "desc";
    search?: string;
}

export const fetchFloristReps = (
    params: UserParams
): Promise<PaginatedResponse<User>> => {
    const query = new URLSearchParams();

    if (params.page) query.append("page", String(params.page));
    if (params.per_page) query.append("per_page", String(params.per_page));
    if (params.sort) query.append("sort", params.sort);
    if (params.order) query.append("order", params.order);
    if (params.search) query.append("search", params.search);
    
    return GET<PaginatedResponse<User>>(`/florist_reps?${query.toString()}`).then(
        (res) => {
            return res.data;
        }
    );
};

export const fetchUsers = (
    params: UserParams
): Promise<PaginatedResponse<User>> => {
    const query = new URLSearchParams();

    if (params.page) query.append("page", String(params.page));
    if (params.per_page) query.append("per_page", String(params.per_page));
    if (params.sort) query.append("sort", params.sort);
    if (params.order) query.append("order", params.order);
    if (params.search) query.append("search", params.search);
    
    return GET<PaginatedResponse<User>>(`/users?${query.toString()}`).then(
        (res) => {
            return res.data;
        }
    );
};

export const createUser = (data: User) => {
    return POST(`/users`, data);
};

export const fetchUserById = (id: number) => {
    return GET(`/users/${id}`);
};

export const updateUser = (id: number, data: Partial<User>) => {
    return PUT(`/users/${id}`, data);
};

export const deleteUser = (id: number) => {
    return DELETE(`/users/${id}`);
};

import { PaginatedResponse } from "@/shared/interfaces/list.interface";
import { Status } from "@/shared/interfaces/status.interface";
import { DELETE, GET, POST, PUT } from "../restRequest";

interface StatusParams {
    page?: number;
    per_page?: number;
    sort?: string;
    order?: "asc" | "desc";
    search?: string;
}

export const fetchStatuses = (
    params: StatusParams
): Promise<PaginatedResponse<Status>> => {
    const query = new URLSearchParams();

    if (params.page) query.append("page", String(params.page));
    if (params.per_page) query.append("per_page", String(params.per_page));
    if (params.sort) query.append("sort", params.sort);
    if (params.order) query.append("order", params.order);
    if (params.search) query.append("search", params.search);
    
    return GET<PaginatedResponse<Status>>(`/statuses?${query.toString()}`).then(
        (res) => {
            return res.data;
        }
    );
};

export const createStatus = (data: Status) => {
    return POST(`/statuses`, data);
};

export const fetchStatusById = (id: number) => {
    return GET(`/statuses/${id}`);
};

export const updateStatus = (id: number, data: Partial<Status>) => {
    return PUT(`/statuses/${id}`, data);
};

export const deleteStatus = (id: number) => {
    return DELETE(`/statuses/${id}`);
};

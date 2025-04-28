import { PaginatedResponse } from "@/shared/interfaces/list.interface";
import { Status } from "@/shared/interfaces/status.interface";
import { GET } from "../restRequest";

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

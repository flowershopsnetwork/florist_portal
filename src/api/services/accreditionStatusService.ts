import { AccreditionStatus } from "@/shared/interfaces/accredition-status.interface";
import { Florist } from "@/shared/interfaces/florist.interface";
import { PaginatedResponse } from "@/shared/interfaces/list.interface";
import { DELETE, GET, POST, PUT } from "../restRequest";

interface AccreditionStatusParams {
    page?: number;
    per_page?: number;
    sort?: string;
    order?: "asc" | "desc";
    search?: string;
}

export const fetchAccreditionStatuses = (
    params: AccreditionStatusParams
): Promise<PaginatedResponse<AccreditionStatus>> => {
    const query = new URLSearchParams();

    if (params.page) query.append("page", String(params.page));
    if (params.per_page) query.append("per_page", String(params.per_page));
    if (params.sort) query.append("sort", params.sort);
    if (params.order) query.append("order", params.order);
    if (params.search) query.append("search", params.search);

    return GET<PaginatedResponse<AccreditionStatus>>(`/accredited-statuses?${query.toString()}`).then(
        (res) => {
            return res.data;
        }
    );
};

export const createAccreditionStatuses = (data: Florist) => {
    return POST(`/accredited-statuses`, data);
};

export const fetchAccreditionStatusesById = (id: number) => {
    return GET(`/accredited-statuses/${id}`);
};

export const updateAccreditionStatuses = (id: number, data: Partial<AccreditionStatus>) => {
    return PUT(`/accredited-statuses/${id}`, data);
};

export const deleteAccreditionStatuses = (id: number) => {
    return DELETE(`/accredited-statuses/${id}`);
};

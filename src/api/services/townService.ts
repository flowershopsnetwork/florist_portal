import { PaginatedResponse } from "@/shared/interfaces/list.interface";
import { Town } from "@/shared/interfaces/town.interface";
import { DELETE, GET, POST, PUT } from "../restRequest";

interface TownParams {
    page?: number;
    per_page?: number;
    sort?: string;
    order?: "asc" | "desc";
    search?: string;
}

export const fetchTowns = (
    params: TownParams
): Promise<PaginatedResponse<Town>> => {
    const query = new URLSearchParams();

    if (params.page) query.append("page", String(params.page));
    if (params.per_page) query.append("per_page", String(params.per_page));
    if (params.sort) query.append("sort", params.sort);
    if (params.order) query.append("order", params.order);
    if (params.search) query.append("search", params.search);
    
    return GET<PaginatedResponse<Town>>(`/towns?${query.toString()}`).then(
        (res) => {
            return res.data;
        }
    );
};

export const createTown = (data: Town) => {
    return POST(`/towns`, data);
};

export const fetchTownById = (id: number) => {
    return GET(`/towns/${id}`);
};

export const updateTown = (id: number, data: Partial<Town>) => {
    return PUT(`/towns/${id}`, data);
};

export const deleteTown = (id: number) => {
    return DELETE(`/towns/${id}`);
};


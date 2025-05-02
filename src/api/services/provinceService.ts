import { PaginatedResponse } from "@/shared/interfaces/list.interface";
import { Province } from "@/shared/interfaces/province.interface";
import { DELETE, GET, POST, PUT } from "../restRequest";

interface ProvinceParams {
    page?: number;
    per_page?: number;
    sort?: string;
    order?: "asc" | "desc";
    search?: string;
}

export const fetchProvinces = (
    params: ProvinceParams
): Promise<PaginatedResponse<Province>> => {
    const query = new URLSearchParams();

    if (params.page) query.append("page", String(params.page));
    if (params.per_page) query.append("per_page", String(params.per_page));
    if (params.sort) query.append("sort", params.sort);
    if (params.order) query.append("order", params.order);
    if (params.search) query.append("search", params.search);
    
    return GET<PaginatedResponse<Province>>(`/provinces?${query.toString()}`).then(
        (res) => {
            return res.data;
        }
    );
};

export const createProvince = (data: Province) => {
    return POST(`/provinces`, data);
};

export const fetchProvinceById = (id: number) => {
    return GET(`/provinces/${id}`);
};

export const updateProvince = (id: number, data: Partial<Province>) => {
    return PUT(`/provinces/${id}`, data);
};

export const deleteProvince = (id: number) => {
    return DELETE(`/provinces/${id}`);
};


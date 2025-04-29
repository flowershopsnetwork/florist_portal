import { Collection } from "@/shared/interfaces/collection.interface";
import { PaginatedResponse } from "@/shared/interfaces/list.interface";
import { DELETE, GET, POST, PUT } from "../restRequest";

interface CollectionParams {
    page?: number;
    per_page?: number;
    sort?: string;
    order?: "asc" | "desc";
    search?: string;
}

export const fetchCollections = (
    params: CollectionParams
): Promise<PaginatedResponse<Collection>> => {
    const query = new URLSearchParams();

    if (params.page) query.append("page", String(params.page));
    if (params.per_page) query.append("per_page", String(params.per_page));
    if (params.sort) query.append("sort", params.sort);
    if (params.order) query.append("order", params.order);
    if (params.search) query.append("search", params.search);

    return GET<PaginatedResponse<Collection>>(`/collections?${query.toString()}`).then(
        (res) => {
            return res.data;
        }
    );
};

export const createCollection = (data: Collection) => {
    return POST(`/collections`, data);
};

export const fetchCollectionById = (id: number) => {
    return GET(`/collections/${id}`);
};

export const updateCollection = (id: number, data: Partial<Collection>) => {
    return PUT(`/collections/${id}`, data);
};

export const deleteCollection = (id: number) => {
    return DELETE(`/collections/${id}`);
};

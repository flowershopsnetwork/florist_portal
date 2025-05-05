import { PaginatedResponse } from "@/shared/interfaces/list.interface";
import { Product } from "@/shared/interfaces/product.interface";
import { DELETE, GET, POST, PUT } from "../restRequest";

interface ProductParams {
    page?: number;
    per_page?: number;
    sort?: string;
    order?: "asc" | "desc";
    search?: string;
}

export const fetchProducts = (
    params: ProductParams
): Promise<PaginatedResponse<Product>> => {
    const query = new URLSearchParams();

    if (params.page) query.append("page", String(params.page));
    if (params.per_page) query.append("per_page", String(params.per_page));
    if (params.sort) query.append("sort", params.sort);
    if (params.order) query.append("order", params.order);
    if (params.search) query.append("search", params.search);

    return GET<PaginatedResponse<Product>>(`/products?${query.toString()}`).then(
        (res) => {
            return res.data;
        }
    );
};

export const createProduct = (data: Product) => {
    return POST(`/products`, data);
};

export const fetchProductById = (id: number) => {
    return GET(`/products/${id}`);
};

export const updateProduct = (id: number, data: Partial<Product>) => {
    return PUT(`/products/${id}`, data);
};

export const deleteProduct = (id: number) => {
    return DELETE(`/products/${id}`);
};

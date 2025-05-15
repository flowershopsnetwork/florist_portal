import { FloristProduct } from "@/shared/interfaces/florist-product.interface";
import { GET, POST } from "../restRequest";

export const createFloristProduct = (data: FloristProduct) => {
    return POST(`/florist-products`, data);
};

export const fetchFloristsbyProduct = async (productId: number) => {
    const res = await GET(`/florist-products/${productId}/products`);
    return res.data;
};


/* eslint-disable @typescript-eslint/no-explicit-any */

import { CategoryType } from "./category.type";

export interface ProductType {
    id: string;
    name: string;
    price: number;
    category: CategoryType;
    stock: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface ProductStateType {
    products: ProductType[];
    product: ProductType | null;
    categories: CategoryType[];
    loading: boolean;
    error: any;
    message: string | null;
    status: string | null;
}

export type ProductFormType = Omit<
    ProductType,
    "id" | "createdAt" | "updatedAt"
>;

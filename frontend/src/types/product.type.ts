/* eslint-disable @typescript-eslint/no-explicit-any */

export interface ProductType {
    id: string;
    name: string;
    price: number;
    category: string;
    stock: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface ProductStateType {
    products: ProductType[];
    product: ProductType | null;
    loading: boolean;
    error: any;
    message: string | null;
    status: string | null;
}

export type ProductFormType = Omit<
    ProductType,
    "id" | "createdAt" | "updatedAt"
>;

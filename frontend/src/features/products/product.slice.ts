/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ProductAPI from "../../services/api/product.api";
import { ProductFormType, ProductStateType } from "../../types/product.type";

export const getAllProducts = createAsyncThunk(
    "products/getAll",
    async (_, { rejectWithValue }) => {
        try {
            const response = await ProductAPI.getAll();
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const getProductById = createAsyncThunk(
    "products/getById",
    async (id: string, { rejectWithValue }) => {
        try {
            const response = await ProductAPI.getById(id);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const createProduct = createAsyncThunk(
    "products/create",
    async (product: ProductFormType, { rejectWithValue }) => {
        try {
            const response = await ProductAPI.create(product);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateProduct = createAsyncThunk(
    "products/update",
    async (
        { id, product }: { id: string; product: ProductFormType },
        { rejectWithValue }
    ) => {
        try {
            const response = await ProductAPI.update(id, product);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const deleteProduct = createAsyncThunk(
    "products/delete",
    async (id: string, { rejectWithValue }) => {
        try {
            const response = await ProductAPI.delete(id);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

const initialState: ProductStateType = {
    products: [],
    product: null,
    loading: true,
    error: null,
    message: null,
    status: null,
};

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.status = "pending";
            })
            .addCase(getAllProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload.data;
                state.message = action.payload.message;
                state.status = action.payload.status;
            })
            .addCase(getAllProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getProductById.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.status = "pending";
            })
            .addCase(getProductById.fulfilled, (state, action) => {
                state.loading = false;
                state.product = action.payload.data;
                state.message = action.payload.message;
                state.status = action.payload.status;
            })
            .addCase(getProductById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(createProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.status = "pending";
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products.push(action.payload.data);
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.status = "pending";
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.products.findIndex(
                    (user) => user.id === action.payload.data.id
                );
                if (index !== -1) {
                    state.products[index] = action.payload.data;
                }
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.status = "pending";
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products = state.products.filter(
                    (product) => product.id !== action.payload.data.id
                );
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default productSlice.reducer;

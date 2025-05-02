/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    deleteProduct,
    getAllProducts,
    getProductById,
} from "../features/products/product.slice";
import { ProductType } from "../types/product.type";
import { useToast } from "./context/ToastContext";

function Product() {
    const dispatch = useDispatch();
    const { products, loading, error, product } = useSelector(
        (state: any) => state.products
    );
    const { showToast } = useToast();

    useEffect(() => {
        dispatch(getAllProducts() as any);
    }, [dispatch]);

    useEffect(() => {
        if (loading) {
            showToast("Loading...");
        } else if (error) {
            showToast("Error: ${error}");
        } else {
            showToast("");
        }
    }, [loading, error, showToast]);

    const handleDeleteProduct = (id: string) => {
        dispatch(deleteProduct(id) as any);
    };

    const handleGetProductById = (id: string) => {
        dispatch(getProductById(id) as any);
    };

    return (
        <div className="flex flex-col items-center">
            <h1 className="text-4xl font-bold text-gray-800 py-[45px]">
                My Products
            </h1>
            <div className="flex flex-col w-full md:flex-row gap-4">
                <div className="basis-2/3 w-full p-4 bg-white rounded-lg shadow-lg flex flex-row">
                    <ProductList
                        products={products}
                        onDetailClick={handleGetProductById}
                        onDeleteClick={handleDeleteProduct}
                    />
                </div>
                <div className="basis-1/3 w-full flex-none">
                    <div className="p-4 bg-white rounded-lg shadow-lg">
                        <ProductDetail product={product} />
                    </div>
                </div>
            </div>
        </div>
    );
}

function ProductList(
    props: Readonly<{
        products: ProductType[];
        onDetailClick: (id: string) => void;
        onDeleteClick: (id: string) => void;
    }>
) {
    const list = props.products;

    if (list.length <= 0) return <></>;

    return (
        <table className="w-full">
            <thead>
                <tr className="border-b border-gray-300 text-base md:text-xl">
                    <th className="px-4 py-2 max-w-[10px]">No</th>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Price</th>
                    <th className="px-4 py-2"></th>
                </tr>
            </thead>
            <tbody>
                {list.map((product: ProductType, index: number) => (
                    <tr
                        className="last:border-0 border-b border-gray-300"
                        key={product.id}
                    >
                        <td className="text-center px-4 py-2 max-w-[10px]">
                            {index + 1}
                        </td>
                        <td className="px-4 py-2">{product.name}</td>
                        <td className="px-4 py-2">${product.price}</td>
                        <td className="px-4 py-2 flex flex-row w-full justify-end">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                onClick={() => props.onDetailClick(product.id)}
                            >
                                See Detail
                            </button>
                            <button
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
                                onClick={() => props.onDeleteClick(product.id)}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

function ProductDetail(props: Readonly<{ product: ProductType }>) {
    const data = props.product;

    if (data == null) return <></>;

    return (
        <div>
            <h3 className="text-lg font-semibold">Product Detail</h3>
            <table className="w-full mt-5">
                <tbody>
                    <tr>
                        <th className="px-4 py-2 text-left">Id</th>
                        <td className="px-4 py-2">: {data.id}</td>
                    </tr>
                    <tr>
                        <th className="px-4 py-2 text-left">Name</th>
                        <td className="px-4 py-2">: {data.name}</td>
                    </tr>
                    <tr>
                        <th className="px-4 py-2 text-left">Price</th>
                        <td className="px-4 py-2">: ${data.price}</td>
                    </tr>
                    <tr>
                        <th className="px-4 py-2 text-left">Category</th>
                        <td className="px-4 py-2">: {data.category.name}</td>
                    </tr>
                    <tr>
                        <th className="px-4 py-2 text-left">Stock</th>
                        <td className="px-4 py-2">: {data.stock}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Product;

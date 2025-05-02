/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getAllProducts, getProductById } from "../features/products/product.slice";
import { ProductType } from "../types/product.type";

function Product() {
    const dispatch = useDispatch();
    const { products, loading, error, product } = useSelector(
        (state: any) => state.products
    );
    const [modalMessage, setModalMessage] = useState<string | null>(null);

    useEffect(() => {
        dispatch(getAllProducts() as any);
    }, [dispatch]);

    useEffect(() => {
        if (loading) {
            setModalMessage("Loading...");
        } else if (error) {
            setModalMessage(`Error: ${error}`);
        } else {
            setModalMessage(null);
        }
    }, [loading, error]);

    const handleDeleteProduct = (id: string) => {
        dispatch(deleteProduct(id) as any);
    };

    const handleGetProductById = (id: string) => {
        dispatch(getProductById(id) as any);
    };

    return (
        <div className="flex flex-col items-center">
            {modalMessage && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded shadow-lg">
                        <p>{modalMessage}</p>
                        {error && (
                            <button
                                className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                onClick={() => setModalMessage(null)}
                            >
                                Close
                            </button>
                        )}
                    </div>
                </div>
            )}
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

function ProductList(props: Readonly<{
    products: ProductType[];
    onDetailClick: (id: string) => void;
    onDeleteClick: (id: string) => void;
}>) {
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
                    <tr className="last:border-0 border-b border-gray-300" key={product.id}>
                        <td className="text-center px-4 py-2 max-w-[10px]">{index + 1}</td>
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
        <table className="w-full">
            <tbody>
                <tr>
                    <th className="px-4 py-2">Id</th>
                    <td className="px-4 py-2">{data.id}</td>
                </tr>
                <tr>
                    <th className="px-4 py-2">Name</th>
                    <td className="px-4 py-2">{data.name}</td>
                </tr>
                <tr>
                    <th className="px-4 py-2">Price</th>
                    <td className="px-4 py-2">${data.price}</td>
                </tr>
                <tr>
                    <th className="px-4 py-2">Category</th>
                    <td className="px-4 py-2">{data.category}</td>
                </tr>
                <tr>
                    <th className="px-4 py-2">Stock</th>
                    <td className="px-4 py-2">{data.stock}</td>
                </tr>
            </tbody>
        </table>
    );
}

export default Product;


/* eslint-disable @typescript-eslint/no-explicit-any */
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {deleteProduct, getAllProducts, getProductById,} from "../features/products/product.slice";
import {ProductType} from "../types/product.type";

function Product() {
    const dispatch = useDispatch();
    const {products, loading, error, product} = useSelector(
        (state: any) => state.products
    );

    useEffect(() => {
        dispatch(getAllProducts() as any);
    }, [dispatch]);

    const handleDeleteProduct = (id: string) => {
        dispatch(deleteProduct(id) as any);
    };

    const handleGetProductById = (id: string) => {
        dispatch(getProductById(id) as any);
    };
    return (
        <div className="flex flex-col items-center justify-center w-full h-screen bg-gray-100">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
                My Products
            </h1>
            {loading && <div>Loading...</div>}
            {error != null && <div className="text-red-500">{error}</div>}
            <div className="w-full md:w-1/2 p-4 bg-white rounded-lg shadow-lg flex flex-row">
                <div className="w-1/2">
                    <ProductList
                        products={products}
                        onDetailClick={handleGetProductById}
                        onDeleteClick={handleDeleteProduct}
                    />
                </div>
                <div className="w-1/2 pl-4">
                    <ProductDetail product={product}/>
                </div>
            </div>
        </div>
    );
}

function ProductList(props: {
    products: ProductType[];
    onDetailClick: (id: string) => void;
    onDeleteClick: (id: string) => void;
}) {
    const list = props.products;

    if (list.length <= 0) return <></>;

    return (
        <table className="w-full">
            <thead>
            <tr className="bg-gray-200">
                <th className="px-4 py-2">No</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Action</th>
            </tr>
            </thead>
            <tbody>
            {list.map((product: ProductType) => (
                <tr key={product.id}>
                    <td className="px-4 py-2">{product.id}</td>
                    <td className="px-4 py-2">{product.name}</td>
                    <td className="px-4 py-2">${product.price}</td>
                    <td className="px-4 py-2">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() =>
                                props.onDetailClick(product.id)
                            }
                        >
                            See Detail
                        </button>
                        <button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
                            onClick={() =>
                                props.onDeleteClick(product.id)
                            }
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

function ProductDetail(props: { product: ProductType }) {
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
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
} from "../features/products/product.slice";
import { ProductType } from "../types/product.type";

const Product = () => {
    const dispatch = useDispatch();
    const { products, loading, error, product } = useSelector(
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
        <div>
            <h1>My Products</h1>
            {loading && <div>Loading...</div>}
            {error != null && <div>{error}</div>}
            <ProductList
                products={products}
                onDetailClick={handleGetProductById}
                onDeleteClick={handleDeleteProduct}
            />
            <ProductDetail product={product} />
        </div>
    );
};

const ProductList = (props: {
    products: ProductType[];
    onDetailClick: (id: string) => void;
    onDeleteClick: (id: string) => void;
}) => {
    const list = props.products;
    console.log(list);

    if (list.length <= 0) return <></>;

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map((product: ProductType) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>
                                <button
                                    onClick={() =>
                                        props.onDetailClick(product.id)
                                    }
                                >
                                    See Detail
                                </button>
                            </td>
                            <td>
                                <button
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
        </div>
    );
};

const ProductDetail = (props: { product: ProductType }) => {
    const data = props.product;
    console.log(data);

    if (data == null) return <></>;

    return (
        <div>
            <h3>Product Detail</h3>
            <p>{data.id}</p>
            <p>{data.name}</p>
            <p>{data.price}</p>
            <p>{data.category}</p>
            <p>{data.stock}</p>
        </div>
    );
};

export default Product;

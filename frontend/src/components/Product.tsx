/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    createProduct,
    deleteProduct,
    getAllCategory,
    getAllProducts,
    getProductById,
    updateProduct,
} from "../features/products/product.slice";
import { ProductType } from "../types/product.type";
import { useToast } from "./context/ToastContext";
import { CategoryType } from "../types/category.type";

function Product() {
    const dispatch = useDispatch();
    const { products, loading, error, product, categories } = useSelector(
        (state: any) => state.products
    );
    const { showToast } = useToast();
    const [productEdit, setProductEdit] = useState<ProductType | null>(null);
    const [isUpdateForm, setIsUpdateForm] = useState(false);

    useEffect(() => {
        dispatch(getAllProducts() as any);
        dispatch(getAllCategory() as any);
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

    const handleShowUpdateForm = (product: any) => {
        setIsUpdateForm(true);
        setProductEdit(product);
    };

    const handleHideUpdateForm = () => {
        setIsUpdateForm(false);
        setProductEdit(null);
    };

    const handleSubmitForm = (isUpdateForm: boolean, product: any) => {
        if (isUpdateForm) {
            dispatch(updateProduct(product.id, product) as any);
        } else {
            dispatch(createProduct(product) as any);
        }
        console.log(isUpdateForm);
        console.log(product);

        setIsUpdateForm(false);
        setProductEdit(null);
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
                        onUpdateClick={handleShowUpdateForm}
                    />
                </div>
                <div className="basis-1/3 w-full flex-none">
                    {product !== null ? (
                        <div className="p-4 bg-white rounded-lg shadow-lg mb-4">
                            <ProductDetail product={product} />
                        </div>
                    ) : null}
                    <div className="p-4 bg-white rounded-lg shadow-lg ">
                        <ProductForm
                            product={productEdit}
                            categories={categories}
                            isUpdateForm={isUpdateForm}
                            onCancelClick={handleHideUpdateForm}
                            onSubmitClick={handleSubmitForm}
                        />
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
        onUpdateClick: (product: any) => void;
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
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2"
                                onClick={() => props.onUpdateClick(product)}
                            >
                                Update
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

function ProductForm(
    props: Readonly<{
        isUpdateForm: boolean;
        product: ProductType | null;
        categories: CategoryType[];
        onCancelClick: () => void;
        onSubmitClick: (isUpdateForm: boolean, product: any) => void;
    }>
) {
    const { isUpdateForm, product } = props;
    const titleForm = isUpdateForm
        ? "Product Update Form"
        : "Product Create Form";

    return (
        <div>
            <h3 className="text-lg font-semibold">{titleForm}</h3>
            <form
                className="mt-5"
                onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target as HTMLFormElement);
                    const id = product?.id ?? "";
                    const name = formData.get("name") as string;
                    const price = Number(formData.get("price"));
                    const categoryId = formData.get("category") as string;
                    const stock = Number(formData.get("stock"));
                    props.onSubmitClick(isUpdateForm, {
                        id,
                        name,
                        price,
                        categoryId,
                        stock,
                    });
                }}
            >
                {isUpdateForm && (
                    <div className="flex flex-row gap-4">
                        <label className="w-1/3" htmlFor="id">
                            Id
                        </label>
                        <input
                            className="w-2/3"
                            type="text"
                            name="id"
                            id="id"
                            defaultValue={product?.id ?? ""}
                            disabled
                            value={product?.id ?? ""}
                        />
                    </div>
                )}

                <div className="flex flex-row gap-4 mt-2">
                    <label className="w-1/3" htmlFor="name">
                        Name
                    </label>
                    <input
                        className="w-2/3"
                        type="text"
                        name="name"
                        id="name"
                        defaultValue={product?.name ?? ""}
                        required
                        value={product?.name ?? ""}
                    />
                </div>
                <div className="flex flex-row gap-4 mt-2">
                    <label className="w-1/3" htmlFor="price">
                        Price
                    </label>
                    <input
                        className="w-2/3"
                        type="text"
                        name="price"
                        id="price"
                        defaultValue={product?.price ?? ""}
                        required
                    />
                </div>
                <div className="flex flex-row gap-4 mt-2">
                    <label className="w-1/3" htmlFor="category">
                        Category
                    </label>
                    <select
                        className="w-2/3"
                        name="category"
                        id="category"
                        defaultValue={product?.category.id ?? ""}
                        required
                    >
                        <option value="">-- Select Category --</option>
                        {props.categories.map((category) => (
                            <option
                                key={category.id}
                                value={category.id}
                                selected={category.id === product?.category.id}
                            >
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-row gap-4 mt-2">
                    <label className="w-1/3" htmlFor="stock">
                        Stock
                    </label>
                    <input
                        className="w-2/3"
                        type="number"
                        name="stock"
                        id="stock"
                        defaultValue={product?.stock ?? ""}
                        required
                    />
                </div>
                <div className="flex flex-row-reverse gap-4 mt-5">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        type="submit"
                    >
                        {isUpdateForm ? "Update" : "Create"}
                    </button>
                    {isUpdateForm && (
                        <button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            type="button"
                            onClick={props.onCancelClick}
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}

export default Product;


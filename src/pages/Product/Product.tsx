import {useLoaderData} from "react-router-dom";
import {ProductInterface} from "../../interfaces/product.interface.ts";

export default function  Product() {
    const data = useLoaderData() as ProductInterface
    return (
        <>
            Product - {data.id}
        </>
    );
};


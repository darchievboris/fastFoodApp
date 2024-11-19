import H1 from "../../components/UI/H1/H1.tsx";
import Search from "../../components/Search/Search.tsx";
import {PREFIX} from "../../helpers/API.ts";
import {ProductInterface} from "../../interfaces/product.interface.ts";
import {useEffect, useState} from "react";
import axios, {AxiosError} from "axios";
import MenuList from "./MenuList/MenuList.tsx";

const Menu = ({}) => {
    const [products, setProducts] = useState<ProductInterface[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | undefined>("");
    const getMenu = async () => {
        try {
            setIsLoading(true)
            await new Promise<void>(res=>setTimeout(res,2000))
            const {data} = await axios.get<ProductInterface[]>(`${PREFIX}/products`)
            setProducts(data)
        } catch (e) {
            if (e instanceof AxiosError) {
                setError(e.message)
            }
        } finally {
            setIsLoading(false)
        }

    }
    useEffect(() => {
        getMenu()
    }, [])

    return (
        <>
            <div style={{display: "flex", justifyContent: "space-between", marginBottom: "45px"}}>
                <H1>Меню</H1>
                <Search placeholder="Введите блюдо или состав"></Search>
            </div>
            {isLoading &&<> loading...</>}
            {error && <>{error}</>}
            {!isLoading &&<MenuList products={products}/>}

        </>
    );
};

export default Menu;

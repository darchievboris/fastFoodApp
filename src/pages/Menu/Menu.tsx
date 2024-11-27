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
    const [filter, setFilter] = useState<string>("");
    const getMenu = async (name: string) => {
        try {
            setIsLoading(true)
            // await new Promise<void>(res => setTimeout(res, 2000))
            const {data} = await axios.get<ProductInterface[]>(`${PREFIX}/products`, {
                params: {
                    name: name
                }
            })
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
        getMenu(filter)
    }, [filter])

    return (
        <>
            <div style={{display: "flex", justifyContent: "space-between", marginBottom: "45px"}}>
                <H1>Меню</H1>
                <Search placeholder="Введите блюдо или состав" value={filter}
                        onChange={(e) => setFilter(e.target.value)}></Search>
            </div>
            {isLoading && <> loading...</>}
            {error && <>{error}</>}
            {!isLoading && products.length > 0 && <MenuList products={products}/>}
            {!isLoading && products.length === 0 && <p>Ничего не найдено по запросу</p>}

        </>
    );
};

export default Menu;

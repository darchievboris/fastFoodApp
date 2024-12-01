import H1 from "../../components/UI/H1/H1.tsx";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store.ts";
import {useEffect, useState} from "react";
import {ProductInterface} from "../../interfaces/product.interface.ts";
import axios, {AxiosError} from "axios";
import {PREFIX} from "../../helpers/API.ts";
import CartItem from "../../components/CartItems/CartItem.tsx";
import {CartProductsInterface} from "../../interfaces/cartProducts.interface.ts";


const Cart = ({}) => {
    const [cartProducts, setCartProducts] = useState<CartProductsInterface[]>([]);
    const cartItems = useSelector((s: RootState) => s.cart.items)
    const [error, setError] = useState<string | undefined>("");
    const [isLoading, setIsLoading] = useState(false);
    const getItem = async (id: number) => {
        try {
            setIsLoading(true)
            const {data} = await axios.get<ProductInterface>(`${PREFIX}/products/${id}`)
            return data
        } catch (e) {
            if (e instanceof AxiosError)
                setError(e.message)
        } finally {
            setIsLoading(false)
        }

    }
    const loadAllItems = async () => {
        const res = await Promise.all(cartItems.map((i) => getItem(i.id)))
        const temp: CartProductsInterface[] = res.map((resItem: ProductInterface | undefined, index)=> {
            if(!resItem){
                throw new Error(`Product with id ${cartItems[index].id} not found`);
            }
            return {count: cartItems[index].count, ...resItem}
        })
        setCartProducts(temp)
    }

    useEffect(() => {
        loadAllItems()
    }, [cartItems])

    return (
        <>
            <H1>Корзина</H1>
            {isLoading && <>Загружается...</>}
            {error && <div className="error">{error}</div>}
            {!isLoading && cartProducts.length > 0 && cartProducts.map(produce => <CartItem
                key={produce.id}
                {...produce}/>)}
            {!isLoading && cartProducts.length === 0 && <div>Корзина пуста</div>}
        </>
    );
};

export default Cart;

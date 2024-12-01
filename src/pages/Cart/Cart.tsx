import H1 from "../../components/UI/H1/H1.tsx";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store/store.ts";
import {useEffect, useState} from "react";
import {ProductInterface} from "../../interfaces/product.interface.ts";
import axios, {AxiosError} from "axios";
import {PREFIX} from "../../helpers/API.ts";
import CartItem from "../../components/CartItems/CartItem.tsx";
import {CartProductsInterface} from "../../interfaces/cartProducts.interface.ts";
import styles from './Cart.module.css'
import Button from "../../components/UI/Button/Button.tsx";
import {cartActions} from "../../store/cart.slice.ts";
import {useNavigate} from "react-router-dom";


const Cart = ({}) => {
    const [cartProducts, setCartProducts] = useState<CartProductsInterface[]>([]);
    const cartItems = useSelector((s: RootState) => s.cart.items)
    const [error, setError] = useState<string | undefined>("");
    const [isLoading, setIsLoading] = useState(false);
    const jwt = useSelector((s: RootState) => s.user.jwt)
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const DELIVERY_PRICE = 169
    const itemCount = cartProducts.reduce((acc, item) => acc += item.count, 0)
    const sum = cartProducts.reduce((acc, item) => acc += item.count * item.price, 0)
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
    const submitOrder = async () => {
        try {
            await axios.post<ProductInterface>(`${PREFIX}/order`, {products: cartProducts}, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            })
            dispatch(cartActions.clean())
            navigate('/success')
        } catch (e) {
            if (e instanceof AxiosError)
                setError(e.message)
        } finally {
            setIsLoading(false)
        }
    }
    const loadAllItems = async () => {
        const res = await Promise.all(cartItems.map((i) => getItem(i.id)))
        const temp: CartProductsInterface[] = res.map((resItem: ProductInterface | undefined, index) => {
            if (!resItem) {
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

            {!isLoading && cartProducts.length > 0 && <>
                <div className={styles.totalPrice}>
                    <div className={styles.line}>
                        <div>
                            Сумма
                        </div>
                        <div>
                            {sum}&nbsp; <span>₽</span>
                        </div>
                    </div>

                    <hr className={styles.hr}/>
                    <div className={styles.line}>
                        <div>
                            Доставка
                        </div>
                        <div>
                            {DELIVERY_PRICE}&nbsp; <span>₽</span>
                        </div>
                    </div>

                    <hr className={styles.hr}/>
                    <div className={styles.line}>
                        <div>
                            Итог &nbsp; <span className={styles.itemCount}>({itemCount})</span>
                        </div>
                        <div>
                            {sum + DELIVERY_PRICE}&nbsp; <span>₽</span>
                        </div>
                    </div>
                </div>
                <div className={styles.button}>
                    <Button appearance='big' onClick={submitOrder}>Оформить</Button>
                </div>
            </>}
        </>
    );
};

export default Cart;

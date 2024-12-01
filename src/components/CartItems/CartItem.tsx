import styles from './CartItem.module.css'
import {CartProductsInterface} from "../../interfaces/cartProducts.interface.ts";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../store/store.ts";
import {cartActions} from "../../store/cart.slice.ts";

const CartItem = ({id, image, name, price, count}: CartProductsInterface) => {
    const dispatch = useDispatch<AppDispatch>()
    function decrease() {
        console.log(id)
        dispatch(cartActions.decrease(id))
    }

    function increase() {
        dispatch(cartActions.add(id))
    }

    function remove() {
        dispatch(cartActions.remove(id))
    }

    return (
        <div className={styles.items}>
            <div>
                <img className={styles.image} src={image} alt="картика еды"/>
            </div>
            <div className={styles.content}>
                <div className={styles.name}>{name}</div>
                <div className={styles.price}>{price} ₽</div>
            </div>

            <div className={styles.actions}>
                <button className={styles.decrease} onClick={decrease}>
                    <img src="decrease-icon.svg" alt="уменьшить количество товара"/>
                </button>
                <div className={styles.count}>{count}</div>
                <button className={styles.increase} onClick={increase}>
                    <img src="increase-icon.svg" alt="увеличить количество товара"/>
                </button>
                <button className={styles.remove} onClick={remove}>
                    <img src="remove-icon.svg"/>
                </button>

            </div>
        </div>
    );
};

export default CartItem;

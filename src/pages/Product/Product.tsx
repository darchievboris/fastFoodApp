import {useLoaderData, useNavigate} from "react-router-dom";
import {ProductInterface} from "../../interfaces/product.interface.ts";
import styles from './Product.module.css'
import H1 from "../../components/UI/H1/H1.tsx";
import Button from "../../components/UI/Button/Button.tsx";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../store/store.ts";
import {cartActions} from "../../store/cart.slice.ts";

export default function Product() {
    const data = useLoaderData() as ProductInterface
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()

    function add() {
        dispatch(cartActions.add(data.id))
    }

    return (
        <div className={styles.wrapper}>

            <div className={styles.header}>
                <div>
                    <button onClick={() => navigate('/')} className={styles.buttonBack}>
                        <img src="/arrow-left-icon.png" alt="вернутся в меню"/>
                    </button>
                </div>
                <div><H1>Наслаждение</H1></div>
                <div className={styles.buttonAdd}>
                    <Button appearance="small" onClick={add}>
                        <img src="/cart-button-icon.png" alt="Добавить в корзину"/>&ensp;В корзину
                    </Button>
                </div>
            </div>

            <div className={styles.content}>
                <div>
                    <img src={data.image} className={styles.img} alt="Картинка еды"/>
                </div>
                <div className={styles.description}>
                    <div className={styles.line}>
                        <div>Цена</div>
                        <div className={styles.price}>{data.price}&ensp;<span className={styles.currency}>₽</span></div>
                    </div>
                    <hr className={styles.hr}/>
                    <div className={styles.line} >
                        <div>Рейтинг</div>
                        <div className={styles.rating}>{data.rating}&ensp;<img src="/star-icon.svg"/></div>
                    </div>

                    <div>
                        <div className={styles.descTitle}>Cостав:</div>
                        <ul className={styles.descLi}>
                            {data.ingredients.map(i => <li>{i}</li>)}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};


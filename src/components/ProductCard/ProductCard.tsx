import styles from './ProductCard.module.css'
import {ProductCardProps} from "./ProductCard.props.ts";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../store/store.ts";
import {cartActions} from "../../store/cart.slice.ts";
import React from "react";

function ProductCard(props: ProductCardProps) {
    const dispatch = useDispatch<AppDispatch>()
    function add(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault()
        dispatch(cartActions.add(props.id))
    }

    return (
        <Link to={`/product/${props.id}`}>
            <div className={styles.card}>
                <div className={styles.header}>
                    <img className={styles.img} src={props.image}/>

                    <div className={styles.price}>
                        {props.price}
                        <span className={styles.currency}>&ensp;₽</span></div>

                    <button className={styles.addToCart} onClick={add}>
                        <img src="cart-button-icon.png" alt="Добавить в корзину"/>
                    </button>
                    <div className={styles.rating}>
                        {props.rating}&ensp;
                        <img src="star-icon.svg" alt="Иконка звезды"/>
                    </div>
                </div>

                <div className={styles.footer}>
                    <div className={styles.title}>{props.title}</div>
                    <div className={styles.description}>{props.description}</div>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;

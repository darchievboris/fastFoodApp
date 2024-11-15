import {Link, Outlet} from "react-router-dom";
import styles from './Layout.module.css'
import Button from "../components/UI/Button/Button.tsx";

const Layout = ({}) => {
    return (
        <div className={styles.layout}>
            <div className={styles.sidebar}>
                <div className={styles.user}>
                    <img src="Avatar.png" className={styles.avatar} alt="Аватар пользователя"/>
                    <div className={styles.name}>Антон Ларичев</div>
                    <div className={styles.email}>alaricode@ya.ru</div>
                </div>
                <div className={styles.menu}>
                    <Link to='/' className={styles.link}>
                        <img src="menu-icon.svg" alt="Иконка меню"/>
                        Menu
                    </Link>
                    <Link to='/Cart' className={styles.link}>
                        <img src="cart-icon.svg" alt="Иконка корзины"/>
                        Cart
                    </Link>
                </div>

                <Button className={styles.exit}>
                    <img src="exit.svg" alt="Иконка выхода"/>
                    Cart
                </Button>

            </div>
            <div className={styles.content}>
                <Outlet/>
            </div>
        </div>
    );
};

export default Layout;

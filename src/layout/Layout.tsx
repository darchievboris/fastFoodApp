import {NavLink, Outlet, useNavigate} from "react-router-dom";
import styles from './Layout.module.css'
import Button from "../components/UI/Button/Button.tsx";
import cn from 'classnames'
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../store/store.ts";
import {getProfile, userActions} from "../store/user.slice.ts";
import {useEffect} from "react";

const Layout = ({}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const profile = useSelector((s:RootState)=>s.user.profile)

    useEffect(() => {
        dispatch(getProfile())
    }, [dispatch])

    function handleExit() {
        dispatch(userActions.logout())
        navigate("/auth/login")
    }

    return (
        <div className={styles.layout}>
            <div className={styles.sidebar}>
                <div className={styles.user}>
                    <img src="Avatar.png" className={styles.avatar} alt="Аватар пользователя"/>
                    <div className={styles.name}>{profile?.name}</div>
                    <div className={styles.email}>{profile?.email}</div>
                </div>
                <div className={styles.menu}>
                    <NavLink to='/' className={({isActive}) => cn(styles.link, {[styles.active]: isActive})}>
                        <img src="menu-icon.svg" alt="Иконка меню"/>
                        Menu
                    </NavLink>
                    <NavLink to='/Cart' className={({isActive}) => cn(styles.link, {[styles.active]: isActive})}>
                        <img src="cart-icon.svg" alt="Иконка корзины"/>
                        Cart
                    </NavLink>
                </div>

                <Button className={styles.exit} onClick={handleExit}>
                    <img src="exit.svg" alt="Иконка выхода"/>
                    Выйти
                </Button>

            </div>
            <div className={styles.content}>
                <Outlet/>
            </div>
        </div>
    );
};

export default Layout;

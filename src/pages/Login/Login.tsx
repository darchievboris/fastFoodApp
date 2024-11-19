import H1 from "../../components/UI/H1/H1.tsx";
import Input from "../../components/UI/Input/Input.tsx";
import Button from "../../components/UI/Button/Button.tsx";
import styles from "./Login.module.css"
import {Link} from "react-router-dom";

const Login = ({}) => {
    return (
        <div className={styles.login}>
            <H1>Вход</H1>
            <form className={styles.form}>
                <div className={styles.filed}>
                    <label htmlFor="email">Ваш email</label>
                    <Input id="email" placeholder="Email"/>
                </div>
                <div className={styles.filed}>
                    <label htmlFor="password">Ваш пароль</label>
                    <Input id="password" placeholder="Пароль"/>
                </div>
                <Button appearance="big">ВХОД</Button>
            </form>
            <div className={styles.register}>
                <div>Нет аккаунта?</div>
                <Link to="/auth/register">Зарегистрироваться</Link>
            </div>
        </div>
    );
};

export default Login;

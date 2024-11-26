import H1 from "../../components/UI/H1/H1.tsx";
import Input from "../../components/UI/Input/Input.tsx";
import Button from "../../components/UI/Button/Button.tsx";
import styles from "./Login.module.css"
import {Link, useNavigate} from "react-router-dom";
import axios, {AxiosError} from "axios";
import {PREFIX} from "../../helpers/API.ts";
import {FormEvent, useState} from "react";
import {AuthInterface} from "../../interfaces/auth.interface.ts";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../store/store.ts";
import {userActions} from "../../store/user.slice.ts";

type loginForm = {
    email: {
        value: string
    },
    password: {
        value: string
    };
}
const Login = ({}) => {
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()

    async function handleSubmit(e: FormEvent) {
        e.preventDefault()
        setError(null)
        //a@gmail.com 123
        const target = e.target as typeof e.target & loginForm
        const {email, password} = target
        await sendLogin(email.value, password.value)
    }

    async function sendLogin(email: string, password: string) {
        try {
            const {data} = await axios.post<AuthInterface>(`${PREFIX}/auth/login`, {
                email, password
            })
            dispatch(userActions.addJwt(data.access_token))
            navigate("/")
        } catch (error) {
            if (error instanceof AxiosError)
                setError(error.response?.data.message)
        }
    }

    return (
        <div className={styles.login}>
            <H1>Вход</H1>
            {error && <div className={styles.error}>{error}</div>}
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.filed}>
                    <label htmlFor="email">Ваш email</label>
                    <Input id="email" name="email" placeholder="Email"/>
                </div>
                <div className={styles.filed}>
                    <label htmlFor="password">Ваш пароль</label>
                    <Input id="password" type="password" name="password" placeholder="Пароль"/>
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

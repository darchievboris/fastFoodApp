import H1 from "../../components/UI/H1/H1.tsx";
import Input from "../../components/UI/Input/Input.tsx";
import Button from "../../components/UI/Button/Button.tsx";
import styles from "./Login.module.css"
import {Link, useNavigate} from "react-router-dom";
import {FormEvent, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store/store.ts";
import {login, userActions} from "../../store/user.slice.ts";

type loginForm = {
    email: {
        value: string
    },
    password: {
        value: string
    };
}
const Login = ({}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const {jwt,loginErrorMessage} = useSelector((s: RootState) => s.user)

    useEffect(() => {
        if(jwt){
            navigate("/")
        }
    }, [jwt, navigate])

    async function handleSubmit(e: FormEvent) {
        e.preventDefault()
        dispatch(userActions.clearLoginError())
        //a@gmail.com 123
        const target = e.target as typeof e.target & loginForm
        const {email, password} = target
        await sendLogin(email.value, password.value)
    }

    async function sendLogin(email: string, password: string) {
        dispatch(login({email, password}))
    }

    return (
        <div className={styles.login}>
            <H1>Вход</H1>
            {loginErrorMessage && <div className={styles.error}>{loginErrorMessage}</div>}
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

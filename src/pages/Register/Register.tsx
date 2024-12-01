import styles from '../Login/Login.module.css'
import H1 from "../../components/UI/H1/H1.tsx";
import Input from "../../components/UI/Input/Input.tsx";
import Button from "../../components/UI/Button/Button.tsx";
import {Link, useNavigate} from "react-router-dom";
import {FormEvent, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store/store.ts";
import {register, userActions} from "../../store/user.slice.ts";


type RegisterForm = {
    email: {
        value: string
    },
    password: {
        value: string
    };
    name:{
        value:string
    }
}
const Register = ({}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const {jwt,registerErrorMessage} = useSelector((s: RootState) => s.user)

    useEffect(() => {
    if(jwt){
        navigate("/")
    }
    }, [jwt, navigate])

    async function handleSubmit(e: FormEvent) {
        e.preventDefault()
        dispatch(userActions.clearRegisterError())
        //a@gmail.com 123
        const target = e.target as typeof e.target & RegisterForm
        const {email, password, name} = target
        dispatch(register({email:email.value, password:password.value,name:name.value}))
    }


    return (
        <>
            <div className={styles.login}>
                <H1>Регистрация</H1>
                {registerErrorMessage && <div className="error">{registerErrorMessage}</div>}
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.filed}>
                        <label htmlFor="email">Ваш email</label>
                        <Input id="email" name="email" placeholder="Email"/>
                    </div>
                    <div className={styles.filed}>
                        <label htmlFor="password">Ваш пароль</label>
                        <Input id="password" type="password" name="password" placeholder="Пароль"/>
                    </div>
                    <div className={styles.filed}>
                        <label htmlFor="password">Ваш имя</label>
                        <Input id="name" type="text" name="name" placeholder="Имя"/>
                    </div>
                    <Button appearance="big">ЗАРЕГИСТРИРОВАТЬСЯ</Button>
                </form>
                <div className={styles.register}>
                    <div>Есть аккаунт?</div>
                    <Link to="/auth/login">Войти</Link>
                </div>
            </div>

        </>
    );
};

export default Register;

import styles from './Success.module.css'
import Button from "../../components/UI/Button/Button.tsx";
import {useNavigate} from "react-router-dom";
const Success = ({}) => {
    const navigate = useNavigate()
    return (
        <div className={styles.wrapper}>
            <div>
                <img className={styles.img} src="pizza.png" alt="Рисунок пицци"/>
            </div>
            <div className={styles.text}>Ваш заказ успешно <br/>
                оформлен!</div>
            <div className={styles.actions}>
                <Button appearance="big" onClick={()=>navigate('/')}>Сделать новый</Button>
            </div>

        </div>
    );
};

export default Success;

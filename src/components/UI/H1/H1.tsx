import {H1Props} from "./H1.props.ts";
import styles from './H1.module.css'
const H1 = ({children}:H1Props) => {
    return (
        <div className={styles.h1}>
            {children}
        </div>
    );
};

export default H1;

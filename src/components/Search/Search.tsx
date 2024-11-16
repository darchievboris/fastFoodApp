import cn from "classnames"
import {SearchProps} from "./Search.props.ts";
import styles from './Search.module.css'
import {forwardRef} from "react";

const Search = forwardRef<HTMLInputElement, SearchProps>(
    function Search({isValid = true, className, ...props}, ref) {
        return (<div className={styles.input_wrapper}>
                <input
                    ref={ref}
                    className={
                        cn(styles['input'],
                            className, {
                                [styles['invalid']]: isValid
                            })
                    } {...props}/>
                <img src="search-icon.svg" alt="иконка поиска" className={styles.icon}/>
            </div>
        );
    }
);

export default Search;

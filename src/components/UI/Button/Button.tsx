import {ButtonProps} from "./Button.props.ts";
import cn from "classnames"
const Button = ({className,children,...props}:ButtonProps) => {
    return (
        <button className={cn( className)} {...props}>
            {children}
        </button>
    );
};

export default Button;

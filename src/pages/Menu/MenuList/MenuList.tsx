import {MenuListProps} from "./MenuList.props.ts";
import ProductCard from "../../../components/ProductCard/ProductCard.tsx";
import styles from './MenuList.module.css'
const MenuList = ({products}: MenuListProps) => {
    return (
        <div className={styles.wrapper}>
            {products.map(p => (
                <ProductCard
                    key={p.id}
                    id={p.id}
                    price={p.price}
                    description={p.ingredients.join(', ')}
                    image={p.image}
                    rating={p.rating}
                    title={p.name}/>))}
        </div>
    );
};

export default MenuList;

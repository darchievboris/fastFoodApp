import {MenuListProps} from "./MenuList.props.ts";
import ProductCard from "../../../components/ProductCard/ProductCard.tsx";

const MenuList = ({products}: MenuListProps) => {
    return (
        <>
            {products.map(p => (
                <ProductCard
                    key={p.id}
                    id={p.id}
                    price={p.price}
                    description={p.ingredients.join(', ')}
                    image={p.image}
                    rating={p.rating}
                    title={p.name}/>))}
        </>
    );
};

export default MenuList;

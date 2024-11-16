import H1 from "../../components/UI/H1/H1.tsx";

import Search from "../../components/Search/Search.tsx";
import ProductCard from "../../components/ProductCard/ProductCard.tsx";

const Menu = ({}) => {
    return (
        <>
            <div style={{display: "flex", justifyContent: "space-between",marginBottom:"45px"}}>
                <H1>Меню</H1>
                <Search placeholder="Введите блюдо или состав"></Search>
            </div>
            <ProductCard id={0} price={300} description="Салями, руккола, помидоры, оливки" image='image_80.png' rating={4.5} title="Наслаждение"/>
        </>
    );
};

export default Menu;

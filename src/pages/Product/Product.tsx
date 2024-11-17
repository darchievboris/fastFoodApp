import {useParams} from "react-router-dom";

const Product = ({}) => {
    const {id} = useParams()
    return (
        <>
            Product - {id}
        </>
    );
};

export default Product;

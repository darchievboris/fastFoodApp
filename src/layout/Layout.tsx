import {Link, Outlet} from "react-router-dom";

const Layout = ({}) => {
    return (
        <>
            <Link to='/'>Menu</Link>
            <Link to='/Cart'>Cart</Link>
            <Outlet/>
        </>
    );
};

export default Layout;

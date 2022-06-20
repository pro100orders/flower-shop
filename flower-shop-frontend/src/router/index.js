import React, {useEffect, useState} from 'react';
import Home from "../pages/Home/Home";
import Profile from "../pages/Profile/Profile";
import WishList from "../pages/WishList/WishList";
import {useSelector} from "react-redux";
import Products from "../pages/Products/Products";
import Basket from "../pages/Basket/Basket";
import ProductDetails from "../components/Products/ProductDetails/ProductDetails";
import LoginForm from "../components/LoginForm/LoginForm";
import RegistrationForm from "../components/RegistrationForm/RegistrationForm";
import Orders from "../pages/Orders/Orders";
import Admin from "../pages/Admin/Admin";

const AppRoutes = () => {

    const roles = useSelector(state => state.auth.user.roles);;

    const [routes, setRoutes] = useState([]);

    useEffect(() => {
        setRoutes([
            {path: "/", component: Home},
            {path: "/products", component: Products},
            {path: "/products/:id", component: ProductDetails},
        ]);

        if (roles && roles.includes("ROLE_GUEST")) {
            const guestRoutes = [
                {path: '/login', component: LoginForm},
                {path: '/registration', component: RegistrationForm}
            ];

            setRoutes(routes => routes = routes.concat(guestRoutes));
        }

        if (roles && roles.includes("ROLE_USER")) {
            const userRoutes = [
                {path: "/profile", component: Profile},
                {path: "/wish-list", component: WishList},
                {path: "/basket", component: Basket},
                {path: "/orders", component: Orders},
            ];

            setRoutes(routes => routes = routes.concat(userRoutes));
        }

        if (roles && roles.includes("ROLE_ADMIN")) {
            const adminRoutes = [
                {path: "/admin", component: Admin},
            ];

            setRoutes(routes => routes = routes.concat(adminRoutes));
        }
    }, [roles]);

    return routes;
}

export default AppRoutes;
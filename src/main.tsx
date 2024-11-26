import {lazy, StrictMode, Suspense} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'

import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Layout from "./layout/Layout.tsx";
import Cart from "./pages/Cart/Cart.tsx";
import NoPage from "./pages/NoPage/NoPage.tsx";

import axios from "axios";
import {PREFIX} from "./helpers/API.ts";
import Product from "./pages/Product/Product.tsx";
import AuthLayout from "./layout/auth/AuthLayout.tsx";
import Login from "./pages/Login/Login.tsx";
import Register from "./pages/Register/Register.tsx";
import RequireAuth from "./helpers/RequireAuth.tsx";
import {Provider} from "react-redux";
import {store} from "./store/store.ts";

const Menu = lazy(() => import("./pages/Menu/Menu.tsx"))
const router = createBrowserRouter([
    {
        path: '/',
        element: <RequireAuth><Layout/></RequireAuth>,
        children: [
            {
                path: '/',
                element: <Suspense fallback="loading"> <Menu/></Suspense>
            },
            {
                path: '/cart',
                element: <Cart/>
            },
            {
                path: '/product/:id',
                element: <Product/>,
                loader: async ({params}) => {
                    const {data} = await axios.get(`${PREFIX}/products/${params.id}`)
                    return data
                }
            },
            {
                path: '*',
                element: <NoPage/>
            }

        ]
    },
    {
        path: '/auth',
        element: <AuthLayout/>,
        children: [{
            path: 'login',
            element: <Login/>,
        },
            {
                path: 'register',
                element: <Register/>
            }
        ]
    }
])

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <RouterProvider router={router}/>
        </Provider>
    </StrictMode>,
)

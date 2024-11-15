import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'

import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Layout from "./layout/Layout.tsx";
import Menu from "./pages/Menu/Menu.tsx";
import Cart from "./pages/Cart/Cart.tsx";
import NoPage from "./pages/noPage/NoPage.tsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        children: [
            {
                path: '/',
                element: <Menu/>
            },
            {
                path: '/Cart',
                element: <Cart/>
            },
            {
                path: '*',
                element: <NoPage/>
            }

        ]
    }
])

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router ={router}/>
    </StrictMode>,
)

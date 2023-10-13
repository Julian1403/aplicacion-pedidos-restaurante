import React from "react";
import { createBrowserRouter } from "react-router-dom";
import LoginScreen from "./screens/login";
import MainLayout from "./layouts/main";
import HomeScreen from "./screens/home";
import PedidosScreen from "./screens/pedidos";
import ProductosScreen from "./screens/productos";
import CategoriasScreen from "./screens/categorias";
import NewProductScreen from "./screens/productos/new";
import EditProductScreen from "./screens/productos/edit";



const router=createBrowserRouter([
    {
        path:'/',
        element:<LoginScreen/>
    },
    {
        path:'/',
        element:<MainLayout/>,
        children:[
            {
                path:'dashboard',
                element:<HomeScreen/>
            },
            {
                path:'productos',
                element:<ProductosScreen/>
            }
            ,
            {
                path:'pedidos',
                element:<PedidosScreen/>
            }
            ,
            {
                path:'categorias',
                element:<CategoriasScreen/>
            }
            ,
            {
                path:'productos/new',
                element:<NewProductScreen/>
            },
            {
                path:'productos/new/:id',
                element:<EditProductScreen/>
            }
            
        ]
    }
]);
export default router;
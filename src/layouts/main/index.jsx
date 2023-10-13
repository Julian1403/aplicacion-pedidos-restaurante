import React from "react";
import { Outlet } from "react-router-dom";
//debo importar el NavBar y el Footer:
import NavBarComponent from "../../components/NavBar";
import Footer from "../../components/Footer";
const MainLayout=()=>{
    return (
        <>
        {/*Header*/}
        <NavBarComponent/>
        {/*Body*/}
        <Outlet/>
        {/*Footer*/}
        <Footer/>
        </>
    );
}
export default MainLayout
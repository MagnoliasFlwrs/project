import React, {useEffect} from 'react'
import {Link} from "@chakra-ui/react";
import {Outlet} from "react-router";
import {useNavigate} from "react-router-dom";

export default function MainLayout() {
    const navigate = useNavigate();
    let isAuth = sessionStorage.getItem('isAuth')
    useEffect(() => {
        if (!isAuth) {
            navigate("/auth")
        }
    }, [navigate,isAuth]);

    return (
        <>
            <Link>настройки</Link>
            <Outlet/>
        </>
    )
}
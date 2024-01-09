import React from 'react'
import {Link} from "@chakra-ui/react";
import {Outlet} from "react-router";

export default function MainLayout() {
    return (
        <>
            <Link>настройки</Link>
            <Outlet/>
        </>
    )
}
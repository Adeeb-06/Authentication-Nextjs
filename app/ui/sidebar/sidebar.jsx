'use client'
import React, { Suspense } from "react";
import {
    MdDashboard,
    MdSupervisedUserCircle,
    MdShoppingBag,
    MdAttachMoney,
    MdWork,
    MdAnalytics,
    MdPeople,
    MdOutlineSettings,
    MdHelpCenter,
    MdLogout,
} from "react-icons/md";
// import menuLink from "./menuLink/menuLink";
import MenuLink from "./menuLink/menuLink";
import Image from "next/image";
import { signOut , useSession} from "next-auth/react";
// import Loading from "@/components/Loading";
// import { signOut, useSession } from "next-auth/react";

const Sidebar = () => {
    const {data: session} = useSession()
    const menuItems = [
        {
            title: "Dashboard",
            path: "/dashboard",
            icon: <MdDashboard />,
        },
        {
            title: "Order",
            path: "/dashboard/order",
            icon: <MdSupervisedUserCircle />,
        },
        {
            title: "Products",
            path: "/dashboard/products",
            icon: <MdShoppingBag />,
        },
        {
            title: "Revenue",
            path: "/dashboard/revenue",
            icon: <MdWork />,
        },
        {
            title: "Product Reports",
            path: "/dashboard/product-report",
            icon: <MdAnalytics />,
        },]

      console.log(session)
    return (
        <>

            <div className="sticky  h-screen  ">
                <div className="user flex items-center gap-[20px] mb-[20px] ">
                    <div className="userdetail flex flex-col">
                        <span className="font-[500]"></span>
                        <span className=" text-[12px] text-textSoft ">Admin</span>
                    </div>
                </div>
                <ul className=" list-none ">
                    {menuItems.map((item) => (
                        <li key={item.title}>
                            <MenuLink className="text-text" item={item} key={item.title} />
                        </li>
                    ))}
                </ul>
                <button onClick={()=>{signOut()}} className="p-[20px] flex items-center my-[5px] mx-[0px] gap-[10px] hover:bg-[#2e374a] rounded-[10px] bg-none w-[100%]">
                    <MdLogout />
                    logout
                </button>
            </div>
        </>
    );
};

export default Sidebar;

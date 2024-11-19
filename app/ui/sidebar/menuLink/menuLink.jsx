"use client"

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'


const MenuLink = ({ item }) => {

  const pathname = usePathname()
  return (
    <>
      {item.icon}
      <Link href={item.path} className={`flex  mb-2 justify-start text-gray-900 hover:text-text items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto ${pathname === item.path && "bg-[#2e374a] text-white"}`}>
        {item.title}
      </Link>
    </>
  )
}



export default MenuLink
"use client"
import { signOut } from 'next-auth/react'
import { redirect } from 'next/navigation'
import React from 'react'
import { MdLogout } from 'react-icons/md'

const Logout = () => {
  return (
    <button onClick={() => { signOut() , redirect('/login') }} className="p-[20px] text-textSoft flex items-center my-[5px] mx-[0px] gap-[10px] bg-[#2e374a] rounded-[10px] bg-none ">
      <MdLogout />
      logout
    </button>
  )
}

export default Logout
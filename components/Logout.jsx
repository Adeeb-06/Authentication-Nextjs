"use client"
import React from 'react'
import { MdLogout } from 'react-icons/md'

const Logout = () => {
  return (
    <div><button onClick={()=>{signOut()}} className="p-[20px] flex items-center my-[5px] mx-[0px] gap-[10px] hover:bg-[#2e374a] rounded-[10px] bg-none w-[100%]">
    <MdLogout />
    logout
</button></div>
  )
}

export default Logout
"use client"
import { signOut, useSession } from 'next-auth/react'
import { redirect, useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { MdLogout } from 'react-icons/md'

const Logout = () => {
  const session = useSession()
  const router = useRouter()

  console.log(session)

  useEffect(() => {
      if(session?.status == "unauthenticated") {
        router.replace("/login")
      }
  }, [session, router])

  return (
    <button onClick={() => { signOut() }} className="p-[20px] text-textSoft flex items-center my-[5px] mx-[0px] gap-[10px] bg-[#2e374a] rounded-[10px] bg-none ">
      <MdLogout />
      logout
    </button>
  )
}

export default Logout
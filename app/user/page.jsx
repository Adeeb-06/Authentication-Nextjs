import Logout from '@/components/Logout'
import { getServerSession } from 'next-auth'
import React from 'react'

const UserPage = async () => {
    const session = await getServerSession()
    console.log(session)
  return (
    <>
    <div className='flex flex-col justify-center items-center h-screen'>
        <h1 className='text-2xl font-[700] '>
            You Are A User!
        </h1>
        <h2 className='text-2xl font-[700]'>
           Your Name is {session?.user?.name}
        </h2>
      <Logout/>
    </div>
    </>
  )
}

export default UserPage
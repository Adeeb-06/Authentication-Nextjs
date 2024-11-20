"use client"
import React from "react";
import { useSession } from "next-auth/react";

 
export default  function Dashboard() {
  const session =  useSession()
  console.log('first')
  console.log(session)
 

    return (
   <>
   hello
   </>
    )
}





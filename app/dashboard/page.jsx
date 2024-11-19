"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

 
export default function Dashboard() {
  const session = useSession()
 
  if (session?.user?.role === "admin") {
    return (
        <>
            <div className="wrapper flex gap-[20px] mt-[20px] ">
                <div className="main flex-[3] flex flex-col gap-[20px]  ">
                    {/* <UserPage/> */}
                </div>
            </div>
        </>
    );
  }
 
  return <p>You are not authorized to view this page!</p>;
}





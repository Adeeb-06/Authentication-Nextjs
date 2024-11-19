import React from "react";
import { getServerSession } from "next-auth";
import Sidebar from '@/app/ui/sidebar/sidebar';
// import { authOptions } from "@/app/api/auth/[...nextauth]"; // Import auth options if needed

const Layout = async ({ children }) => {
  const session = await getServerSession(); // Fetch session during SSR

  if (session?.user?.role === "admin") {
    return (
      <div className='flex'>
        <div className='flex-[1] bg-white p-[20px]'>
          <Sidebar />
        </div>
        <div className='flex-[4] p-[20px]'>
          {children}
        </div>
      </div>
    );
  }

  return <p>You are not authorized to view this page!</p>;
};

export default Layout;

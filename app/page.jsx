import Image from "next/image";
// import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Logout from "@/components/Logout";
import { getServerSession } from "next-auth";

export default function Home() {
  const { data: session } = getServerSession()
  // const router = useRouter()

  // if (!session) {
  //   router.replace("/login")
  // } else {
  return (
    <>

      <div>
        Welcome home
        <Logout/>
        
      </div>

    </>
  );
  // }


}

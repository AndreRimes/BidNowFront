import NavBar from "@/components/sections/NavBar";
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { getSession } from "@/utils/auth";
import UserInfo from "@/components/sections/UserInfo";
import MyProducts from "@/components/sections/MyProducts";
import ProfileBids from "@/components/sections/ProfileBids";


export default function Profile() {
  const user = getSession();
  
  return (
    <div className="flex flex-col items-center gap-10 pb-10">
      <NavBar />
      <UserInfo user={user} />
      <MyProducts />
      <ProfileBids user={user} />  
    </div>
  )
}


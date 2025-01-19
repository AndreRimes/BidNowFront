import NavBar from "@/components/sections/NavBar";
import { getSession } from "@/utils/auth";
import UserInfo from "@/components/sections/UserInfo";
import MyProducts from "@/components/sections/MyProducts";
import ProfileBids from "@/components/sections/ProfileBids";
import PreferredTags from "@/components/sections/PreferredTags";


export default function Profile() {
  const user = getSession();
  
  return (
    <div className="flex flex-col items-center gap-10 pb-10">
      <NavBar />
      <UserInfo user={user} />
      <MyProducts />
      <ProfileBids user={user} />
      <PreferredTags />
    </div>
  )
}

